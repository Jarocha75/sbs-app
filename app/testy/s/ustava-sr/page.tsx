import { ustavaContent } from '@/data/testy/s/ustava-sr'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function UstavaSrPage() {
  const { testId, questions } = await getTestWithId('Ústava SR a ZĽPS')
  return <QuizClient questions={questions} content={ustavaContent} testId={testId} />
}
