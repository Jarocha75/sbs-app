'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { COLORS } from '@/data/colors'
import { SITE } from '@/data/site'
import ShieldIcon from '@/app/components/icons/ShieldIcon'
import { NAV, navLinks, sluzbyLinks, courseLinks, testLinks, type NavItem } from '@/data/navbar'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const { data: session } = useSession()

  function toggleMobileSection(name: string) {
    setMobileExpanded((prev) => (prev === name ? null : name))
  }

  function closeMobile() {
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  return (
    <nav className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: COLORS.primary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <ShieldIcon size={30} variant="inverted" />
            <span className="font-bold text-xl tracking-wide" style={{ color: COLORS.accent }}>
              {SITE.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={navLinks[0].href} className="text-gray-200 hover:text-white font-medium transition-colors">
              {navLinks[0].label}
            </Link>
            <NavDropdown label="Služby" items={sluzbyLinks} />
            <NavDropdown label="Kurzy" items={courseLinks} />
            <NavDropdown label="On-line testy SBS" items={testLinks} />
            <Link href={navLinks[1].href} className="text-gray-200 hover:text-white font-medium transition-colors">
              {navLinks[1].label}
            </Link>
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 text-sm hover:text-white transition-colors"
                >
                  {session.user.name ?? session.user.email}
                </Link>
                {session.user.role === 'ADMIN' && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
                  >
                    {NAV.adminBadge}
                  </span>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: NAV.signOutCallbackUrl })}
                  className="text-sm font-semibold px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  {NAV.signOut}
                </button>
              </>
            ) : (
              <Link
                href={NAV.signInHref}
                className="font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
              >
                {NAV.signIn}
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-1"
            aria-label={NAV.mobileMenuAriaLabel}
          >
            {mobileOpen ? <XIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2" style={{ backgroundColor: COLORS.navMobileBg }}>
          <Link
            href={navLinks[0].href}
            className="text-gray-200 py-2.5 border-b border-white/10 font-medium"
            onClick={closeMobile}
          >
            {navLinks[0].label}
          </Link>

          <MobileDropdown
            label="Služby"
            name="sluzby"
            items={sluzbyLinks}
            expanded={mobileExpanded === 'sluzby'}
            onToggle={toggleMobileSection}
            onClose={closeMobile}
          />

          <MobileDropdown
            label="Kurzy"
            name="kurzy"
            items={courseLinks}
            expanded={mobileExpanded === 'kurzy'}
            onToggle={toggleMobileSection}
            onClose={closeMobile}
          />

          <MobileDropdown
            label="On-line testy SBS"
            name="testy"
            items={testLinks}
            expanded={mobileExpanded === 'testy'}
            onToggle={toggleMobileSection}
            onClose={closeMobile}
          />

          <Link
            href={navLinks[1].href}
            className="text-gray-200 py-2.5 border-b border-white/10 font-medium"
            onClick={closeMobile}
          >
            {navLinks[1].label}
          </Link>

          {/* Mobile auth */}
          {session ? (
            <>
              <div className="py-2 text-gray-300 text-sm flex items-center gap-2">
                <span>{session.user.name ?? session.user.email}</span>
                {session.user.role === 'ADMIN' && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
                  >
                    {NAV.adminBadge}
                  </span>
                )}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: NAV.signOutCallbackUrl })}
                className="mt-1 font-semibold px-4 py-2.5 rounded-md text-center border border-white/30 text-white"
              >
                {NAV.signOut}
              </button>
            </>
          ) : (
            <Link
              href={NAV.signInHref}
              className="mt-2 font-semibold px-4 py-2.5 rounded-md text-center"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
              onClick={closeMobile}
            >
              {NAV.signIn}
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

// ── Desktop dropdown ─────────────────────────────────────────────────────────

function NavDropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="flex items-center gap-1 text-gray-200 hover:text-white font-medium transition-colors">
        {label}
        <ChevronIcon rotated={open} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-1.5 min-w-50 border border-gray-100">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-all duration-150 border-l-2 border-transparent hover:border-l-2"
              style={{ color: COLORS.primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderLeftColor = COLORS.accent
                e.currentTarget.style.backgroundColor = COLORS.subtleBg
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderLeftColor = 'transparent'
                e.currentTarget.style.backgroundColor = ''
              }}
              onClick={() => setOpen(false)}
            >
              {item.badge && (
                <span
                  className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
                  style={{ backgroundColor: COLORS.primary, color: COLORS.accent }}
                >
                  {item.badge}
                </span>
              )}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Mobile dropdown ───────────────────────────────────────────────────────────

function MobileDropdown({
  label,
  name,
  items,
  expanded,
  onToggle,
  onClose,
}: {
  label: string
  name: string
  items: NavItem[]
  expanded: boolean
  onToggle: (name: string) => void
  onClose: () => void
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => onToggle(name)}
        className="w-full flex items-center justify-between text-gray-200 py-2.5 font-medium"
      >
        <span>{label}</span>
        <ChevronIcon rotated={expanded} />
      </button>

      {expanded && (
        <div className="pl-4 pb-2 flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 px-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-150 hover:bg-white/10 hover:text-white"
              style={{ color: COLORS.accent }}
              onClick={onClose}
            >
              {item.badge && (
                <span
                  className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
                  style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
                >
                  {item.badge}
                </span>
              )}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Ikony ─────────────────────────────────────────────────────────────────────

function ChevronIcon({ rotated = false }: { rotated?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`transition-transform duration-200 ${rotated ? 'rotate-180' : ''}`}
    >
      <path d="M7 10l5 5 5-5z" />
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
