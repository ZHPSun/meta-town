import { useEffect, useRef, RefObject } from 'react'
import clamp from '@/utils/clamp'
import { Coordinates } from '../../_components/Placement'

interface ElementSize {
  width: number
  height: number
}

interface ElementPosition {
  left: number
  top: number
}

export const getCenter = (viewport: HTMLElement): ElementPosition => ({
  left: Math.floor(viewport.clientWidth / 2),
  top: Math.floor(viewport.clientHeight / 2),
})

export const getPositionOffset = (
  characterPosition: ElementPosition,
  center: ElementPosition
): ElementPosition => ({
  left: center.left - characterPosition.left,
  top: center.top - characterPosition.top,
})

export const getMinMaxPositionOffset = (
  offset: ElementPosition,
  zoom: number,
  stageSize: ElementSize,
  viewportSize: ElementSize
): ElementPosition => {
  const toLeftLimitation = viewportSize.width - stageSize.width * zoom
  const toRightLimitation = 0
  const toTopLimitation = viewportSize.height - stageSize.height * zoom
  const toBottomLimitation = 0

  return {
    left: clamp(offset.left, toLeftLimitation, toRightLimitation),
    top: clamp(offset.top, toTopLimitation, toBottomLimitation),
  }
}

export const transform = (
  element: HTMLElement,
  offset: ElementPosition,
  zoom: number
): void => {
  element.style.setProperty('--translate-x', `${offset.left}px`)
  element.style.setProperty('--translate-y', `${offset.top}px`)
  element.style.setProperty('--scale', `${zoom}`)
}

const useCenterCharacter = (
  coordinates: Coordinates,
  zoom: number
): {
  stageRef: RefObject<HTMLDivElement | null>
  characterRef: RefObject<HTMLDivElement | null>
} => {
  const stageRef = useRef<HTMLDivElement>(null)
  const characterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!stageRef.current || !characterRef.current) {
      return
    }

    const stage = stageRef.current
    const character = characterRef.current
    const viewport = stage.parentElement
    if (!viewport) {
      return
    }

    const viewportSize: ElementSize = {
      width: viewport.clientWidth,
      height: viewport.clientHeight,
    }

    const stageSize: ElementSize = {
      width: stage.scrollWidth,
      height: stage.scrollHeight,
    }

    const characterPosition: ElementPosition = {
      left: character.offsetLeft * zoom,
      top: character.offsetTop * zoom,
    }

    const center = getCenter(viewport)

    const offset = getPositionOffset(characterPosition, center)

    const offsetWithLimit = getMinMaxPositionOffset(
      offset,
      zoom,
      stageSize,
      viewportSize
    )

    transform(stage, offsetWithLimit, zoom)
  }, [coordinates, zoom])

  return { stageRef, characterRef }
}

export default useCenterCharacter
