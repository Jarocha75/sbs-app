import { okruh1Content } from '@/data/testy/s/sukromna-bezpecnost-okruh-1'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function Okruh1Page() {
  const { testId, questions } = await getTestWithId('Súkromná bezpečnosť - Okruh 1')
  return <QuizClient questions={questions} content={okruh1Content} testId={testId} />
}
