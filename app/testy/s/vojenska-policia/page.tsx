import { vojenskaPoliciContent } from '@/data/testy/s/vojenska-policia'
import QuizClient from '@/app/components/QuizClient'
import { getTestWithId } from '@/lib/getTest'

export default async function VojenskaPoliciPage() {
  const { testId, questions } = await getTestWithId('Vojenská polícia')
  return <QuizClient questions={questions} content={vojenskaPoliciContent} testId={testId} />
}
