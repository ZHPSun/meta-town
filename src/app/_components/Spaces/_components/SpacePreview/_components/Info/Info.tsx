import { FC } from 'react'
import Option from './_components/Options'

interface Props {
  name: string
  time: string
}

const Info: FC<Props> = ({ name, time }) => (
  <div className="flex items-center justify-between pt-1">
    <span className="text">{name}</span>
    <div className="flex items-center gap-4">
      <span className="text-sm text-neutral-500">{time}</span>
      <Option />
    </div>
  </div>
)

export default Info
