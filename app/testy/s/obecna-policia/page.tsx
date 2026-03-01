import { obecnaPoliciContent } from '@/data/testy/s/obecna-policia'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function ObecnaPoliciaPage() {
  const questions = await getTestQuestions('Obecná polícia')
  return <QuizClient questions={questions} content={obecnaPoliciContent} />
}
