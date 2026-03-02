import { policajnyZborContent } from '@/data/testy/s/policajny-zbor'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function PolicajnyZborPage() {
  const { testId, questions } = await getTestWithId('Policajný zbor')
  return <QuizClient questions={questions} content={policajnyZborContent} testId={testId} />
}
