import Button from '@/components/Button'
import Logo from '@/components/Logo'
import { FC } from 'react'

const Navigation: FC = () => (
  <div className="flex gap-4">
    <Logo />
    <Button variant="secondary" prefix={{ icon: 'calendar' }}>
      Events
    </Button>
    <Button prefix={{ icon: 'sparkles' }}>My Spaces</Button>
  </div>
)

export default Navigation
