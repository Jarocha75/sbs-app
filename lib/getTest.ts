import { prisma } from './prisma'
import type { QuizQuestion } from '@/app/components/QuizClient'

type Answer = 'A' | 'B' | 'C'

function indexToAnswer(i: number): Answer {
  return (['A', 'B', 'C'] as Answer[])[i]
}

export async function getTestQuestions(title: string): Promise<QuizQuestion[]> {
  const test = await prisma.test.findFirst({
    where: { title },
    include: { questions: { orderBy: { createdAt: 'asc' } } },
  })

  if (!test) throw new Error(`Test "${title}" nebol nájdený v databáze`)

  return test.questions.map((q) => ({
    id: q.id,
    text: q.text,
    options: {
      A: (q.options as string[])[0],
      B: (q.options as string[])[1],
      C: (q.options as string[])[2],
    },
    correct: indexToAnswer(q.correct),
  }))
}
