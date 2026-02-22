import { COLORS } from '@/data/colors'
import { type LegalNorm, legalNorms, dalsiePravneNormy, zakonContent } from '@/data/zakon'

export default function ZakonPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.pageBg }}>

      {/* Hero */}
      <div style={{ backgroundColor: COLORS.primary }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white">{zakonContent.hero.title}</h1>
          <p className="mt-2 text-gray-300 max-w-xl">
            {zakonContent.hero.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Hlavné právne normy */}
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary }}>
            {zakonContent.sections.main}
          </h2>
          <div className="space-y-4">
            {legalNorms.map((norm) => (
              <LegalNormCard key={norm.id} norm={norm} />
            ))}
          </div>
        </section>

        {/* Ďalšie právne normy */}
        <section>
          <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary }}>
            {zakonContent.sections.other}
          </h2>

          {dalsiePravneNormy.length > 0 ? (
            <div className="space-y-4">
              {dalsiePravneNormy.map((norm) => (
                <LegalNormCard key={norm.id} norm={norm} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-gray-200 px-6 py-10 text-center">
              <p className="text-gray-400 text-sm">{zakonContent.sections.emptyOther}</p>
            </div>
          )}
        </section>

      </div>
    </main>
  )
}

function LegalNormCard({ norm }: { norm: LegalNorm }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-5">

        {/* Rok badge */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-center leading-tight"
          style={{ backgroundColor: COLORS.primary, color: COLORS.accent }}
        >
          {norm.year}
        </div>

        {/* Obsah */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-base" style={{ color: COLORS.primary }}>
              {norm.title}
            </h3>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: COLORS.subtleBg, color: COLORS.primary }}
            >
              {norm.subtitle}
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{norm.description}</p>
        </div>

        {/* PDF tlačidlo */}
        <div className="shrink-0">
          {norm.pdf ? (
            <a
              href={norm.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              <PdfIcon />
              {zakonContent.pdf.download}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed">
              <PdfIcon muted />
              {zakonContent.pdf.soon}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function PdfIcon({ muted = false }: { muted?: boolean }) {
  const color = muted ? '#9ca3af' : COLORS.primary
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M9 13h6M9 17h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
