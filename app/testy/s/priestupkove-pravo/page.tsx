import { priestupkyContent } from '@/data/testy/s/priestupkove-pravo'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function PriestupkovePravoPage() {
  const { testId, questions } = await getTestWithId('Priestupkové právo')
  return <QuizClient questions={questions} content={priestupkyContent} testId={testId} />
}
