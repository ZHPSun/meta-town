import { FC } from 'react'
import Header from './_components/Header'
import Stage from './_components/Stage'
import Footer from './_components/Footer'

const Space: FC = () => (
  <div className="flex h-screen flex-col">
    <Header />

    <main className="flex flex-1 items-center justify-center overflow-hidden bg-black bg-opacity-50">
      <Stage />
    </main>

    <Footer />
  </div>
)

export default Space
