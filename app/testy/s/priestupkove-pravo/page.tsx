import { priestupkyContent } from '@/data/test-priestupkove-pravo'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function PriestupkovePravoPage() {
  const questions = await getTestQuestions('Priestupkové právo')
  return <QuizClient questions={questions} content={priestupkyContent} />
}
