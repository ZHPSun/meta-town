import Button from '@/components/Button'
import { Grape } from 'lucide-react'
import { FC } from 'react'

const Navigation: FC = () => (
  <div className="mx-2 my-2 flex">
    <Button>
      <Grape aria-label="Meta Town" />
    </Button>
    <Button prefix={{ icon: 'calendar' }}>Events</Button>
    <Button prefix={{ icon: 'sparkles' }}>My Spaces</Button>
  </div>
)

export default Navigation
