import { FC } from 'react'
import Participants from './_components/Participants'

const Footer: FC = () => (
  <footer className="flex justify-between">
    <div />
    <Participants count={0} status="online" />
  </footer>
)

export default Footer
