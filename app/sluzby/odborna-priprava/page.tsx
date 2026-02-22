import SluzbaPage from '@/app/components/SluzbaPage'
import { odbornaPriprava } from '@/data/sluzby'
import { COLORS } from '@/data/colors'

export default function OdbornaPripravaPage() {
  return <SluzbaPage data={odbornaPriprava} icon={<GraduationIcon />} />
}

function GraduationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill={COLORS.accent} />
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill={COLORS.accent} opacity=".7" />
    </svg>
  )
}
