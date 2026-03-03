import Link from 'next/link'
import ShieldIcon from '@/app/components/icons/ShieldIcon'

export default function PlatbaUspechPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-page-bg"
    >
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 text-center">
        <ShieldIcon size={48} centered />
        <div className="mt-4 text-5xl text-accent">✓</div>
        <h1 className="text-2xl font-bold mt-4 text-primary">
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
          className="mt-6 inline-block font-semibold text-sm underline text-primary"
        >
          Späť na hlavnú stránku
        </Link>
      </div>
    </div>
  )
}
