'use client'

import { FC, useState } from 'react'
import clsx from 'clsx'
import IconButton from '@/components/IconButton'
import MapView from './_components/MapView'
import MeetingView from './_components/MeetingView'

export const VIEW = {
  map: clsx('left-0 right-0 top-0'),
  meeting: clsx('inset-0'),
} as const

const Meeting: FC = () => {
  const [view, setView] = useState<'map' | 'meeting'>('map')

  return (
    <div
      role="presentation"
      aria-label="Meeting"
      className={clsx('absolute flex flex-col space-y-2 px-6 py-4', VIEW[view])}
    >
      <div className="space-x-2 text-right">
        <IconButton
          label="Map view"
          icon="grip-horizontal"
          variant={view === 'map' ? 'secondary' : 'naked'}
          size="small"
          onClick={() => setView('map')}
        />
        <IconButton
          label="Meeting view"
          icon="grip"
          variant={view === 'meeting' ? 'secondary' : 'naked'}
          size="small"
          tooltip={{ position: 'bottom-right' }}
          onClick={() => setView('meeting')}
        />
      </div>
      <div className="h-full flex-1">
        {
          {
            map: <MapView />,
            meeting: <MeetingView participantCount={16} />,
          }[view]
        }
      </div>
    </div>
  )
}

export default Meeting
