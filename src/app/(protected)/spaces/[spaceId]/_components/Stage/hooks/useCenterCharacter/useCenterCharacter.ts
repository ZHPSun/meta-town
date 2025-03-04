import { useEffect, useRef, RefObject } from 'react'
import clamp from '@/utils/clamp'
import { Coordinates } from '../../_components/Placement'

interface ElementSize {
  width: number
  height: number
}

interface ElementPosition {
  x: number
  y: number
}

export const getCenter = (viewport: HTMLElement): ElementPosition => ({
  x: Math.floor(viewport.clientWidth / 2),
  y: Math.floor(viewport.clientHeight / 2),
})

export const getPositionOffset = (
  offsetPoint: ElementPosition,
  center: ElementPosition
): ElementPosition => ({
  x: center.x - offsetPoint.x,
  y: center.y - offsetPoint.y,
})

export const getMinMaxPositionOffset = (
  offset: ElementPosition,
  stageSize: ElementSize,
  viewportSize: ElementSize
): ElementPosition => {
  const toLeftLimitation = viewportSize.width - stageSize.width
  const toRightLimitation = 0
  const toTopLimitation = viewportSize.height - stageSize.height
  const toBottomLimitation = 0

  return {
    x: clamp(offset.x, toLeftLimitation, toRightLimitation),
    y: clamp(offset.y, toTopLimitation, toBottomLimitation),
  }
}

export const transform = (
  element: HTMLElement,
  offset: ElementPosition
): void => {
  element.style.transform = `translate(${offset.x}px, ${offset.y}px)`
}

const useCenterCharacter = (
  coordinates: Coordinates
): {
  stageRef: RefObject<HTMLDivElement | null>
  characterRef: RefObject<HTMLDivElement | null>
} => {
  const stageRef = useRef<HTMLDivElement>(null)
  const characterRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!stageRef.current || !characterRef.current) return

    const stage = stageRef.current
    const character = characterRef.current
    const viewport = stage.parentElement
    if (!viewport) return

    const viewportSize: ElementSize = {
      width: viewport.clientWidth,
      height: viewport.clientHeight,
    }

    const stageSize: ElementSize = {
      width: stage.scrollWidth,
      height: stage.scrollHeight,
    }

    const characterRect = character.getBoundingClientRect()
    const stageRect = stage.getBoundingClientRect()

    const characterPosition: ElementPosition = {
      x: characterRect.left - stageRect.left,
      y: characterRect.top - stageRect.top,
    }

    const center = getCenter(viewport)
    const offset = getPositionOffset(characterPosition, center)

    const offsetWithLimit = getMinMaxPositionOffset(
      offset,
      stageSize,
      viewportSize
    )

    transform(stage, offsetWithLimit)
  }, [stageRef, characterRef, coordinates])

  return { stageRef, characterRef }
}

export default useCenterCharacter
