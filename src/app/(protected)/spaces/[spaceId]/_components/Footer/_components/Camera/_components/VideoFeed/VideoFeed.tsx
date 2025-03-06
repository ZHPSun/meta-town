import { FC, useEffect, useRef } from 'react'

interface Props {
  stream: MediaStream
}

const VideoFeed: FC<Props> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return <video aria-label="Video Feed" ref={videoRef} autoPlay />
}

export default VideoFeed
