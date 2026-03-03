import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: { userId: session.user.id },
    include: { course: { select: { type: true } } },
    orderBy: { createdAt: 'desc' },
  })

  if (!enrollment) {
    return NextResponse.json({ redirect: '/dashboard' })
  }

  const courseType = enrollment.course.type.toLowerCase()
  return NextResponse.json({ redirect: `/kurzy/${courseType}/lekcie` })
}
