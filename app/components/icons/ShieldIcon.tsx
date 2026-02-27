import { COLORS } from '@/data/colors'

type Props = {
  size?: number
  /**
   * 'default' — modrý štít, zlatý check (auth stránky, veľký)
   * 'inverted' — zlatý štít, modrý check (Navbar logo)
   */
  variant?: 'default' | 'inverted'
  /** Ak false, obalí SVG do <div className="flex justify-center"> */
  centered?: boolean
}

const ShieldIcon = ({ size = 48, variant = 'default', centered = false }: Props) => {
  const outerFill = variant === 'inverted' ? COLORS.accent : COLORS.primary
  const innerFill = variant === 'inverted' ? COLORS.primary : COLORS.accent

  const svg = (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
        fill={outerFill}
      />
      <path
        d="M10 13l-2-2 1.41-1.41L10 10.17l4.59-4.58L16 7l-6 6z"
        fill={innerFill}
      />
    </svg>
  )

  if (centered) return <div className="flex justify-center">{svg}</div>
  return svg
}

export default ShieldIcon
