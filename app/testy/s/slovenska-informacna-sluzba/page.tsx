import { slovenskaInformacnaSluzbaContent } from '@/data/testy/s/slovenska-informacna-sluzba'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function SlovenskaInformacnaSluzbaPage() {
  const { testId, questions } = await getTestWithId('Slovenská informačná služba')
  return <QuizClient questions={questions} content={slovenskaInformacnaSluzbaContent} testId={testId} />
}
