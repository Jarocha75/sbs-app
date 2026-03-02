import Link from 'next/link'
import { COLORS } from '@/data/colors'
import ShieldIcon from '@/app/components/icons/ShieldIcon'

export default function PlatbaUspechPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: COLORS.pageBg }}
    >
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 text-center">
        <ShieldIcon size={48} centered />
        <div className="mt-4 text-5xl" style={{ color: COLORS.accent }}>✓</div>
        <h1 className="text-2xl font-bold mt-4" style={{ color: COLORS.primary }}>
          Platba úspešná!
        </h1>
        <p className="text-gray-600 mt-3 text-sm leading-relaxed">
          Ďakujeme za vašu platbu. O niekoľko minút dostanete email
          s odkazom na aktiváciu vášho účtu.
        </p>
        <p className="text-gray-400 mt-2 text-xs">
          Ak email nevidíte, skontrolujte priečinok Spam.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block font-semibold text-sm underline"
          style={{ color: COLORS.primary }}
        >
          Späť na hlavnú stránku
        </Link>
      </div>
    </div>
  )
}
