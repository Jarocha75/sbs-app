import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email a heslo sú povinné' },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Heslo musí mať aspoň 8 znakov' },
      { status: 400 }
    )
  }

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
