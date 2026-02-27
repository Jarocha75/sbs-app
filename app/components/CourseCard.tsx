import Link from 'next/link'
import { COLORS } from '@/data/colors'

type CourseCardProps = {
  type: string
  title: string
  subtitle: string
  description: string
  lessons: number
  duration: string
  href: string
}

const CourseCard = ({
  type,
  title,
  subtitle,
  description,
  lessons,
  duration,
  href,
}: CourseCardProps) => {
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

export default CourseCard
