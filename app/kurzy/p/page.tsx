import { COLORS } from '@/data/colors'
import { kurzPContent, predmety, celkovyPocetHodin, type Predmet } from '@/data/kurz-p'

export default function KurzPPage() {
  const { hero, stats, section } = kurzPContent

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
            <p
              className="text-sm font-semibold mt-0.5"
              style={{ color: COLORS.accent }}
            >
              {hero.subtitle}
            </p>
            <p className="mt-2 text-gray-300 text-sm max-w-xl">
              {hero.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Štatistiky */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard value={predmety.length} label={stats.predmety} />
          <StatCard value={celkovyPocetHodin} label={stats.celkovo} />
          <div className="col-span-2 sm:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col items-center justify-center gap-2 text-center">
            <ScaleIcon />
            <span className="text-xs text-gray-500 leading-snug">
              {stats.zdroj}
            </span>
          </div>
        </div>

        {/* Osnova */}
        <section style={{ marginTop: '2rem' }}>
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: COLORS.primary }}
          >
            {section.title}
          </h2>
          <div className="space-y-3">
            {predmety.map((predmet) => (
              <PredmetCard
                key={predmet.id}
                predmet={predmet}
                hodinaLabel={section.hodiny}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 text-center">
      <p className="text-3xl font-bold" style={{ color: COLORS.primary }}>
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1 leading-snug">{label}</p>
    </div>
  )
}

function PredmetCard({
  predmet,
  hodinaLabel,
}: {
  predmet: Predmet
  hodinaLabel: string
}) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm py-4 flex items-start gap-4"
      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
    >
      <span
        className="w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: COLORS.primary, color: COLORS.accent }}
      >
        {predmet.id}
      </span>
      <p className="flex-1 text-sm text-gray-700 leading-relaxed">
        {predmet.nazov}
      </p>
      <span
        className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
        style={{ backgroundColor: COLORS.subtleBg, color: COLORS.primary }}
      >
        {predmet.hodiny} {hodinaLabel}
      </span>
    </div>
  )
}

function ScaleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M12 3v18M3 9l9-6 9 6M5 21h14"
        stroke={COLORS.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9l4 8H3M21 9l-4 8h4"
        stroke={COLORS.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
