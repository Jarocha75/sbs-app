import SluzbaPage from '@/app/components/SluzbaPage'
import { straznaSluzba } from '@/data/sluzby'
import ShieldSolidIcon from '@/app/components/icons/ShieldSolidIcon'

const StraznaSluzbaPage = () => {
  return <SluzbaPage data={straznaSluzba} icon={<ShieldSolidIcon />} />
}

export default StraznaSluzbaPage
