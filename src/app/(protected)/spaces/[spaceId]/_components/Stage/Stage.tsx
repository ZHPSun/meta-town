'use client'

import { useParams } from 'next/navigation'
import { FC, Fragment } from 'react'
import IconButton from '@/components/IconButton'
import useOnlineUsers from '@/hooks/useOnlineUsers'
import useSpace from '@/hooks/useSpace'
import useUser from '@/hooks/useUser'
import Character from './_components/Character'
import Configuration from './_components/Configuration'
import OtherCharacter from './_components/OtherCharacter'
import Placement, { type Coordinates } from './_components/Placement'
import TiledMap from './_components/TiledMap'
import Wall from './_components/Wall'
import useCenterCharacter from './_hooks/useCenterCharacter'
import useConfig from './_hooks/useConfig'
import useMovement from './_hooks/useMovement'
import useUpdateSpacePosition from './_hooks/useUpdateSpacePosition'
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

const USER_SPACE_POSITIONS: Coordinates[] = [
  { x: 6, y: 6, direction: 'N' },
  { x: 6, y: 7, direction: 'E' },
  { x: 9, y: 9, direction: 'S' },
  { x: 12, y: 10, direction: 'W' },
] as const

interface Props {
  isConfigurationOpen?: boolean
  onConfigurationClose: () => void
}

const Stage: FC<Props> = ({
  onConfigurationClose,
  isConfigurationOpen = false,
}) => {
  const {
    config,
    data,
    coordinatesConfig,
    handleCoordinates,
    handleEdit,
    handleConfig,
  } = useConfig({
    walls: WALLS,
  })

  const characterCoordinates = useMovement(INITIAL_COORDINATES, [...data.walls])
  const { zoom, zoomIn, zoomOut } = useZoom()

  const { stageRef, characterRef } = useCenterCharacter(
    characterCoordinates,
    zoom
  )

  useUpdateSpacePosition(characterCoordinates)

  const { data: user } = useUser()

  const { spaceId } = useParams<{ spaceId: string }>()
  const { data: space } = useSpace(spaceId)

  const { data: onlineUsers } = useOnlineUsers(space?.id)

  const { walls } = data

  if (!user) {
    return null
  }

  return (
    <Fragment>
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

            {onlineUsers?.map(
              (onlineUser, index) =>
                USER_SPACE_POSITIONS[index] && (
                  <Placement
                    key={onlineUser.id}
                    coordinates={USER_SPACE_POSITIONS[index]}
                  >
                    <OtherCharacter />
                  </Placement>
                )
            )}

            {walls.map((wallCoordinates) => (
              <Placement
                key={`${wallCoordinates.x}, ${wallCoordinates.y}`}
                coordinates={wallCoordinates}
              >
                <Wall />
              </Placement>
            ))}

            {coordinatesConfig && (
              <Placement
                coordinates={{
                  x: coordinatesConfig.x,
                  y: coordinatesConfig.y,
                  direction: 'N',
                }}
              >
                <button
                  onClick={() =>
                    handleEdit(coordinatesConfig.x, coordinatesConfig.y)
                  }
                  className="opacity-25"
                >
                  {{ walls: <Wall /> }[coordinatesConfig.config]}
                </button>
              </Placement>
            )}

            <TiledMap onMouseOver={handleCoordinates} dimensions={DIMENSIONS} />
          </div>
        </div>
        <div className="absolute bottom-8 right-4 space-x-2 text-white">
          <IconButton
            icon="zoom-out"
            label="Zoom Out"
            tooltip={{ position: 'top' }}
            onClick={zoomOut}
            size="small"
          />
          <IconButton
            icon="zoom-in"
            label="Zoom In"
            tooltip={{ position: 'top' }}
            onClick={zoomIn}
            size="small"
          />
        </div>
      </div>
      {isConfigurationOpen && (
        <Configuration
          config={config}
          onConfig={handleConfig}
          onClose={() => {
            handleConfig(null)
            onConfigurationClose()
          }}
        />
      )}
    </Fragment>
  )
}

export default Stage
