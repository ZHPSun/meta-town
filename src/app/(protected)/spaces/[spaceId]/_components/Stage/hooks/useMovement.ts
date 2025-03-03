import { useState, useEffect, useRef } from 'react'
import { type Coordinates } from '../_components/Placement'
import { DIMENSIONS } from '../consts'

const MOVE_DELTAS = {
  ArrowUp: { dx: 0, dy: -1 },
  ArrowRight: { dx: 1, dy: 0 },
  ArrowDown: { dx: 0, dy: 1 },
  ArrowLeft: { dx: -1, dy: 0 },
} as const

const KEY_DIRECTIONS = {
  ArrowUp: 'N',
  ArrowRight: 'E',
  ArrowDown: 'S',
  ArrowLeft: 'W',
} as const

type ArrowKey = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft'

const isArrowKey = (key: string): key is ArrowKey =>
  key === 'ArrowUp' ||
  key === 'ArrowRight' ||
  key === 'ArrowDown' ||
  key === 'ArrowLeft'

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

const isBlocked = (coordinates: Coordinates, blocks: Coordinates[]): boolean =>
  blocks.some(
    (blockCoordinates) =>
      blockCoordinates.x === coordinates.x &&
      blockCoordinates.y === coordinates.y
  )

const useMovement = (
  initialCoordinates: Coordinates,
  blocks: Coordinates[] = []
): Coordinates => {
  const [coordinates, setCoordinates] =
    useState<Coordinates>(initialCoordinates)

  const blocksRef = useRef(blocks)
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
      const key = event.key
      if (!isArrowKey(key)) {
        return
      }

      event.preventDefault()

      setCoordinates((prev) => {
        const { dx, dy } = MOVE_DELTAS[key]
        const newDirection = KEY_DIRECTIONS[key]

        const newCoordinates = {
          x: clamp(prev.x + dx, 0, DIMENSIONS.columns - 1),
          y: clamp(prev.y + dy, 0, DIMENSIONS.rows - 1),
          direction: newDirection,
        }

        if (!isBlocked(newCoordinates, blocksRef.current)) {
          return newCoordinates
        }

        return {
          ...prev,
          direction: newDirection,
        }
      })
    }

    window.addEventListener('keydown', handleKeydown)

    return (): void => window.removeEventListener('keydown', handleKeydown)
  }, [])

  return coordinates
}

export default useMovement
