import { FC } from 'react'
import clsx from 'clsx'
import Button from '@/components/Button'

export type Status = 'online' | 'offline'

interface Props {
  count: number
  status: Status
  isSideWindowOpen?: boolean
  onClick: () => void
}

export const STATUS = {
  online: clsx('bg-green-500'),
  offline: clsx('bg-gray-500'),
} as const

const PARTICIPANT_STATUS = {
  online: 'Available',
  offline: 'Unavailable',
} as const

const Participants: FC<Props> = ({
  count,
  status,
  isSideWindowOpen = false,
  onClick,
}) => (
  <Button
    variant={isSideWindowOpen ? 'secondary' : 'naked'}
    prefix={{ label: 'Users', icon: 'users' }}
    onClick={onClick}
    aria-label="Participants"
  >
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
