import { FC } from 'react'
import { TILE_SIZE as SIZE } from '../../../../../../consts'

interface Props {
  x: number
  y: number
  onMouseOver?: (x: number, y: number) => void
}

const Tile: FC<Props> = ({ x, y, onMouseOver = undefined }) => (
  <div
    role="gridcell"
    onMouseOver={() => onMouseOver?.(x, y)}
    aria-label={`${x}, ${y}`}
    className="border border-gray-400"
    style={{ width: `${SIZE}px`, height: `${SIZE}px` }}
  />
)

export default Tile
