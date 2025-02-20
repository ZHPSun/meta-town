import { FC } from 'react'
import Header from './_components/Header'
import Input from '@/components/Input'

const Home: FC = () => (
  <div>
    <Header />
    <div className="m-6 w-60">
      <Input prefix={{ name: 'search', label: 'Search' }} />
    </div>
  </div>
)

export default Home
