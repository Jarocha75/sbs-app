import { obecnaPoliciContent } from '@/data/testy/s/obecna-policia'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function ObecnaPoliciaPage() {
  const { testId, questions } = await getTestWithId('Obecná polícia')
  return <QuizClient questions={questions} content={obecnaPoliciContent} testId={testId} />
}
