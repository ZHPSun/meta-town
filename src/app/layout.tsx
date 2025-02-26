import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meta Town',
  description:
    'Meta Town is a virtual social space where you can interact with friends in real-time, chat, and join multiplayer video meetings. Jump in and start your metaverse experience now!',
}

interface Props {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en">
    <body>{children}</body>
    <div id="modal-root" />
  </html>
)

export default RootLayout
