import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { testId, score, passed } = body as { testId: string; score: number; passed: boolean }

  if (!testId || score == null || passed == null) {
    return NextResponse.json({ error: 'Chýbajúce dáta' }, { status: 400 })
  }

  const testExists = await prisma.test.findUnique({ where: { id: testId }, select: { id: true } })
  if (!testExists) {
    return NextResponse.json({ error: 'Test neexistuje' }, { status: 404 })
  }

  const result = await prisma.testResult.create({
    data: { userId: session.user.id, testId, score, passed },
  })

  return NextResponse.json({ id: result.id })
}
