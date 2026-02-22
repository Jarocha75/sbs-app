import Link from 'next/link'
import { COLORS } from '@/data/colors'

const courses = [
  {
    type: 'S',
    title: 'Preukaz typu S',
    subtitle: 'Strážnik',
    description:
      'Základný kurz pre fyzickú ochranu osôb a majetku. Po absolvovaní budete pripravení na odbornú skúšku pred MV SR.',
    lessons: 12,
    duration: '24 hodín',
    href: '/kurzy/s',
  },
  {
    type: 'P',
    title: 'Preukaz typu P',
    subtitle: 'Vedúci strážnik / Manažér bezpečnosti',
    description:
      'Rozšírený kurz pre vedúcich pracovníkov SBS. Nadstavba na typ S — organizácia, riadenie a zodpovednosť.',
    lessons: 8,
    duration: '16 hodín',
    href: '/kurzy/p',
  },
]

const infoCards = [
  {
    icon: '📋',
    title: 'Zákon o SBS',
    description: 'Zákon č. 473/2005 Z.z. o poskytovaní služieb v oblasti súkromnej bezpečnosti',
    href: '/zakon',
  },
  {
    icon: '🏢',
    title: 'O firme',
    description: 'Charakteristika spoločnosti, licencie a oblasti pôsobenia',
    href: '/o-firme',
  },
  {
    icon: '❓',
    title: 'Časté otázky',
    description: 'Odpovede na najčastejšie otázky týkajúce sa preukazov a skúšok',
    href: '/faq',
  },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: COLORS.pageBg }}>

      {/* Hero banner */}
      <div style={{ backgroundColor: COLORS.primary }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">
            Vitajte v SBS Akademii
          </h1>
          <p className="mt-2 text-gray-300 max-w-xl">
            Pripravte sa na získanie preukazu odbornej spôsobilosti podľa zákona č. 473/2005 Z.z.
            Absolvujte kurz online, kedykoľvek a odkiaľkoľvek.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">

        {/* Courses */}
        <section>
          <h2 className="text-xl font-semibold mb-6" style={{ color: COLORS.primary }}>
            Dostupné kurzy
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
            Užitočné informácie
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
