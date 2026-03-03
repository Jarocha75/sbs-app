import { getCvicnyTestQuestions } from '@/lib/getCvicnyTest'
import CvicnyTestClient from '@/app/components/CvicnyTestClient'

const CvicnyTestPage = async () => {
  const questions = await getCvicnyTestQuestions()
  return <CvicnyTestClient questions={questions} />
}

export default CvicnyTestPage
