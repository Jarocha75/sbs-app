import Link from 'next/link'
import { COLORS } from '@/data/colors'
import { HERO, SECTIONS, courses, infoCards } from '@/data/dashboard'

export default function DashboardPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.pageBg }}>

      {/* Hero banner */}
      <div style={{ backgroundColor: COLORS.primary }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">
            {HERO.title}
          </h1>
          <p className="mt-2 text-gray-300 max-w-xl">
            {HERO.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">

        {/* Courses */}
        <section>
          <h2 className="text-xl font-semibold mb-6" style={{ color: COLORS.primary }}>
            {SECTIONS.courses}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.type} {...course} />
            ))}
          </div>
        </section>

        {/* Info cards */}
        <section>
          <h2 className="text-xl font-semibold mb-6" style={{ color: COLORS.primary }}>
            {SECTIONS.infoCards}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {infoCards.map((card) => (
              <InfoCard key={card.href} {...card} />
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}

function CourseCard({
  type,
  title,
  subtitle,
  description,
  lessons,
  duration,
  href,
}: {
  type: string
  title: string
  subtitle: string
  description: string
  lessons: number
  duration: string
  href: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4" style={{ backgroundColor: COLORS.primary }}>
        <span
          className="text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
        >
          {type}
        </span>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
          <p className="text-sm" style={{ color: COLORS.accent }}>{subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
        <div className="flex gap-5 text-sm text-gray-400 mb-5">
          <span>📚 {lessons} lekcií</span>
          <span>⏱ {duration}</span>
        </div>
        <Link
          href={href}
          className="block text-center py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: COLORS.primary, color: 'white' }}
        >
          Začať kurz
        </Link>
      </div>
    </div>
  )
}

function InfoCard({
  icon,
  title,
  description,
  href,
}: {
  icon: string
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start"
    >
      <span className="text-2xl shrink-0">{icon}</span>
      <div>
        <h3 className="font-semibold" style={{ color: COLORS.primary }}>{title}</h3>
        <p className="text-sm text-gray-500 mt-1 leading-snug">{description}</p>
      </div>
    </Link>
  )
}
