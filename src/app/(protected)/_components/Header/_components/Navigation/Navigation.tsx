import { FC } from 'react'
import Button from '@/components/Button'
import Logo from '@/components/Logo'

const Navigation: FC = () => (
  <div className="flex gap-4">
    <div className="pr-12">
      <Logo />
    </div>
    <Button variant="secondary" prefix={{ icon: 'calendar' }}>
      Events
    </Button>
    <Button prefix={{ icon: 'sparkles' }}>My Spaces</Button>
  </div>
)

export default Navigation
