import Participants from './_components/Participants'
import Button from '@/components/Button'
import { MessageCircle, Grape, LogOut } from 'lucide-react'
import { FC } from 'react'

const Footer: FC = () => (
  <footer className="flex w-full justify-between bg-gray-700 p-4">
    <Button variant="primary">
      <Grape aria-label="Main menu" />
    </Button>

    <div className="flex gap-2">
      <Button variant="naked">
        <MessageCircle aria-label="Chat" />
      </Button>

      <Participants count={1} status="online" />

      <Button variant="danger">
        <LogOut aria-label="Leave space" />
      </Button>
    </div>
  </footer>
)

export default Footer
