import { MicOff } from 'lucide-react'
import { FC } from 'react'

interface Props {
  isMuted?: boolean
}

const MuteIndicator: FC<Props> = ({ isMuted }) => {
  if (!isMuted) {
    return null
  }

  return (
    <div className="w-10 px-2 text-rose-500">
      <MicOff aria-label="Muted" />
    </div>
  )
}

export default MuteIndicator
