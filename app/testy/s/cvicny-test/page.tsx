import { getCvicnyTestQuestions } from '@/lib/getCvicnyTest'
import CvicnyTestClient from '@/app/components/CvicnyTestClient'

export default async function CvicnyTestPage() {
  const questions = await getCvicnyTestQuestions()
  return <CvicnyTestClient questions={questions} />
}
