import { FC } from 'react'
import { TILE_SIZE as SIZE } from '../../../../../../consts'

interface Props {
  x: number
  y: number
  onEdit?: (x: number, y: number) => void
}

const Tile: FC<Props> = ({ x, y, onEdit = undefined }) => {
  if (onEdit) {
    return (
      <button
        aria-label={`${x}, ${y}`}
        className="border border-gray-400 hover:bg-gray-200"
        style={{ width: `${SIZE}px`, height: `${SIZE}px` }}
        onClick={() => onEdit(x, y)}
      />
    )
  }

  return (
    <div
      role="gridcell"
      aria-label={`${x}, ${y}`}
      className="border border-gray-400"
      style={{ width: `${SIZE}px`, height: `${SIZE}px` }}
    />
  )
}

export default Tile
