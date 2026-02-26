import Link from 'next/link'
import { COLORS } from '@/data/colors'
import { testySContent, kategorie, type TestKategoria } from '@/data/testy-s'
import CvicnyTestCard from '@/app/components/CvicnyTestCard'

export default function TestySPage() {
  const { hero, section } = testySContent

  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.pageBg }}>
      {/* Hero */}
      <div style={{ backgroundColor: COLORS.primary }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-5">
          <span
            className="text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
          >
            {hero.badge}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-white">{hero.title}</h1>
            <p className="text-sm font-semibold mt-0.5" style={{ color: COLORS.accent }}>
              {hero.subtitle}
            </p>
            <p className="mt-2 text-gray-300 text-sm max-w-xl">{hero.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Cvičný test */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <CvicnyTestCard />
        </div>

        <h2 className="text-lg font-semibold mb-6" style={{ color: COLORS.primary }}>
          {section.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kategorie.map((kat) => (
            <KategoriaCard key={kat.id} kategoria={kat} labels={section} />
          ))}
        </div>
      </div>
    </main>
  )
}

function KategoriaCard({
  kategoria,
  labels,
}: {
  kategoria: TestKategoria
  labels: { otazok: string; spustit: string }
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5">
        <h3 className="font-bold text-base mb-1" style={{ color: COLORS.primary }}>
          {kategoria.nazov}
        </h3>
        <p className="text-sm text-gray-400 mb-5">
          {kategoria.pocetOtazok} {labels.otazok}
        </p>
        <Link
          href={kategoria.href}
          className="block text-center py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: COLORS.primary, color: 'white' }}
        >
          {labels.spustit}
        </Link>
      </div>
    </div>
  )
}
