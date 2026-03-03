import Link from 'next/link'
import ShieldIcon from '@/app/components/icons/ShieldIcon'

interface Props {
  message: string
  showLogin?: boolean
}

const AktivaciaError = ({ message, showLogin }: Props) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-page-bg"
    >
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 text-center">
        <ShieldIcon size={48} centered />
        <h1 className="text-xl font-bold mt-4 text-red-600">Chyba aktivácie</h1>
        <p className="text-gray-500 mt-2 text-sm">{message}</p>
        {showLogin && (
          <Link
            href="/prihlasenie"
            className="mt-6 inline-block font-semibold underline text-sm text-primary"
          >
            Prihlásiť sa
          </Link>
        )}
      </div>
    </div>
  )
}

export default AktivaciaError
