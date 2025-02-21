import { FC } from 'react'
import Option from './_components/Options'

interface Props {
  name: string
  time: string
}

const Info: FC<Props> = ({ name, time }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm">{name}</span>
    <div className="flex items-center gap-4">
      <span className="text-sm">{time}</span>
      <Option />
    </div>
  </div>
)

export default Info
