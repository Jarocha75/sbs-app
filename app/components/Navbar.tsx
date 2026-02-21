'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const navLinks = [
  { href: '/kurzy', label: 'Kurzy' },
  { href: '/o-firme', label: 'O firme' },
  { href: '/zakon', label: 'Zákon SBS' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: '#1e3a5f' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <ShieldIcon />
            <span className="font-bold text-xl tracking-wide" style={{ color: '#c9a84c' }}>
              SBS Akademia
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-200 hover:text-white font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth sekcia */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <span className="text-gray-300 text-sm">{session.user.name ?? session.user.email}</span>
                {session.user.role === 'ADMIN' && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: '#c9a84c', color: '#1e3a5f' }}
                  >
                    ADMIN
                  </span>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/prihlasenie' })}
                  className="text-sm font-semibold px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  Odhlásiť sa
                </button>
              </>
            ) : (
              <Link
                href="/prihlasenie"
                className="font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#c9a84c', color: '#1e3a5f' }}
              >
                Prihlásiť sa
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-1"
            aria-label="Otvoriť menu"
          >
            {mobileOpen ? <XIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2" style={{ backgroundColor: '#16305a' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-200 py-2.5 border-b border-white/10 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <>
              <div className="py-2 text-gray-300 text-sm flex items-center gap-2">
                <span>{session.user.name ?? session.user.email}</span>
                {session.user.role === 'ADMIN' && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: '#c9a84c', color: '#1e3a5f' }}
                  >
                    ADMIN
                  </span>
                )}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/prihlasenie' })}
                className="mt-1 font-semibold px-4 py-2.5 rounded-md text-center border border-white/30 text-white"
              >
                Odhlásiť sa
              </button>
            </>
          ) : (
            <Link
              href="/prihlasenie"
              className="mt-2 font-semibold px-4 py-2.5 rounded-md text-center"
              style={{ backgroundColor: '#c9a84c', color: '#1e3a5f' }}
              onClick={() => setMobileOpen(false)}
            >
              Prihlásiť sa
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

function ShieldIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
        fill="#c9a84c"
      />
      <path d="M10 13l-2-2 1.41-1.41L10 10.17l4.59-4.58L16 7l-6 6z" fill="#1e3a5f" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 18v-2h18v2H3zm0-5v-2h18v2H3zm0-5V6h18v2H3z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  )
}
