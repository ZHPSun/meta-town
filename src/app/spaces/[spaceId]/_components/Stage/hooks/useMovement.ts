import { useState, useEffect } from 'react'
import { type Direction, type Coordinates } from '../_components/Placement'
import { DIMENSIONS } from '../consts'

const MOVE_DELTAS = {
  ArrowUp: { dx: 0, dy: -1 },
  ArrowRight: { dx: 1, dy: 0 },
  ArrowDown: { dx: 0, dy: 1 },
  ArrowLeft: { dx: -1, dy: 0 },
}

const KEY_DIRECTIONS = {
  ArrowUp: 'N',
  ArrowRight: 'E',
  ArrowDown: 'S',
  ArrowLeft: 'W',
}

type ArrowKey = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft'

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

const useMovement = (initialCoordinates: Coordinates): Coordinates => {
  const [coordinates, setCoordinates] =
    useState<Coordinates>(initialCoordinates)

  const handleKeydown = (e: KeyboardEvent): void => {
    if (e.key in MOVE_DELTAS) {
      e.preventDefault()
      const { dx, dy } = MOVE_DELTAS[e.key as ArrowKey]

      setCoordinates((prev) => ({
        x: clamp(prev.x + dx, 0, DIMENSIONS.columns - 1),
        y: clamp(prev.y + dy, 0, DIMENSIONS.rows - 1),
        direction: KEY_DIRECTIONS[e.key as ArrowKey] as Direction,
      }))
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)

    return (): void => window.removeEventListener('keydown', handleKeydown)
  }, [])

  return coordinates
}

export default useMovement
