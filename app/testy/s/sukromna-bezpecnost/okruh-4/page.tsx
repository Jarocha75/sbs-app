import { okruh4Content } from '@/data/testy/s/sukromna-bezpecnost-okruh-4'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function Okruh4Page() {
  const { testId, questions } = await getTestWithId('Súkromná bezpečnosť - Okruh 4')
  return <QuizClient questions={questions} content={okruh4Content} testId={testId} />
}
