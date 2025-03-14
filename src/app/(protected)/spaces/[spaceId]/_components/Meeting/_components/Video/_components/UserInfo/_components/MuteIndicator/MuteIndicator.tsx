import { MicOff } from 'lucide-react'
import { FC } from 'react'

interface Props {
  isMuted?: boolean
}

const MuteIndicator: FC<Props> = ({ isMuted = false }) => {
  if (!isMuted) {
    return null
  }

  return (
    <div className="text-rose-500">
      <MicOff size={20} aria-label="Muted" />
    </div>
  )
}

export default MuteIndicator
