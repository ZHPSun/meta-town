import { FC } from 'react'
import Header from './_components/Header'
import Stage from './_components/Stage'
import Footer from './_components/Footer'

const Space: FC = () => (
  <div className="flex min-h-screen flex-col">
    <Header />

    <main className="flex-1">
      <Stage />
    </main>

    <Footer />
  </div>
)

export default Space
