'use client'

import { FC } from 'react'
import Placement, { type Coordinates } from './_components/Placement'
import Character from './_components/Character'
import TiledMap from './_components/TiledMap'
import useMovement from './hooks/useMovement'
import { DIMENSIONS } from './consts'

export const INITIAL_COORDINATES: Coordinates = { x: 0, y: 0, direction: 'S' }

const Stage: FC = () => {
  const characterCoordinates = useMovement(INITIAL_COORDINATES)

  return (
    <div className="relative">
      <Placement coordinates={characterCoordinates}>
        <Character />
      </Placement>
      <TiledMap dimensions={DIMENSIONS} />
    </div>
  )
}

export default Stage
