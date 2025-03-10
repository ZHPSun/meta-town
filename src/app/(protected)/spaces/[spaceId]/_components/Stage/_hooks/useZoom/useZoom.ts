import { useState } from 'react'
import clamp from '@/utils/clamp'

const clampZoom = (zoom: number): number => clamp(zoom, 0.5, 1.5)

const useZoom = (): {
  zoom: number
  zoomIn: () => void
  zoomOut: () => void
} => {
  const [zoom, setZoom] = useState(1)

  return {
    zoom,
    zoomIn: (): void =>
      setZoom((previousZoom) => clampZoom(previousZoom + 0.1)),
    zoomOut: (): void =>
      setZoom((previousZoom) => clampZoom(previousZoom - 0.1)),
  }
}

export default useZoom
