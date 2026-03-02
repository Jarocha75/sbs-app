import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import QuizClient from '@/app/components/QuizClient'
import type { QuizQuestion, QuizContent } from '@/app/components/QuizClient'

type Props = { params: Promise<{ testId: string }> }

export default async function TestPage({ params }: Props) {
  const { testId } = await params

  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: {
      questions: { orderBy: { createdAt: 'asc' } },
      course: { select: { type: true } },
    },
  })

  if (!test) notFound()

  const questions: QuizQuestion[] = test.questions.map((q) => ({
    id: q.id,
    text: q.text,
    options: {
      A: (q.options as string[])[0],
      B: (q.options as string[])[1],
      C: (q.options as string[])[2],
    },
    correct: (['A', 'B', 'C'] as const)[q.correct],
  }))

  const total = questions.length
  const passMark = Math.ceil((test.passScore / 100) * total)
  const courseSlug = test.course.type.toLowerCase()

  const content: QuizContent = {
    hero: {
      title: test.title,
      subtitle: `${total} otázok · min. ${test.passScore} % na úspech`,
    },
    backHref: `/testy/${courseSlug}`,
    backLabel: '← Späť na testy',
    result: {
      passMark,
      passed: 'Úspešne ste zvládli test!',
      failed: 'Skúste to ešte raz.',
    },
  }

  return <QuizClient questions={questions} content={content} testId={test.id} showDashboardLink />
}
