"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { SITE } from "@/data/site";
import ShieldIcon from "@/app/components/icons/ShieldIcon";
import HamburgerIcon from "@/app/components/icons/HamburgerIcon";
import XIcon from "@/app/components/icons/XIcon";
import NavDropdown from "@/app/components/NavDropdown";
import MobileDropdown from "@/app/components/MobileDropdown";
import AdminBadge from "@/app/components/AdminBadge";
import {
  NAV,
  navLinks,
  sluzbyLinks,
  courseLinks,
  testLinks,
} from "@/data/navbar";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { data: session } = useSession();

  const toggleMobileSection = (name: string) => {
    setMobileExpanded((prev) => (prev === name ? null : name));
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <nav className="sticky top-0 z-50 shadow-lg bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <ShieldIcon size={30} variant="inverted" />
            <span className="font-bold text-xl tracking-wide text-accent">
              {SITE.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href={navLinks[0].href}
              className="text-gray-200 hover:text-white font-medium transition-colors"
            >
              {navLinks[0].label}
            </Link>
            <NavDropdown label="Služby" items={sluzbyLinks} />
            <NavDropdown label="Kurzy" items={courseLinks} />
            <NavDropdown label="On-line testy SBS" items={testLinks} />
            <Link
              href={navLinks[1].href}
              className="text-gray-200 hover:text-white font-medium transition-colors"
            >
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
                {session.user.role === "ADMIN" && <AdminBadge />}
                <button
                  onClick={() =>
                    signOut({ callbackUrl: NAV.signOutCallbackUrl })
                  }
                  className="text-sm font-semibold px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  {NAV.signOut}
                </button>
              </>
            ) : (
              <Link
                href={NAV.signInHref}
                className="font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity bg-accent text-primary"
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
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-nav-mobile-bg">
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
            expanded={mobileExpanded === "sluzby"}
            onToggle={toggleMobileSection}
            onClose={closeMobile}
          />

          <MobileDropdown
            label="Kurzy"
            name="kurzy"
            items={courseLinks}
            expanded={mobileExpanded === "kurzy"}
            onToggle={toggleMobileSection}
            onClose={closeMobile}
          />

          <MobileDropdown
            label="On-line testy SBS"
            name="testy"
            items={testLinks}
            expanded={mobileExpanded === "testy"}
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
                {session.user.role === "ADMIN" && <AdminBadge />}
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
              className="mt-2 font-semibold px-4 py-2.5 rounded-md text-center bg-accent text-primary"
              onClick={closeMobile}
            >
              {NAV.signIn}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
