const encoder = new TextEncoder()

export const FEEDBACK_STORE_NAME = 'bosch-feedback-private'
export const FEEDBACK_PDF_KEY = 'feedback-bosch.pdf'

const importSigningKey = async (secret) => {
  if (typeof secret !== 'string' || secret.length < 32) {
    throw new Error('FEEDBACK_APPROVAL_SECRET must contain at least 32 characters.')
  }

  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export const createApprovalToken = async ({ requestId, expiresAt, secret }) => {
  const payload = Buffer.from(JSON.stringify({
    version: 1,
    requestId,
    expiresAt,
  }), 'utf8').toString('base64url')
  const key = await importSigningKey(secret)
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))

  return `${payload}.${Buffer.from(signature).toString('base64url')}`
}

export const verifyApprovalToken = async ({ token, secret }) => {
  try {
    if (typeof token !== 'string' || token.length > 1200) return null

    const [payload, encodedSignature, ...extraParts] = token.split('.')
    if (!payload || !encodedSignature || extraParts.length > 0) return null

    const key = await importSigningKey(secret)
    const signature = Buffer.from(encodedSignature, 'base64url')
    const isValid = await crypto.subtle.verify('HMAC', key, signature, encoder.encode(payload))
    if (!isValid) return null

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (
      decoded.version !== 1 ||
      typeof decoded.requestId !== 'string' ||
      !/^[a-f0-9-]{36}$/i.test(decoded.requestId) ||
      typeof decoded.expiresAt !== 'number' ||
      decoded.expiresAt < Date.now()
    ) {
      return null
    }

    return decoded
  } catch {
    return null
  }
}
