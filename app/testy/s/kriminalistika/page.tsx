import { kriminalistikaContent } from '@/data/test-kriminalistika'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function KriminalistikaPage() {
  const questions = await getTestQuestions('Kriminalistika')
  return <QuizClient questions={questions} content={kriminalistikaContent} />
}
