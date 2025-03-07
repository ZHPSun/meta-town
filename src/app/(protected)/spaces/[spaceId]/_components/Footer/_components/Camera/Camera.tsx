import { FC } from 'react'
import VideoFeed from './_components/VideoFeed'

interface Props {
  stream: MediaStream | null
}

const Camera: FC<Props> = ({ stream }) => {
  if (!stream) {
    return null
  }

  return (
    <div className="absolute bottom-full left-1/2 mb-1 aspect-video w-[200px] -translate-x-1/2 overflow-hidden rounded-lg bg-gray-300 shadow-lg">
      <VideoFeed stream={stream} />
    </div>
  )
}

export default Camera
