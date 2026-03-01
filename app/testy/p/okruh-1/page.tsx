import { okruh1PContent } from '@/data/testy/p/okruh-1'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function POkruh1Page() {
  const questions = await getTestQuestions('P - Okruh 1')
  return <QuizClient questions={questions} content={okruh1PContent} />
}
