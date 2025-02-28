'use client'

import { FC } from 'react'
import Placement from './_components/Placement'
import { type Coordinates } from './_components/Placement'
import Character from './_components/Character'
import OtherCharacter from './_components/OtherCharacter'
import Wall from './_components/Wall'
import TiledMap from './_components/TiledMap'
import useMovement from './hooks/useMovement'
import { DIMENSIONS } from './consts'

export const INITIAL_COORDINATES: Coordinates = {
  x: 0,
  y: 0,
  direction: 'S',
} as const

export const WALLS: Coordinates[] = [
  { x: 11, y: 10, direction: 'N' },
  { x: 12, y: 11, direction: 'N' },
  { x: 12, y: 12, direction: 'N' },
  { x: 13, y: 13, direction: 'N' },
  { x: 14, y: 13, direction: 'N' },
] as const

const Stage: FC = () => {
  const characterCoordinates = useMovement(INITIAL_COORDINATES, WALLS)

  return (
    <div className="relative bg-white">
      <Placement coordinates={characterCoordinates}>
        <Character />
      </Placement>

      <Placement coordinates={{ x: 20, y: 20, direction: 'N' }}>
        <OtherCharacter />
      </Placement>

      {WALLS.map((wallCoordinates) => (
        <Placement
          key={`${wallCoordinates.x}, ${wallCoordinates.y}`}
          coordinates={wallCoordinates}
        >
          <Wall />
        </Placement>
      ))}

      <TiledMap dimensions={DIMENSIONS} />
    </div>
  )
}

export default Stage
