import SluzbaPage from '@/app/components/SluzbaPage'
import { odbornaPriprava } from '@/data/sluzby'
import GraduationIcon from '@/app/components/icons/GraduationIcon'

const OdbornaPripravaPage = () => {
  return <SluzbaPage data={odbornaPriprava} icon={<GraduationIcon />} />
}

export default OdbornaPripravaPage
