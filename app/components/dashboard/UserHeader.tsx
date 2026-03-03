import { COLORS } from '@/data/colors'

const STATUS_ACTIVE = 'ACTIVE'
const LABEL_ACTIVE = '● AKTÍVNY'
const LABEL_PENDING = '● ČAKÁ NA AKTIVÁCIU'

type Props = {
  name: string | null
  email: string
  status: 'PENDING' | 'ACTIVE'
}

const getInitials = (name: string | null, email: string): string => {
  if (name) {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return parts[0].slice(0, 2).toUpperCase()
  }
  return email.slice(0, 2).toUpperCase()
}

const UserHeader = ({ name, email, status }: Props) => {
  const initials = getInitials(name, email)
  const isActive = status === STATUS_ACTIVE

  return (
    <div style={{ backgroundColor: COLORS.primary }} className="py-8 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
            style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
          >
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">
              Vitajte, {name ?? email}!
            </h1>
            <p className="text-sm mt-0.5" style={{ color: COLORS.accent }}>
              {email}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <span
          className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            backgroundColor: isActive ? COLORS.success : COLORS.warning,
            color: 'white',
          }}
        >
          {isActive ? LABEL_ACTIVE : LABEL_PENDING}
        </span>
      </div>
    </div>
  )
}

export default UserHeader
