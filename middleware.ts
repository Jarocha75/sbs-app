import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

// Middleware používa len edge-safe config (bez Prisma/Node.js modulov)
export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
