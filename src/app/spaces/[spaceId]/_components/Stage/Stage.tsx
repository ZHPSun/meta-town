'use client'

import { FC } from 'react'
import Placement from './_components/Placement'
import { type Coordinates } from './_components/Placement'
import Character from './_components/Character'
import OtherCharacter from './_components/OtherCharacter'
import TiledMap from './_components/TiledMap'
import useMovement from './hooks/useMovement'
import { DIMENSIONS } from './consts'

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
