import { trestneContent } from '@/data/testy/s/trestne-pravo'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function TrestnePravoPage() {
  const questions = await getTestQuestions('Trestné právo')
  return <QuizClient questions={questions} content={trestneContent} />
}
