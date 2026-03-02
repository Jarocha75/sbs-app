import { okruh2Content } from '@/data/testy/s/sukromna-bezpecnost-okruh-2'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function Okruh2Page() {
  const { testId, questions } = await getTestWithId('Súkromná bezpečnosť - Okruh 2')
  return <QuizClient questions={questions} content={okruh2Content} testId={testId} />
}
