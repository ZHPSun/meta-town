import { ReactNode, FC, Ref } from 'react'
import { TILE_SIZE } from '../../consts'

const FACE_ROTATION = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
}

type Direction = 'N' | 'E' | 'S' | 'W'

export interface Coordinates {
  x: number
  y: number
  direction: Direction
}

interface Props {
  coordinates: Coordinates
  children: ReactNode
  ref?: Ref<HTMLDivElement>
}

const Placement: FC<Props> = ({ coordinates, children, ref = null }) => (
  <div
    aria-label={`Placement: ${coordinates.x}, ${coordinates.y}`}
    className="absolute"
    ref={ref}
    style={{
      width: `${TILE_SIZE}px`,
      height: `${TILE_SIZE}px`,
      top: `${TILE_SIZE * coordinates.y}px`,
      left: `${TILE_SIZE * coordinates.x}px`,
      transform: `rotate(${FACE_ROTATION[coordinates.direction]}deg)`,
    }}
  >
    {children}
  </div>
)

export default Placement
