import { vojenskaPoliciContent } from '@/data/testy/s/vojenska-policia'
import QuizClient from '@/app/components/QuizClient'
import { getTestQuestions } from '@/lib/getTest'

export default async function VojenskaPoliciPage() {
  const questions = await getTestQuestions('Vojenská polícia')
  return <QuizClient questions={questions} content={vojenskaPoliciContent} />
}
