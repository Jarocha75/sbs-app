import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AktivaciaClient from './AktivaciaClient'
import { COLORS } from '@/data/colors'
import ShieldIcon from '@/app/components/icons/ShieldIcon'

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function AktivaciaPage({ searchParams }: Props) {
  const { token } = await searchParams

  if (!token) {
    return <AktivaciaError message="Neplatný aktivačný odkaz. Token chýba." />
  }

  const user = await prisma.user.findUnique({
    where: { activationToken: token },
    select: { status: true, activationExpiry: true },
  })

  if (!user) {
    return (
      <AktivaciaError message="Aktivačný odkaz je neplatný alebo bol už použitý." />
    )
  }

  if (user.status === 'ACTIVE') {
    return (
      <AktivaciaError
        message="Váš účet je už aktivovaný. Môžete sa prihlásiť."
        showLogin
      />
    )
  }

  if (!user.activationExpiry || user.activationExpiry < new Date()) {
    return (
      <AktivaciaError message="Platnosť aktivačného odkazu vypršala. Kontaktujte podporu." />
    )
  }

  return <AktivaciaClient token={token} />
}

function AktivaciaError({
  message,
  showLogin,
}: {
  message: string
  showLogin?: boolean
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: COLORS.pageBg }}
    >
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 text-center">
        <ShieldIcon size={48} centered />
        <h1 className="text-xl font-bold mt-4 text-red-600">Chyba aktivácie</h1>
        <p className="text-gray-500 mt-2 text-sm">{message}</p>
        {showLogin && (
          <Link
            href="/prihlasenie"
            className="mt-6 inline-block font-semibold underline text-sm"
            style={{ color: COLORS.primary }}
          >
            Prihlásiť sa
          </Link>
        )}
      </div>
    </div>
  )
}
