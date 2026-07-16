import test from 'node:test'
import assert from 'node:assert/strict'
import {
  createApprovalToken,
  verifyApprovalToken,
} from '../lib/feedback-approval.mjs'
import { createApprovalHandler } from '../functions/approve-bosch-feedback.mjs'
import { createRequestHandler } from '../functions/request-bosch-feedback.mjs'

const secret = 'test-secret-that-is-longer-than-thirty-two-characters'
const requestId = '123e4567-e89b-12d3-a456-426614174000'

test('approval tokens reject tampering and expiration', async () => {
  const token = await createApprovalToken({
    requestId,
    expiresAt: Date.now() + 60_000,
    secret,
  })

  assert.equal((await verifyApprovalToken({ token, secret }))?.requestId, requestId)
  assert.equal(await verifyApprovalToken({ token: `${token}x`, secret }), null)

  const expiredToken = await createApprovalToken({
    requestId,
    expiresAt: Date.now() - 1,
    secret,
  })
  assert.equal(await verifyApprovalToken({ token: expiredToken, secret }), null)
})

test('a valid request is stored and emails a signed review link without PII in the token', async () => {
  process.env.FEEDBACK_APPROVAL_SECRET = secret
  process.env.GMAIL_USER = 'carla@example.test'
  process.env.GMAIL_APP_PASSWORD = 'test-app-password'
  process.env.FEEDBACK_REQUEST_TO = 'carla@example.test'

  const values = new Map()
  const store = {
    setJSON: async (key, value) => values.set(key, value),
    delete: async (key) => values.delete(key),
  }
  let emailPayload
  const handler = createRequestHandler({
    openStore: () => store,
    notifyOwner: async (options) => {
      emailPayload = options
      return { messageId: 'request-email-id' }
    },
  })

  const response = await handler(new Request('https://portfolio.example/api/request-bosch-feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://portfolio.example',
    },
    body: JSON.stringify({
      elapsedMs: 2000,
      fullName: 'Alex Recruiter',
      email: 'alex@engineering.example',
      company: 'Example Engineering',
      reason: 'Professional verification',
    }),
  }))

  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { ok: true })
  assert.equal(values.size, 1)
  const [requestKey, requestRecord] = values.entries().next().value
  assert.match(requestKey, /^requests\/[a-f0-9-]{36}$/)
  assert.equal(requestRecord.status, 'pending')
  assert.equal(requestRecord.email, 'alex@engineering.example')
  assert.equal(emailPayload.to, 'carla@example.test')
  assert.match(emailPayload.html, /Review request/)

  const approvalHref = emailPayload.html.match(/href="([^"]+\/api\/approve-bosch-feedback\?token=[^"]+)"/)?.[1]
  assert.ok(approvalHref)
  const token = new URL(approvalHref).searchParams.get('token')
  const tokenPayload = JSON.parse(Buffer.from(token.split('.')[0], 'base64url').toString('utf8'))
  assert.deepEqual(Object.keys(tokenPayload).sort(), ['expiresAt', 'requestId', 'version'])
  assert.equal(JSON.stringify(tokenPayload).includes('alex@engineering.example'), false)
})

test('opening a review link does not send, while mobile-compatible POST approval sends once', async () => {
  process.env.FEEDBACK_APPROVAL_SECRET = secret
  process.env.GMAIL_USER = 'carla@example.test'
  process.env.GMAIL_APP_PASSWORD = 'test-app-password'
  process.env.FEEDBACK_REQUEST_TO = 'carla@example.test'

  const token = await createApprovalToken({
    requestId,
    expiresAt: Date.now() + 60_000,
    secret,
  })
  const requestKey = `requests/${requestId}`
  const values = new Map([
    [requestKey, {
      version: 1,
      fullName: 'Alex Recruiter',
      email: 'alex@engineering.example',
      company: 'Example Engineering',
      reason: 'Professional verification',
      status: 'pending',
    }],
    ['feedback-bosch.pdf', new TextEncoder().encode('%PDF-1.4 test document').buffer],
  ])
  const store = {
    get: async (key) => values.get(key) ?? null,
    setJSON: async (key, value, options = {}) => {
      if (options.onlyIfNew && values.has(key)) return { modified: false }
      values.set(key, value)
      return { modified: true }
    },
    delete: async (key) => values.delete(key),
  }

  let deliveryCount = 0
  const deliverDocument = async ({ requestRecord, requestId: deliveredRequestId, pdf }) => {
    deliveryCount += 1
    assert.equal(requestRecord.email, 'alex@engineering.example')
    assert.equal(deliveredRequestId, requestId)
    assert.equal(new TextDecoder().decode(pdf).startsWith('%PDF'), true)
    return { messageId: 'test-delivery-id' }
  }
  const handler = createApprovalHandler({
    openStore: () => store,
    deliverDocument,
  })
  const approvalUrl = `https://portfolio.example/api/approve-bosch-feedback?token=${encodeURIComponent(token)}`

  const reviewResponse = await handler(new Request(approvalUrl))
  const reviewHtml = await reviewResponse.text()
  assert.equal(reviewResponse.status, 200)
  assert.equal(deliveryCount, 0)
  assert.match(reviewHtml, /Approve and send PDF/)
  assert.match(reviewHtml, /alex@engineering\.example/)

  const approvalResponse = await handler(new Request('https://portfolio.example/api/approve-bosch-feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Mobile email browsers can report a proxy or in-app browser origin that
      // differs from the public Netlify URL. The signed token still authorizes
      // this exact, expiring request.
      Origin: 'https://mobile-email-browser.example',
    },
    body: new URLSearchParams({ token }),
  }))
  assert.equal(approvalResponse.status, 200)
  assert.equal(deliveryCount, 1)
  assert.match(await approvalResponse.text(), /Document sent/)
  assert.equal(values.get(requestKey).status, 'sent')
  assert.equal(values.get(`deliveries/${requestId}`).status, 'sent')

  const repeatedReviewResponse = await handler(new Request(approvalUrl))
  assert.equal(repeatedReviewResponse.status, 200)
  assert.equal(deliveryCount, 1)
  assert.match(await repeatedReviewResponse.text(), /Already approved/)
})
