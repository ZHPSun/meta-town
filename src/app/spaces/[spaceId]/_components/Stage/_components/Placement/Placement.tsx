import { ReactNode, FC } from 'react'
import { TILE_SIZE } from '../../consts'

const FACE_ROTATION = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
}

interface Props {
  coordinates: {
    x: number
    y: number
    direction: 'N' | 'E' | 'S' | 'W'
  }
  children: ReactNode
}

const Placement: FC<Props> = ({ coordinates, children }) => (
  <div
    data-testid="placement"
    className="absolute"
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
