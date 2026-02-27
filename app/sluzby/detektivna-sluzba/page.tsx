import SluzbaPage from '@/app/components/SluzbaPage'
import { detektivnaSluzba } from '@/data/sluzby'
import DetektivIcon from '@/app/components/icons/DetektivIcon'

const DetektivnaSluzbaPage = () => {
  return <SluzbaPage data={detektivnaSluzba} icon={<DetektivIcon />} />
}

export default DetektivnaSluzbaPage
