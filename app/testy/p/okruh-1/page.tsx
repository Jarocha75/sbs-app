import { okruh1PContent } from '@/data/testy/p/okruh-1'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function POkruh1Page() {
  const { testId, questions } = await getTestWithId('P - Okruh 1')
  return <QuizClient questions={questions} content={okruh1PContent} testId={testId} />
}
