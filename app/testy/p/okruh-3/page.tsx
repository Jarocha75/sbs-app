import { okruh3PContent } from '@/data/testy/p/okruh-3'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function POkruh3Page() {
  const { testId, questions } = await getTestWithId('P - Okruh 3')
  return <QuizClient questions={questions} content={okruh3PContent} testId={testId} />
}
