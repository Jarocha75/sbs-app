import { ustavaContent } from '@/data/test-ustava-sr'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function UstavaSrPage() {
  const questions = await getTestQuestions('Ústava SR a ZĽPS')
  return <QuizClient questions={questions} content={ustavaContent} />
}
