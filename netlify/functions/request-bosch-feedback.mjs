import { randomUUID } from 'node:crypto'
import { getStore } from '@netlify/blobs'
import {
  createApprovalToken,
  FEEDBACK_STORE_NAME,
} from '../lib/feedback-approval.mjs'

const jsonResponse = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
})

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const cleanSingleLine = (value) => String(value || '').replace(/[\r\n]+/g, ' ').trim()

const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)

export const createRequestHandler = ({
  openStore = getStore,
  sendEmail = fetch,
} = {}) => async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        Allow: 'POST',
      },
    })
  }

  const requestOrigin = request.headers.get('origin')
  if (requestOrigin && requestOrigin !== new URL(request.url).origin) {
    return jsonResponse(403, { error: 'Request not allowed.' })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse(400, { error: 'Please submit the form again.' })
  }

  if (cleanSingleLine(body.website)) {
    return jsonResponse(200, { ok: true })
  }

  if (Number(body.elapsedMs) > 0 && Number(body.elapsedMs) < 700) {
    return jsonResponse(200, { ok: true })
  }

  const fullName = cleanSingleLine(body.fullName)
  const email = cleanSingleLine(body.email).toLowerCase()
  const company = cleanSingleLine(body.company)
  const reason = String(body.reason || '').trim()

  if (!fullName || !email || !company) {
    return jsonResponse(400, { error: 'Name, professional email and company are required.' })
  }

  if (fullName.length > 100 || email.length > 180 || company.length > 120 || reason.length > 600) {
    return jsonResponse(400, { error: 'One or more fields are too long.' })
  }

  if (!validEmail(email)) {
    return jsonResponse(400, { error: 'Please enter a valid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const sender = process.env.FEEDBACK_REQUEST_FROM
  const recipient = process.env.FEEDBACK_REQUEST_TO || 'carlabarastean@gmail.com'
  const approvalSecret = process.env.FEEDBACK_APPROVAL_SECRET

  if (!apiKey || !sender || !approvalSecret || approvalSecret.length < 32) {
    console.error('Feedback request email is not configured: required environment variables are missing.')
    return jsonResponse(503, {
      error: 'The request form is temporarily unavailable. Please contact me by email instead.',
    })
  }

  const requestId = randomUUID()
  const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000)
  const approvalToken = await createApprovalToken({ requestId, expiresAt, secret: approvalSecret })
  const approvalLink = `${new URL(request.url).origin}/api/approve-bosch-feedback?token=${encodeURIComponent(approvalToken)}`
  const safeReason = reason ? escapeHtml(reason).replaceAll('\n', '<br>') : '<em>Not provided</em>'

  const requests = openStore(FEEDBACK_STORE_NAME)
  try {
    await requests.setJSON(`requests/${requestId}`, {
      version: 1,
      fullName,
      email,
      company,
      reason,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      expiresAt: new Date(expiresAt).toISOString(),
    }, { onlyIfNew: true })
  } catch {
    console.error('Could not store the Bosch feedback request in Netlify Blobs.')
    return jsonResponse(503, { error: 'The request could not be saved. Please try again later.' })
  }

  const emailHtml = `
    <div style="margin:0;background:#f7e9df;padding:32px 16px;color:#21172f;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;background:#fff8ec;border:1px solid #b9a7b0;">
        <div style="padding:28px 32px;border-bottom:4px solid #4054d8;background:#f0e8e4;">
          <p style="margin:0 0 10px;color:#4054d8;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Portfolio access request</p>
          <h1 style="margin:0;font-size:30px;line-height:1.15;font-weight:600;">Bosch feedback document</h1>
        </div>
        <div style="padding:30px 32px;">
          <p style="margin:0 0 22px;line-height:1.6;">A visitor has asked to see the official feedback from your Bosch experience.</p>
          <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.5;">
            <tr><td style="width:150px;padding:10px 0;color:#655b6d;border-bottom:1px solid #ddd0c8;">Name</td><td style="padding:10px 0;border-bottom:1px solid #ddd0c8;"><strong>${escapeHtml(fullName)}</strong></td></tr>
            <tr><td style="padding:10px 0;color:#655b6d;border-bottom:1px solid #ddd0c8;">Company</td><td style="padding:10px 0;border-bottom:1px solid #ddd0c8;">${escapeHtml(company)}</td></tr>
            <tr><td style="padding:10px 0;color:#655b6d;border-bottom:1px solid #ddd0c8;">Email</td><td style="padding:10px 0;border-bottom:1px solid #ddd0c8;"><a href="mailto:${escapeHtml(email)}" style="color:#4054d8;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:10px 0;color:#655b6d;vertical-align:top;">Reason</td><td style="padding:10px 0;">${safeReason}</td></tr>
          </table>
          <div style="margin:26px 0 0;padding:18px;background:#f0e8e4;border-left:4px solid #f0067f;line-height:1.55;">
            Verify the sender and company first. The document will be attached and emailed automatically only after your explicit approval.
          </div>
          <a href="${escapeHtml(approvalLink)}" style="display:inline-block;margin-top:24px;padding:13px 18px;color:#fff8ec;background:#21172f;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;">Review request</a>
          <p style="margin:16px 0 0;color:#655b6d;font-size:12px;line-height:1.5;">This approval link expires in 7 days. Opening it does not send the document.</p>
        </div>
      </div>
    </div>`

  const emailText = [
    'Portfolio access request - Bosch feedback document',
    '',
    `Name: ${fullName}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Reason: ${reason || 'Not provided'}`,
    '',
    'Verify the requester first, then review and approve the request using this link:',
    approvalLink,
    '',
    'Opening the link does not send the document. A separate confirmation is required.',
  ].join('\n')

  const resendResponse = await sendEmail('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'carla-portfolio/1.0',
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: email,
      subject: `Bosch feedback request - ${fullName} at ${company}`,
      html: emailHtml,
      text: emailText,
    }),
  })

  if (!resendResponse.ok) {
    await requests.delete(`requests/${requestId}`).catch(() => {})
    console.error(`Resend rejected a feedback request email with status ${resendResponse.status}.`)
    return jsonResponse(502, { error: 'The request could not be sent. Please try again later.' })
  }

  return jsonResponse(200, { ok: true })
}

export default createRequestHandler()

export const config = {
  path: '/api/request-bosch-feedback',
}
