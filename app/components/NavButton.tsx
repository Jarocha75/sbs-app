import { COLORS } from '@/data/colors'

export type Phase = 'quiz' | 'results'

const NavButton = ({
  variant,
  onClick,
  children,
}: {
  variant: 'primary' | 'outline' | 'ghost'
  onClick: () => void
  children: React.ReactNode
}) => {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.625rem 1.375rem',
    borderRadius: '0.75rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'background-color 0.15s, box-shadow 0.15s, transform 0.1s',
    whiteSpace: 'nowrap',
  }

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      ...base,
      backgroundColor: COLORS.primary,
      color: 'white',
      boxShadow: '0 2px 8px rgba(30,58,95,0.25)',
    },
    outline: {
      ...base,
      backgroundColor: 'white',
      color: COLORS.primary,
      borderColor: COLORS.primary,
    },
    ghost: {
      ...base,
      backgroundColor: 'transparent',
      color: '#9ca3af',
      borderColor: '#e5e7eb',
    },
  }

  return (
    <button
      onClick={onClick}
      style={styles[variant]}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        if (variant === 'primary') {
          el.style.boxShadow = '0 4px 14px rgba(30,58,95,0.35)'
          el.style.transform = 'translateY(-1px)'
        } else {
          el.style.backgroundColor = variant === 'outline' ? '#eff6ff' : '#f9fafb'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        if (variant === 'primary') {
          el.style.boxShadow = '0 2px 8px rgba(30,58,95,0.25)'
          el.style.transform = 'translateY(0)'
        } else {
          el.style.backgroundColor = variant === 'outline' ? 'white' : 'transparent'
        }
      }}
    >
      {children}
    </button>
  )
}

export default NavButton
