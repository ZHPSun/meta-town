'use client'

import { FC, useState } from 'react'
import IconButton from '@/components/IconButton'
import MapView from './_components/MapView'
import MeetingView from './_components/MeetingView'

const Meeting: FC = () => {
  const [view, setView] = useState<'map' | 'meeting'>('map')

  return (
    <div className="absolute inset-0 flex flex-col space-y-2 px-6 py-4">
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
