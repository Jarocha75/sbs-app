import { okruh2PContent } from '@/data/test-p-okruh-2'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function POkruh2Page() {
  const questions = await getTestQuestions('P - Okruh 2')
  return <QuizClient questions={questions} content={okruh2PContent} />
}
