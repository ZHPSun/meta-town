import { FC } from 'react'
import Footer from './_components/Footer'
import SideWindow from './_components/Footer/_components/SideWindow'
import Header from './_components/Header'
import Meeting from './_components/Meeting'
import Stage from './_components/Stage'

const Space: FC = () => (
  <div className="flex h-screen flex-col">
    <Header />

    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-neutral-400">
      <Stage />
      <SideWindow header={<h2>Chat</h2>}>Content</SideWindow>
      <Meeting />
    </main>
    <div>
      <Footer />
    </div>
  </div>
)

export default Space
