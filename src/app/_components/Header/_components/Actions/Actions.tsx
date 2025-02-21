import Button from '@/components/Button'
import { FC } from 'react'

const Actions: FC = () => (
  <div className="mx-2 my-2 flex gap-2">
    <Button prefix={{ icon: 'circle-user-round' }}>S.T.</Button>
    <Button prefix={{ icon: 'circle-help' }}>Resources</Button>
    <Button prefix={{ icon: 'globe' }}>English</Button>
    <Button prefix={{ icon: 'circle-plus' }}>Create Spaces</Button>
  </div>
)

export default Actions
