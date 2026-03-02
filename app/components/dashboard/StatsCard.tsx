import { COLORS } from '@/data/colors'

type Props = {
  completedLessons: number
  totalLessons: number
  testCount: number
  avgScore: number | null
}

type StatItemProps = {
  value: string
  label: string
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-2xl font-black" style={{ color: COLORS.primary }}>
        {value}
      </div>
      <div className="text-xs text-gray-400 mt-0.5 leading-tight">{label}</div>
    </div>
  )
}

export default function StatsCard({ completedLessons, totalLessons, testCount, avgScore }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-sm font-semibold mb-4" style={{ color: COLORS.primary }}>
        Môj prehľad
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <StatItem
          value={`${completedLessons}/${totalLessons}`}
          label="lekcie hotové"
        />
        <StatItem
          value={String(testCount)}
          label="testov spravených"
        />
        <StatItem
          value={avgScore != null ? `${avgScore}%` : '—'}
          label="priemerné skóre"
        />
        <StatItem
          value={testCount > 0 && avgScore != null
            ? avgScore >= 75 ? '✓' : '✗'
            : '—'}
          label="pripravený na skúšku"
        />
      </div>
    </div>
  )
}
