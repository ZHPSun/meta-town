import { FC } from 'react'
import clsx from 'clsx'

interface Props {
  name: string
  time: string
  isSender?: boolean
}

const Meta: FC<Props> = ({ name, time, isSender = false }) => (
  <div
    role="contentinfo"
    aria-label="meta"
    className={clsx({ 'text-right': isSender })}
  >
    <span className="mr-2 text-sm">{name}</span>
    <span className="text-sm">{time}</span>
  </div>
)

export default Meta
