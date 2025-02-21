import { FC } from 'react'
import Indicator from './_components/Indicator'

interface Props {
  count: number
}

const Participants: FC<Props> = ({ count }) => (
  <div className="relative">
    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-2xl bg-neutral-300 px-2 py-0.5">
      <Indicator status={count > 0 ? 'online' : 'offline'} />
      <span className="text-xs">{count}</span>
    </div>
  </div>
)

export default Participants
