import clsx from 'clsx'
import { FC } from 'react'
import IconButton from '@/components/IconButton'
import Video from '../Video'

interface Props {
  participantCount: number
}

export const GRID = [
  clsx('grid-cols-1 grid-rows-1'),
  clsx('grid-cols-2 grid-rows-1'),
  clsx('grid-cols-2 grid-rows-2'),
  clsx('grid-cols-2 grid-rows-2'),
  clsx('grid-cols-3 grid-rows-2'),
  clsx('grid-cols-3 grid-rows-2'),
  clsx('grid-cols-3 grid-rows-3'),
  clsx('grid-cols-3 grid-rows-3'),
  clsx('grid-cols-3 grid-rows-3'),
  clsx('grid-cols-4'),
]

const MeetingView: FC<Props> = ({ participantCount }) => (
  <div
    role="region"
    aria-label="Meeting View"
    className="flex h-full items-center space-x-8"
  >
    <IconButton variant="primary" label="Previous" icon="chevron-left" />

    <div
      role="grid"
      aria-label="Grid"
      className={clsx(
        'grid flex-1 gap-4',
        GRID[Math.min(participantCount - 1, GRID.length - 1)]
      )}
    >
      {Array.from({ length: participantCount }).map((_, index) => (
        <div key={index}>
          <Video />
        </div>
      ))}
    </div>

    <IconButton variant="primary" label="Next" icon="chevron-right" />
  </div>
)

export default MeetingView
