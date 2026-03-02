import { prisma } from '@/lib/prisma'
import AktivaciaClient from './AktivaciaClient'
import AktivaciaError from './AktivaciaError'

interface Props {
  searchParams: Promise<{ token?: string }>
}

const AktivaciaPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams

  if (!token) {
    return <AktivaciaError message="Neplatný aktivačný odkaz. Token chýba." />
  }

  const user = await prisma.user.findUnique({
    where: { activationToken: token },
    select: { status: true, activationExpiry: true },
  })

  if (!user) {
    return <AktivaciaError message="Aktivačný odkaz je neplatný alebo bol už použitý." />
  }

  if (user.status === 'ACTIVE') {
    return <AktivaciaError message="Váš účet je už aktivovaný. Môžete sa prihlásiť." showLogin />
  }

  if (!user.activationExpiry || user.activationExpiry < new Date()) {
    return <AktivaciaError message="Platnosť aktivačného odkazu vypršala. Kontaktujte podporu." />
  }

  return <AktivaciaClient token={token} />
}

export default AktivaciaPage
