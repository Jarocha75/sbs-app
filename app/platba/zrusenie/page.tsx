import Link from 'next/link'
import { COLORS } from '@/data/colors'
import ShieldIcon from '@/app/components/icons/ShieldIcon'

export default function PlatbaZruseniePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: COLORS.pageBg }}
    >
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 text-center">
        <ShieldIcon size={48} centered />
        <h1 className="text-2xl font-bold mt-4" style={{ color: COLORS.primary }}>
          Platba zrušená
        </h1>
        <p className="text-gray-600 mt-3 text-sm leading-relaxed">
          Platba bola zrušená. Váš účet nebol vytvorený.
          Môžete to skúsiť znova kedykoľvek.
        </p>
        <Link
          href="/objednavka"
          className="mt-6 inline-block py-2.5 px-6 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: COLORS.primary }}
        >
          Skúsiť znova
        </Link>
      </div>
    </div>
  )
}
