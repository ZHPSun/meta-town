import { FC } from 'react'
import ButtonConfigurable from '@/components/ButtonConfigurable'
import IconButton from '@/components/IconButton'
import Logo from '@/components/Logo'
import Participants from './_components/Participants'

const Footer: FC = () => (
  <footer className="flex w-full justify-between bg-gray-100 px-6 py-4">
    <div className="flex items-center gap-2">
      <div className="mr-12">
        <Logo />
      </div>
      <ButtonConfigurable
        tooltip={{ position: 'top' }}
        variant="success"
        icon="video"
        label="Camera"
      />
      <ButtonConfigurable
        tooltip={{ position: 'top' }}
        variant="success"
        icon="mic"
        label="Microphone"
      />
    </div>

    <div className="flex gap-2">
      <IconButton
        tooltip={{ position: 'top' }}
        variant="naked"
        icon="message-circle"
        label="Chat"
      />

      <Participants count={1} status="online" />

      <div className="ml-12">
        <IconButton
          tooltip={{ position: 'top-right' }}
          variant="danger"
          icon="log-out"
          label="Leave space"
        />
      </div>
    </div>
  </footer>
)

export default Footer
