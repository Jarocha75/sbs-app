import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/prihlasenie',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = nextUrl

      const isAuthPage =
        pathname.startsWith('/prihlasenie') ||
        pathname.startsWith('/registracia')

      const isProtectedRoute =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/kurzy') ||
        pathname.startsWith('/profil')

      if (!isLoggedIn && isProtectedRoute) {
        return false // presmerovanie na /prihlasenie (pages.signIn)
      }

      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role: string }).role
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session
    },
  },
  providers: [], // providers sa pridávajú v auth.ts
}
