import { ochranaOsobnychUdajovContent } from '@/data/testy/s/ochrana-osobnych-udajov'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function OchranaOsobnychUdajovPage() {
  const questions = await getTestQuestions('Ochrana osobných údajov')
  return <QuizClient questions={questions} content={ochranaOsobnychUdajovContent} />
}
