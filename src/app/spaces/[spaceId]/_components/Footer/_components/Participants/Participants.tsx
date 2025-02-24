import Button from '@/components/Button'
import clsx from 'clsx'
import { FC } from 'react'

export type Status = 'online' | 'offline'

interface Props {
  count: number
  status: Status
}

export const STATUS = {
  online: clsx('bg-green-500'),
  offline: clsx('bg-gray-500'),
}

const PARTICIPANT_STATUS = {
  online: 'Available',
  offline: 'Unavailable',
}

const Participants: FC<Props> = ({ count, status }) => (
  <Button variant="secondary" prefix={{ label: 'Users', icon: 'users' }}>
    <span
      className={clsx(
        STATUS[status],
        'mx-2 inline-block h-3 w-3 rounded-full bg-green-500'
      )}
      aria-label={`Participant Status: ${PARTICIPANT_STATUS[status]}`}
    />
    <span>{count}</span>
  </Button>
)

export default Participants
