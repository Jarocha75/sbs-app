import { slovenskaInformacnaSluzbaContent } from '@/data/testy/s/slovenska-informacna-sluzba'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function SlovenskaInformacnaSluzbaPage() {
  const questions = await getTestQuestions('Slovenská informačná služba')
  return <QuizClient questions={questions} content={slovenskaInformacnaSluzbaContent} />
}
