import { COLORS } from '@/data/colors'
import { testyPContent } from '@/data/testy-p'

export default function TestyPPage() {
  const { hero, section } = testyPContent

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
        <h2 className="text-lg font-semibold mb-6" style={{ color: COLORS.primary }}>
          {section.title}
        </h2>
        <div className="bg-white rounded-xl border border-dashed border-gray-200 px-6 py-12 text-center">
          <p className="text-gray-400 text-sm">Testy pre preukaz typu P budú pridané čoskoro.</p>
        </div>
      </div>
    </main>
  )
}
