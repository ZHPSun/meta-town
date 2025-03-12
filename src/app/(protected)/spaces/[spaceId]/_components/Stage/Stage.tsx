'use client'

import { FC } from 'react'
import IconButton from '@/components/IconButton'
import useUser from '@/hooks/useUser'
import Character from './_components/Character'
import OtherCharacter from './_components/OtherCharacter'
import Placement, { type Coordinates } from './_components/Placement'
import TiledMap from './_components/TiledMap'
import Wall from './_components/Wall'
import useCenterCharacter from './_hooks/useCenterCharacter'
import useMovement from './_hooks/useMovement'
import useZoom from './_hooks/useZoom'
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
  const characterCoordinates = useMovement(INITIAL_COORDINATES, [...WALLS])

  const { zoom, zoomIn, zoomOut } = useZoom()

  const { stageRef, characterRef } = useCenterCharacter(
    characterCoordinates,
    zoom
  )

  const { data: user } = useUser()

  if (!user) {
    return null
  }

  return (
    <div className="relative flex size-full items-center justify-center bg-neutral-500">
      <div
        className="max-h-full max-w-full overflow-hidden"
        aria-label="viewport"
      >
        <div
          ref={stageRef}
          aria-label="stage"
          className="relative"
          style={{
            transformOrigin: 'top left',
            transition: 'transform 0.2s',
            transform:
              'translate(var(--translate-x), var(--translate-y)) scale(var(--scale))',
          }}
        >
          <Placement coordinates={characterCoordinates} ref={characterRef}>
            <Character avatar={user.avatar} />
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
      </div>
      <div className="absolute bottom-4 right-4 space-x-2 text-white">
        <IconButton
          icon="zoom-out"
          label="Zoom Out"
          tooltip={{ position: 'top' }}
          onClick={zoomOut}
        />
        <IconButton
          icon="zoom-in"
          label="Zoom In"
          tooltip={{ position: 'top' }}
          onClick={zoomIn}
        />
      </div>
    </div>
  )
}

export default Stage
