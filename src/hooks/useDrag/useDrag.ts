import { RefObject, useEffect, useRef } from 'react'

const useDrag = (): {
  handleRef: RefObject<HTMLDivElement | null>
} => {
  const handleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isDragging = false
    let offset = { x: 0, y: 0 }

    const handleMouseDown = (event: MouseEvent): void => {
      if (
        !handleRef.current ||
        !(event.target instanceof HTMLElement) ||
        !handleRef.current.contains(event.target)
      ) {
        return
      }

      const dragHandle = handleRef.current

      isDragging = true

      const rect = dragHandle.getBoundingClientRect()

      offset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }

      event.preventDefault()
    }

    const handleMouseMove = (event: MouseEvent): void => {
      if (!handleRef.current || !isDragging) {
        return
      }

      const dragHandle = handleRef.current

      dragHandle.style.position = 'fixed'
      dragHandle.style.left = `${event.clientX - offset.x}px`
      dragHandle.style.top = `${event.clientY - offset.y}px`
    }

    const handleMouseUp = (): void => {
      isDragging = false
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return (): void => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return { handleRef }
}

export default useDrag
