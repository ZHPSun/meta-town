import Button from '@/components/Button'
import { FC } from 'react'

const Actions: FC = () => (
  <div className="flex gap-4">
    <Button variant="secondary" prefix={{ icon: 'circle-user-round' }}>
      S.T.
    </Button>
    <Button variant="naked" prefix={{ icon: 'circle-help' }}>
      Resources
    </Button>
    <Button variant="secondary" prefix={{ icon: 'globe' }}>
      English
    </Button>
    <Button variant="success" prefix={{ icon: 'circle-plus' }}>
      Create Spaces
    </Button>
  </div>
)

export default Actions
