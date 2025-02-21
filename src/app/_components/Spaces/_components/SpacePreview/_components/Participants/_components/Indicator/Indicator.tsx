import { FC } from 'react'
import clsx from 'clsx'

interface Props {
  status: 'online' | 'offline'
}

export const STATUS = {
  online: 'bg-green-500',
  offline: 'bg-red-500',
}

const Indicator: FC<Props> = ({ status }) => (
  <div className="inline-block pl-2 pr-1">
    <span
      role="status"
      className={clsx('inline-block h-2 w-2 rounded-full', STATUS[status])}
    />
  </div>
)

export default Indicator
