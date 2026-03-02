import { okruh4PContent } from '@/data/testy/p/okruh-4'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function POkruh4Page() {
  const { testId, questions } = await getTestWithId('P - Okruh 4')
  return <QuizClient questions={questions} content={okruh4PContent} testId={testId} />
}
