import { policajnyZborContent } from '@/data/test-policajny-zbor'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function PolicajnyZborPage() {
  const questions = await getTestQuestions('Policajný zbor')
  return <QuizClient questions={questions} content={policajnyZborContent} />
}
