import crypto from 'crypto'

/** Generates a 64-char hex token and an expiry 48 hours from now. */
export function generateActivationToken(): { token: string; expiry: Date } {
  const token = crypto.randomBytes(32).toString('hex')
  const expiry = new Date(Date.now() + 48 * 60 * 60 * 1000)
  return { token, expiry }
}
