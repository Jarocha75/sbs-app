import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../app/generated/prisma/client'
import { questions as q1 } from '../data/test-sukromna-bezpecnost-okruh-1'
import { questions as q2 } from '../data/test-sukromna-bezpecnost-okruh-2'
import { questions as q3 } from '../data/test-sukromna-bezpecnost-okruh-3'
import { questions as q4 } from '../data/test-sukromna-bezpecnost-okruh-4'
import { questions as qPriestupky } from '../data/test-priestupkove-pravo'
import { questions as qTrestne } from '../data/test-trestne-pravo'
import { questions as qUstava } from '../data/test-ustava-sr'
import { questions as qKriminalistika } from '../data/test-kriminalistika'
import { questions as qPolicajny } from '../data/test-policajny-zbor'
import { questions as qObecnaPolicia } from '../data/test-obecna-policia'
import { questions as qVojenskaPolicia } from '../data/test-vojenska-policia'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

type Answer = 'A' | 'B' | 'C'

type LocalQuestion = {
  id: number
  text: string
  options: { A: string; B: string; C: string }
  correct: Answer
}

function answerToIndex(a: Answer): number {
  return { A: 0, B: 1, C: 2 }[a]
}

function toQuestionsData(questions: LocalQuestion[]) {
  return questions.map(q => ({
    text: q.text,
    options: [q.options.A, q.options.B, q.options.C],
    correct: answerToIndex(q.correct),
  }))
}

function calcPassScore(passMark: number, total: number): number {
  return Math.round((passMark / total) * 100)
}

async function main() {
  console.log('Začínam seed...')

  // Vymazanie existujúcich dát (idempotentné spustenie)
  await prisma.question.deleteMany()
  await prisma.testResult.deleteMany()
  await prisma.progress.deleteMany()
  await prisma.test.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.course.deleteMany()
  console.log('Existujúce dáta vymazané')

  // Kurz Typ S
  const courseS = await prisma.course.create({
    data: {
      title: 'Preukaz SBS - Typ S',
      description: 'Príprava na skúšku odbornej spôsobilosti pre preukaz typu S',
      type: 'S',
      tests: {
        create: [
          {
            title: 'Súkromná bezpečnosť - Okruh 1',
            passScore: calcPassScore(20, 25), // 80%
            questions: { create: toQuestionsData(q1) },
          },
          {
            title: 'Súkromná bezpečnosť - Okruh 2',
            passScore: calcPassScore(20, 25), // 80%
            questions: { create: toQuestionsData(q2) },
          },
          {
            title: 'Súkromná bezpečnosť - Okruh 3',
            passScore: calcPassScore(20, 25), // 80%
            questions: { create: toQuestionsData(q3) },
          },
          {
            title: 'Súkromná bezpečnosť - Okruh 4',
            passScore: calcPassScore(20, 25), // 80%
            questions: { create: toQuestionsData(q4) },
          },
          {
            title: 'Priestupkové právo',
            passScore: calcPassScore(8, 10), // 80%
            questions: { create: toQuestionsData(qPriestupky) },
          },
          {
            title: 'Trestné právo',
            passScore: calcPassScore(22, 27), // 82%
            questions: { create: toQuestionsData(qTrestne) },
          },
          {
            title: 'Ústava SR a ZĽPS',
            passScore: calcPassScore(10, 12), // 83%
            questions: { create: toQuestionsData(qUstava) },
          },
          {
            title: 'Kriminalistika',
            passScore: calcPassScore(10, 13), // 77%
            questions: { create: toQuestionsData(qKriminalistika) },
          },
          {
            title: 'Policajný zbor',
            passScore: calcPassScore(12, 15), // 80%
            questions: { create: toQuestionsData(qPolicajny) },
          },
          {
            title: 'Obecná polícia',
            passScore: calcPassScore(7, 9), // 78%
            questions: { create: toQuestionsData(qObecnaPolicia) },
          },
          {
            title: 'Vojenská polícia',
            passScore: calcPassScore(4, 5), // 80%
            questions: { create: toQuestionsData(qVojenskaPolicia) },
          },
        ],
      },
    },
  })

  console.log(`Kurz vytvorený: ${courseS.title}`)

  // Kurz Typ P (zatiaľ prázdny)
  const courseP = await prisma.course.create({
    data: {
      title: 'Preukaz SBS - Typ P',
      description: 'Príprava na skúšku odbornej spôsobilosti pre preukaz typu P',
      type: 'P',
    },
  })

  console.log(`Kurz vytvorený: ${courseP.title}`)
  console.log('Seed úspešne dokončený!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
