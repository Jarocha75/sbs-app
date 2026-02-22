import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

// Proxy používa len edge-safe config (bez Prisma/Node.js modulov)
export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
