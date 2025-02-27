'use client'

import { FC } from 'react'
import Character from './_components/Character'
import OtherCharacter from './_components/OtherCharacter'
import Placement, { type Coordinates } from './_components/Placement'
import TiledMap from './_components/TiledMap'
import { DIMENSIONS } from './consts'
import useMovement from './hooks/useMovement'

export const INITIAL_COORDINATES: Coordinates = {
  x: 0,
  y: 0,
  direction: 'S',
} as const

const Stage: FC = () => {
  const characterCoordinates = useMovement(INITIAL_COORDINATES)

  return (
    <div className="relative bg-white">
      <Placement coordinates={characterCoordinates}>
        <Character />
      </Placement>
      <Placement coordinates={{ x: 20, y: 20, direction: 'N' }}>
        <OtherCharacter />
      </Placement>
      <TiledMap dimensions={DIMENSIONS} />
    </div>
  )
}

export default Stage
