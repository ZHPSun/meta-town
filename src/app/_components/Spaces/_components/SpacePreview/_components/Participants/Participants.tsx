import { FC } from 'react'
import Indicator from './_components/Indicator'

interface Props {
  count: number
}

const Participants: FC<Props> = ({ count }) => (
  <div className="absolute">
    <Indicator status={count > 0 ? 'online' : 'offline'} />
    <span className="text-xs">{count}</span>
  </div>
)

export default Participants
