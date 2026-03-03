import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const registerSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.email('Neplatná emailová adresa'),
  password: z.string().min(8, 'Heslo musí mať aspoň 8 znakov'),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = registerSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    )
  }
  const { name, email, password } = result.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    if (existingUser.status === 'PENDING') {
      return NextResponse.json(
        { error: 'Tento email čaká na aktiváciu. Skontrolujte svoju emailovú schránku.' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Účet s týmto emailom už existuje' },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      name: name || null,
      email,
      password: hashedPassword,
      role: 'USER',
      status: 'ACTIVE',
    },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
