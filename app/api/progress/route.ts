import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nie ste prihlásený' }, { status: 401 })
  }

  let lessonId: string | undefined
  try {
    const body = await req.json()
    lessonId = body?.lessonId
  } catch {
    return NextResponse.json({ error: 'Neplatné telo požiadavky' }, { status: 400 })
  }

  if (!lessonId || typeof lessonId !== 'string') {
    return NextResponse.json({ error: 'lessonId je povinný' }, { status: 400 })
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { id: true },
  })

  if (!lesson) {
    return NextResponse.json({ error: 'Lekcia neexistuje' }, { status: 404 })
  }

  await prisma.progress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
    update: { completed: true },
    create: { userId: session.user.id, lessonId, completed: true },
  })

  return NextResponse.json({ ok: true })
}
