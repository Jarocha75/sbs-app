import { getCvicnyTestPQuestions } from '@/lib/getCvicnyTestP'
import CvicnyTestPClient from '@/app/components/CvicnyTestPClient'

export default async function CvicnyTestPPage() {
  const questions = await getCvicnyTestPQuestions()
  return <CvicnyTestPClient questions={questions} />
}
