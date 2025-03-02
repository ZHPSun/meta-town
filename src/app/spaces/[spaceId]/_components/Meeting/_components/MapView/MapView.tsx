import { FC } from 'react'
import IconButton from '@/components/IconButton'
import Video from '../Video'

const MapView: FC = () => (
  <div
    className="mx-10 flex items-center justify-between"
    role="region"
    aria-label="Map View"
  >
    <IconButton variant="primary" label="Previous" icon="chevron-left" circle />
    <div className="mx-2 flex gap-2">
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
