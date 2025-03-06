'use client'

import { FC } from 'react'
import ButtonConfigurable from '@/components/ButtonConfigurable'
import IconButton from '@/components/IconButton'
import Logo from '@/components/Logo'
import Camera from './_components/Camera'
import Participants from './_components/Participants'
import useMedia from './hooks/useMedia'

const Footer: FC = () => {
  const { mediaStream: cameraStream, toggleMediaStream: toggleCameraStream } =
    useMedia({ camera: true })

  const { mediaStream: micStream, toggleMediaStream: toggleMicStream } =
    useMedia({ mic: true })

  return (
    <footer className="flex w-full justify-between bg-gray-100 px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="mr-12">
          <Logo />
        </div>

        <Camera stream={cameraStream} />

        <ButtonConfigurable
          tooltip={{ position: 'top' }}
          variant={cameraStream ? 'success' : 'danger'}
          icon="video"
          label="Camera"
          onClick={toggleCameraStream}
        />
        <ButtonConfigurable
          tooltip={{ position: 'top' }}
          variant={micStream ? 'success' : 'danger'}
          icon="mic"
          label="Microphone"
          onClick={toggleMicStream}
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
}

export default Footer
