import { kriminalistikaContent } from '@/data/testy/s/kriminalistika'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function KriminalistikaPage() {
  const { testId, questions } = await getTestWithId('Kriminalistika')
  return <QuizClient questions={questions} content={kriminalistikaContent} testId={testId} />
}
