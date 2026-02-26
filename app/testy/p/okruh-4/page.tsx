import { okruh4PContent } from '@/data/test-p-okruh-4'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function POkruh4Page() {
  const questions = await getTestQuestions('P - Okruh 4')
  return <QuizClient questions={questions} content={okruh4PContent} />
}
