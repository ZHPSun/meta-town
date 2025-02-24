import { FC } from 'react'
import { TILE_SIZE as SIZE } from '../../../../../../consts'

interface Props {
  x: number
  y: number
}

const Tile: FC<Props> = ({ x, y }) => (
  <div
    role="gridcell"
    aria-label={`${x}, ${y}`}
    className="border border-gray-400"
    style={{ width: `${SIZE}px`, height: `${SIZE}px` }}
  />
)

export default Tile
