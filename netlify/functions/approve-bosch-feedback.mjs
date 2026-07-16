import { getStore } from '@netlify/blobs'
import {
  FEEDBACK_PDF_KEY,
  FEEDBACK_STORE_NAME,
  verifyApprovalToken,
} from '../lib/feedback-approval.mjs'
import { sendGmailMessage } from '../lib/gmail-mailer.mjs'

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const pageResponse = (status, { eyebrow, title, message, content = '' }) => new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <title>${escapeHtml(title)} - Carla Bărăștean</title>
    <style>
      :root { color-scheme: light; --paper:#f7e9df; --cream:#fff8ec; --ink:#21172f; --muted:#655b6d; --accent:#f0067f; --cobalt:#4054d8; --cyan:#1ebfd1; }
      * { box-sizing: border-box; }
      body { min-height:100vh; margin:0; display:grid; place-items:center; padding:24px; color:var(--ink); background:var(--paper); font-family:Arial,sans-serif; }
      main { width:min(650px,100%); overflow:hidden; background:var(--cream); border:1px solid rgba(33,23,47,.28); border-radius:12px; box-shadow:12px 12px 0 rgba(64,84,216,.28); }
      header { padding:42px 44px 36px; background:#f0e8e4; border-bottom:4px solid var(--cobalt); }
      .eyebrow { margin:0 0 14px; color:var(--cobalt); font-family:ui-monospace,monospace; font-size:12px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; }
      h1 { margin:0; font-size:clamp(36px,7vw,58px); font-weight:500; letter-spacing:-2.5px; line-height:.98; }
      .body { padding:34px 44px 42px; }
      .message { margin:0; color:var(--muted); font-size:17px; line-height:1.65; }
      dl { display:grid; grid-template-columns:130px 1fr; margin:28px 0; border-top:1px solid rgba(33,23,47,.22); }
      dt,dd { margin:0; padding:12px 0; border-bottom:1px solid rgba(33,23,47,.22); }
      dt { color:var(--muted); font-family:ui-monospace,monospace; font-size:11px; text-transform:uppercase; }
      dd { overflow-wrap:anywhere; }
      .note { margin:24px 0; padding:16px 18px; color:var(--muted); background:#f0e8e4; border-left:4px solid var(--accent); line-height:1.55; }
      button { width:100%; padding:15px 20px; color:var(--cream); background:var(--ink); border:1px solid var(--ink); border-radius:4px; font-family:ui-monospace,monospace; font-size:12px; font-weight:700; letter-spacing:.7px; text-transform:uppercase; cursor:pointer; }
      button:hover { color:var(--ink); background:var(--cyan); }
      @media (max-width:560px) { body{padding:0;align-items:end} main{border-radius:12px 12px 0 0;box-shadow:none} header{padding:52px 24px 30px}.body{padding:28px 24px 34px}dl{grid-template-columns:1fr}dt{padding-bottom:4px;border-bottom:0}dd{padding-top:0} }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h1>${escapeHtml(title)}</h1>
      </header>
      <div class="body">
        <p class="message">${escapeHtml(message)}</p>
        ${content}
      </div>
    </main>
  </body>
</html>`, {
  status,
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
  },
})

const errorPage = (status, message) => pageResponse(status, {
  eyebrow: 'Access request',
  title: 'Approval unavailable',
  message,
})

const loadRequest = async (store, requestId) => store.get(`requests/${requestId}`, {
  type: 'json',
  consistency: 'strong',
})

export const sendDocument = async ({
  requestRecord,
  requestId,
  pdf,
  gmailUser,
  gmailAppPassword,
  ownerEmail,
  sendMessage = sendGmailMessage,
}) => {
  const firstName = requestRecord.fullName.split(/\s+/)[0]
  const emailHtml = `
    <div style="margin:0;background:#f7e9df;padding:32px 16px;color:#21172f;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;background:#fff8ec;border:1px solid #b9a7b0;">
        <div style="padding:28px 32px;border-bottom:4px solid #4054d8;background:#f0e8e4;">
          <p style="margin:0 0 10px;color:#4054d8;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Access approved</p>
          <h1 style="margin:0;font-size:30px;line-height:1.15;font-weight:600;">Bosch internship feedback</h1>
        </div>
        <div style="padding:30px 32px;line-height:1.65;">
          <p>Hello ${escapeHtml(firstName)},</p>
          <p>Thank you for your interest in my model-based development experience at Bosch. I reviewed and approved your request.</p>
          <p>The official internship evaluation report is attached to this email.</p>
          <p style="margin-top:26px;">Best regards,<br><strong>Carla Bărăștean</strong></p>
        </div>
      </div>
    </div>`
  const emailText = [
    `Hello ${firstName},`,
    '',
    'Thank you for your interest in my model-based development experience at Bosch. I reviewed and approved your request.',
    '',
    'The official internship evaluation report is attached to this email.',
    '',
    'Best regards,',
    'Carla Bărăștean',
  ].join('\n')

  return sendMessage({
    gmailUser,
    gmailAppPassword,
    fromName: 'Carla Bărăștean',
    to: requestRecord.email,
    replyTo: ownerEmail,
    subject: 'Bosch internship evaluation - Carla Bărăștean',
    html: emailHtml,
    text: emailText,
    messageId: `<bosch-feedback-${requestId}@portfolio.local>`,
    attachments: [{
      content: Buffer.from(pdf),
      filename: 'Carla_Barastean_Bosch_Feedback.pdf',
      contentType: 'application/pdf',
    }],
  })
}

export const createApprovalHandler = ({
  openStore = getStore,
  deliverDocument = sendDocument,
} = {}) => async (request) => {
  if (request.method !== 'GET' && request.method !== 'POST') {
    return errorPage(405, 'This approval page accepts only review and confirmation requests.')
  }

  if (request.method === 'POST') {
    const requestOrigin = request.headers.get('origin')
    if (requestOrigin && requestOrigin !== new URL(request.url).origin) {
      return errorPage(403, 'This confirmation did not originate from the portfolio approval page.')
    }
  }

  const approvalSecret = process.env.FEEDBACK_APPROVAL_SECRET
  if (!approvalSecret || approvalSecret.length < 32) {
    console.error('Bosch feedback approval is not configured.')
    return errorPage(503, 'The approval service is not configured yet.')
  }

  let token
  if (request.method === 'GET') {
    token = new URL(request.url).searchParams.get('token')
  } else {
    const formData = await request.formData().catch(() => null)
    token = formData?.get('token')
  }

  const approval = await verifyApprovalToken({ token, secret: approvalSecret })
  if (!approval) {
    return errorPage(403, 'This approval link is invalid or has expired. Ask the requester to submit a new request.')
  }

  const store = openStore(FEEDBACK_STORE_NAME)
  const requestRecord = await loadRequest(store, approval.requestId).catch(() => null)
  if (!requestRecord) {
    return errorPage(404, 'The original request could not be found.')
  }

  if (requestRecord.status === 'sent') {
    return pageResponse(200, {
      eyebrow: 'Already approved',
      title: 'Document sent',
      message: `The Bosch feedback document has already been sent to ${requestRecord.email}.`,
    })
  }

  const deliveryKey = `deliveries/${approval.requestId}`
  const deliveryState = await store.get(deliveryKey, {
    type: 'json',
    consistency: 'strong',
  }).catch(() => null)
  if (deliveryState?.status === 'sent') {
    return pageResponse(200, {
      eyebrow: 'Already approved',
      title: 'Document sent',
      message: 'The Bosch feedback document has already been delivered for this request.',
    })
  }

  if (request.method === 'GET') {
    const content = `
      <dl>
        <dt>Name</dt><dd>${escapeHtml(requestRecord.fullName)}</dd>
        <dt>Company</dt><dd>${escapeHtml(requestRecord.company)}</dd>
        <dt>Email</dt><dd>${escapeHtml(requestRecord.email)}</dd>
      </dl>
      <div class="note">The PDF will be attached and sent automatically only after you press the button below.</div>
      <form method="post" action="/api/approve-bosch-feedback">
        <input type="hidden" name="token" value="${escapeHtml(token)}" />
        <button type="submit">Approve and send PDF</button>
      </form>`

    return pageResponse(200, {
      eyebrow: 'Final confirmation',
      title: 'Send Bosch feedback?',
      message: 'Review the requester details before approving access to the official document.',
      content,
    })
  }

  const ownerEmail = process.env.FEEDBACK_REQUEST_TO || 'carlabarastean@gmail.com'
  const gmailUser = process.env.GMAIL_USER || ownerEmail
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
  if (!gmailUser || !gmailAppPassword) {
    return errorPage(503, 'The document email service is not configured yet.')
  }

  if (deliveryState?.status === 'sending') {
    const startedAt = Date.parse(deliveryState.startedAt || '')
    if (Number.isFinite(startedAt) && Date.now() - startedAt < 5 * 60 * 1000) {
      return pageResponse(202, {
        eyebrow: 'Delivery in progress',
        title: 'Sending document',
        message: 'This request is already being processed. Please check the recipient inbox shortly.',
      })
    }
    await store.delete(deliveryKey).catch(() => {})
  }

  const lockResult = await store.setJSON(deliveryKey, {
    status: 'sending',
    startedAt: new Date().toISOString(),
  }, { onlyIfNew: true }).catch(() => null)
  if (!lockResult?.modified) {
    return pageResponse(202, {
      eyebrow: 'Delivery in progress',
      title: 'Sending document',
      message: 'This request is already being processed. Please check the recipient inbox shortly.',
    })
  }

  const pdf = await store.get(FEEDBACK_PDF_KEY, {
    type: 'arrayBuffer',
    consistency: 'strong',
  }).catch(() => null)
  if (!pdf) {
    await store.delete(deliveryKey).catch(() => {})
    console.error('The Bosch feedback PDF is missing from the private Blob store.')
    return errorPage(503, 'The private document has not been uploaded yet.')
  }

  const pdfBytes = new Uint8Array(pdf)
  const hasPdfHeader = pdfBytes.length >= 4 && String.fromCharCode(...pdfBytes.slice(0, 4)) === '%PDF'
  if (!hasPdfHeader || pdfBytes.length > 25 * 1024 * 1024) {
    await store.delete(deliveryKey).catch(() => {})
    console.error('The private Bosch feedback Blob is not a valid PDF attachment.')
    return errorPage(500, 'The stored document could not be validated.')
  }

  let deliveryResult
  try {
    deliveryResult = await deliverDocument({
      requestRecord,
      requestId: approval.requestId,
      pdf,
      gmailUser,
      gmailAppPassword,
      ownerEmail,
    })
  } catch {
    await store.delete(deliveryKey).catch(() => {})
    console.error('Gmail rejected the approved Bosch document email.')
    return errorPage(502, 'The document could not be sent. Please try the approval again later.')
  }

  await store.setJSON(deliveryKey, {
    status: 'sent',
    sentAt: new Date().toISOString(),
    messageId: typeof deliveryResult?.messageId === 'string' ? deliveryResult.messageId : null,
  })
  await store.setJSON(`requests/${approval.requestId}`, {
    ...requestRecord,
    status: 'sent',
    approvedAt: new Date().toISOString(),
    deliveryId: typeof deliveryResult?.messageId === 'string' ? deliveryResult.messageId : null,
  })

  return pageResponse(200, {
    eyebrow: 'Access approved',
    title: 'Document sent',
    message: `The Bosch feedback PDF was sent automatically to ${requestRecord.email}.`,
  })
}

export default createApprovalHandler()

export const config = {
  path: '/api/approve-bosch-feedback',
}
