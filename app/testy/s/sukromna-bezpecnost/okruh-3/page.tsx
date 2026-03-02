import { okruh3Content } from '@/data/testy/s/sukromna-bezpecnost-okruh-3'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function Okruh3Page() {
  const { testId, questions } = await getTestWithId('Súkromná bezpečnosť - Okruh 3')
  return <QuizClient questions={questions} content={okruh3Content} testId={testId} />
}
