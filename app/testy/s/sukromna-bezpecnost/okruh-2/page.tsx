import { okruh2Content } from '@/data/testy/s/sukromna-bezpecnost-okruh-2'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function Okruh2Page() {
  const questions = await getTestQuestions('Súkromná bezpečnosť - Okruh 2')
  return <QuizClient questions={questions} content={okruh2Content} />
}
