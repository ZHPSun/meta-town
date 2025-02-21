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
  <div role="status" className={clsx('h-2 w-2 rounded-full', STATUS[status])} />
)

export default Indicator
