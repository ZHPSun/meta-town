import { FC } from 'react'
import Spaces from './_components/Spaces'
import Header from './_components/Header'
import Input from '@/components/Input'

const Home: FC = () => (
  <div>
    <Header />
    <div className="m-6 w-60">
      <Input prefix={{ name: 'search', label: 'Search' }} />
    </div>
    <Spaces />
  </div>
)

export default Home
