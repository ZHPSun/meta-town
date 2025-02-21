import Input from '@/components/Input'
import { FC } from 'react'
import Filter from './_components/Filter'
import Header from './_components/Header'
import Spaces from './_components/Spaces'

const Home: FC = () => (
  <div>
    <Header />

    <Filter />

    <div className="m-6 w-60">
      <Input prefix={{ name: 'search', label: 'Search' }} />
    </div>
    <Spaces />
  </div>
)

export default Home
