import { ochranaOsobnychUdajovContent } from '@/data/testy/s/ochrana-osobnych-udajov'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function OchranaOsobnychUdajovPage() {
  const { testId, questions } = await getTestWithId('Ochrana osobných údajov')
  return <QuizClient questions={questions} content={ochranaOsobnychUdajovContent} testId={testId} />
}
