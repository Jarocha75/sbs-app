import SluzbaPage from '@/app/components/SluzbaPage'
import { detektivnaSluzba } from '@/data/sluzby'
import { COLORS } from '@/data/colors'

export default function DetektivnaSluzbaPage() {
  return <SluzbaPage data={detektivnaSluzba} icon={<DetektivIcon />} />
}

function DetektivIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke={COLORS.accent} strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
