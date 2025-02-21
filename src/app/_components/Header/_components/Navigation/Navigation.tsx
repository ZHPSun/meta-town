import Button from '@/components/Button'
import { Grape } from 'lucide-react'
import { FC } from 'react'

const Navigation: FC = () => (
  <div className="flex gap-4">
    <Button variant="naked">
      <Grape aria-label="Meta Town" />
    </Button>
    <Button variant="secondary" prefix={{ icon: 'calendar' }}>
      Events
    </Button>
    <Button prefix={{ icon: 'sparkles' }}>My Spaces</Button>
  </div>
)

export default Navigation
