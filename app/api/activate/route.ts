import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const activateSchema = z.object({
  token: z.string().min(1, 'Token je povinný'),
  password: z.string().min(8, 'Heslo musí mať aspoň 8 znakov'),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = activateSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    )
  }

  const { token, password } = result.data

  const user = await prisma.user.findUnique({
    where: { activationToken: token },
  })

  if (!user) {
    return NextResponse.json(
      { error: 'Neplatný aktivačný odkaz.' },
      { status: 400 }
    )
  }

  if (!user.activationExpiry || user.activationExpiry < new Date()) {
    return NextResponse.json(
      { error: 'Aktivačný odkaz vypršal. Kontaktujte podporu.' },
      { status: 400 }
    )
  }

  if (user.status === 'ACTIVE') {
    return NextResponse.json(
      { error: 'Váš účet je už aktivovaný. Prihláste sa.' },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      status: 'ACTIVE',
      activationToken: null,
      activationExpiry: null,
    },
  })

  return NextResponse.json({ success: true }, { status: 200 })
}
