import { trestneContent } from '@/data/testy/s/trestne-pravo'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function TrestnePravoPage() {
  const { testId, questions } = await getTestWithId('Trestné právo')
  return <QuizClient questions={questions} content={trestneContent} testId={testId} />
}
