import { FC } from 'react'
import VideoFeed from './_components/VideoFeed'

interface Props {
  stream: MediaStream | null
}

const Camera: FC<Props> = ({ stream }) => (
  <div className="h-12 w-16 overflow-hidden rounded-lg bg-gray-300">
    {stream && <VideoFeed stream={stream} />}
  </div>
)

export default Camera
