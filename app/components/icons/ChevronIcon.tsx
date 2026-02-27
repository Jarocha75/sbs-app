type Props = {
  rotated?: boolean
}

const ChevronIcon = ({ rotated = false }: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`transition-transform duration-200 ${rotated ? 'rotate-180' : ''}`}
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  )
}

export default ChevronIcon
