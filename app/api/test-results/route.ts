import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

const testResultSchema = z.object({
  testId: z.string().min(1),
  score: z.number().int().min(0).max(100),
  passed: z.boolean(),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const result = testResultSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 })
  }
  const { testId, score, passed } = result.data

  const testExists = await prisma.test.findUnique({ where: { id: testId }, select: { id: true } })
  if (!testExists) {
    return NextResponse.json({ error: 'Test neexistuje' }, { status: 404 })
  }

  const saved = await prisma.testResult.create({
    data: { userId: session.user.id, testId, score, passed },
  })

  return NextResponse.json({ id: saved.id })
}
