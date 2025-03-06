import { useState, useEffect, useRef } from 'react'

interface cameraOptions {
  camera: MediaTrackConstraints | true
  mic?: never
}

interface micOptions {
  mic: MediaTrackConstraints | true
  camera?: never
}

const isCameraOptions = (
  options: cameraOptions | micOptions
): options is cameraOptions => 'camera' in options

const isMicOptions = (
  options: cameraOptions | micOptions
): options is micOptions => 'mic' in options

const useMedia = (
  options: cameraOptions | micOptions
): { mediaStream: MediaStream | null; toggleMediaStream: () => void } => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  const constraints: MediaStreamConstraints = {}
  if (isCameraOptions(options)) {
    constraints.video = options.camera
  }
  if (isMicOptions(options)) {
    constraints.audio = options.mic
  }

  const requestMediaStream = (): void => {
    window.navigator.mediaDevices
      .getUserMedia(constraints)
      .then(setMediaStream)
      .catch(() => setMediaStream(null))
  }

  const toggleMediaStream = (): void => {
    if (!mediaStream) {
      requestMediaStream()
    } else {
      mediaStream.getTracks().forEach((track) => track.stop())
      setMediaStream(null)
    }
  }

  const mediaStreamRef = useRef<MediaStream | null>(null)
  useEffect(() => {
    mediaStreamRef.current = mediaStream
  }, [mediaStream])

  useEffect(
    () => (): void => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop())
        setMediaStream(null)
      }
    },
    []
  )

  return { mediaStream, toggleMediaStream }
}

export default useMedia
