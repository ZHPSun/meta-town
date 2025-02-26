import Button from '@/components/Button'
import ButtonConfigurable from '@/components/ButtonConfigurable'
import Logo from '@/components/Logo'
import { LogOut, MessageCircle } from 'lucide-react'
import { FC } from 'react'
import Participants from './_components/Participants'

const Footer: FC = () => (
  <footer className="flex w-full justify-between bg-gray-100 px-6 py-4">
    <div className="flex items-center gap-2">
      <div className="mr-12">
        <Logo />
      </div>
      <ButtonConfigurable variant="success" icon="video" label="Camera" />
      <ButtonConfigurable variant="success" icon="mic" label="Microphone" />
    </div>

    <div className="flex gap-2">
      <Button variant="naked">
        <MessageCircle aria-label="Chat" />
      </Button>

      <Participants count={1} status="online" />

      <div className="ml-12">
        <Button variant="danger">
          <LogOut aria-label="Leave space" />
        </Button>
      </div>
    </div>
  </footer>
)

export default Footer
