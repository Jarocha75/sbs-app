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

async function getRandomFrom(title: string, count: number): Promise<QuizQuestion[]> {
  const test = await prisma.test.findFirst({
    where: { title },
    include: { questions: true },
  })
  if (!test) throw new Error(`Test "${title}" nebol nájdený`)
  const shuffled = [...test.questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length)).map(mapQuestion)
}

async function getRandomFromMultiple(titles: string[], count: number): Promise<QuizQuestion[]> {
  const allQuestions: { id: string; text: string; options: unknown; correct: number }[] = []
  for (const title of titles) {
    const test = await prisma.test.findFirst({
      where: { title },
      include: { questions: true },
    })
    if (test) allQuestions.push(...test.questions)
  }
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length)).map(mapQuestion)
}

export async function getCvicnyTestQuestions(): Promise<QuizQuestion[]> {
  const sbsTitles = [
    'Súkromná bezpečnosť - Okruh 1',
    'Súkromná bezpečnosť - Okruh 2',
    'Súkromná bezpečnosť - Okruh 3',
    'Súkromná bezpečnosť - Okruh 4',
  ]

  const [
    sbs,
    priestupky,
    trestne,
    ustava,
    kriminalistika,
    obecna,
    vojenska,
    ochrana,
    sis,
    policajny,
    prakticke,
  ] = await Promise.all([
    getRandomFromMultiple(sbsTitles, 20),
    getRandomFrom('Priestupkové právo', 1),
    getRandomFrom('Trestné právo', 1),
    getRandomFrom('Ústava SR a ZĽPS', 1),
    getRandomFrom('Kriminalistika', 1),
    getRandomFrom('Obecná polícia', 1),
    getRandomFrom('Vojenská polícia', 1),
    getRandomFrom('Ochrana osobných údajov', 1),
    getRandomFrom('Slovenská informačná služba', 1),
    getRandomFrom('Policajný zbor', 2),
    getRandomFrom('Praktické otázky SBS', 10),
  ])

  const all = [
    ...sbs,
    ...priestupky,
    ...trestne,
    ...ustava,
    ...kriminalistika,
    ...obecna,
    ...vojenska,
    ...ochrana,
    ...sis,
    ...policajny,
    ...prakticke,
  ]

  // Shuffle all 40 together
  return [...all].sort(() => Math.random() - 0.5)
}
