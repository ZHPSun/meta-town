'use client'

import { FC, useState } from 'react'
import IconButton from '@/components/IconButton'
import MapView from './_components/MapView'
import MeetingView from './_components/MeetingView'

const Meeting: FC = () => {
  const [isMapView, setIsMapView] = useState(true)

  return (
    <div className="absolute left-0 top-4 h-full w-full">
      <div className="absolute right-0 top-0">
        <IconButton
          label="Map view"
          icon="grip-horizontal"
          variant={isMapView ? 'primary' : 'naked'}
          size="small"
          onClick={() => setIsMapView(true)}
        />
        <IconButton
          label="Meeting view"
          icon="grip"
          variant={isMapView ? 'naked' : 'primary'}
          size="small"
          onClick={() => setIsMapView(false)}
        />
      </div>

      {isMapView ? <MapView /> : <MeetingView participantCount={20} />}
    </div>
  )
}

export default Meeting
