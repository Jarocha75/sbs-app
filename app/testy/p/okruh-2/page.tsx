import { okruh2PContent } from '@/data/testy/p/okruh-2'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function POkruh2Page() {
  const { testId, questions } = await getTestWithId('P - Okruh 2')
  return <QuizClient questions={questions} content={okruh2PContent} testId={testId} />
}
