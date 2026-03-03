import { prisma } from '@/lib/prisma'
import AktivaciaClient from './AktivaciaClient'
import AktivaciaError from './AktivaciaError'

const ERR_NO_TOKEN = "Neplatný aktivačný odkaz. Token chýba.";
const ERR_INVALID = "Aktivačný odkaz je neplatný alebo bol už použitý.";
const ERR_ALREADY_ACTIVE = "Váš účet je už aktivovaný. Môžete sa prihlásiť.";
const ERR_EXPIRED = "Platnosť aktivačného odkazu vypršala. Kontaktujte podporu.";

interface Props {
  searchParams: Promise<{ token?: string }>
}

const AktivaciaPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams

  if (!token) {
    return <AktivaciaError message={ERR_NO_TOKEN} />
  }

  const user = await prisma.user.findUnique({
    where: { activationToken: token },
    select: { status: true, activationExpiry: true },
  })

  if (!user) {
    return <AktivaciaError message={ERR_INVALID} />
  }

  if (user.status === 'ACTIVE') {
    return <AktivaciaError message={ERR_ALREADY_ACTIVE} showLogin />
  }

  if (!user.activationExpiry || user.activationExpiry < new Date()) {
    return <AktivaciaError message={ERR_EXPIRED} />
  }

  return <AktivaciaClient token={token} />
}

export default AktivaciaPage
