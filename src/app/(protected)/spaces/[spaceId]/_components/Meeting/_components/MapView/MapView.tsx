import { FC } from 'react'
import IconButton from '@/components/IconButton'
import Video from '../Video'

const MapView: FC = () => (
  <div
    className="flex items-center space-x-8"
    role="region"
    aria-label="Map View"
  >
    <IconButton variant="primary" label="Previous" icon="chevron-left" circle />
    <div className="flex flex-1 gap-4">
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
    </div>
    <IconButton variant="primary" label="Next" icon="chevron-right" circle />
  </div>
)

export default MapView
