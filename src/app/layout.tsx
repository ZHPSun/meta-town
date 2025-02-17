import type { Metadata } from 'next'
import './globals.css'
import { FC } from 'react'

export const metadata: Metadata = {
  title: 'Meta Town',
  description:
    'Meta Town is a virtual social space where you can interact with friends in real-time, chat, and join multiplayer video meetings. Jump in and start your metaverse experience now!',
}

interface Props {
  children: React.ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
