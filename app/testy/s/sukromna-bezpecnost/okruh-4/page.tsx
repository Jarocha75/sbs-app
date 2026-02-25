import { okruh4Content } from '@/data/test-sukromna-bezpecnost-okruh-4'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function Okruh4Page() {
  const questions = await getTestQuestions('Súkromná bezpečnosť - Okruh 4')
  return <QuizClient questions={questions} content={okruh4Content} />
}
