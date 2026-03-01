import { prisma } from './prisma'
import type { QuizQuestion } from '@/app/components/QuizClient'

function indexToAnswer(i: number): 'A' | 'B' | 'C' {
  return (['A', 'B', 'C'] as const)[i]
}

function mapQuestion(q: { id: string; text: string; options: unknown; correct: number }): QuizQuestion {
  return {
    id: q.id,
    text: q.text,
    options: {
      A: (q.options as string[])[0],
      B: (q.options as string[])[1],
      C: (q.options as string[])[2],
    },
    correct: indexToAnswer(q.correct),
  }
}

export async function getCvicnyTestPQuestions(): Promise<QuizQuestion[]> {
  const titles = ['P - Okruh 1', 'P - Okruh 2', 'P - Okruh 3', 'P - Okruh 4']

  const tests = await Promise.all(
    titles.map((title) =>
      prisma.test.findFirst({
        where: { title },
        include: { questions: true },
      })
    )
  )

  const allQuestions: { id: string; text: string; options: unknown; correct: number }[] = []
  for (const test of tests) {
    if (test) allQuestions.push(...test.questions)
  }

  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 50).map(mapQuestion)
}
