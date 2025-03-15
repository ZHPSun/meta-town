import { FC } from 'react'
import Tile from './_components/Tile'

interface Props {
  y: number
  columns: number
  onMouseOver?: (x: number, y: number) => void
}

const Row: FC<Props> = ({ y, columns, onMouseOver = undefined }) => (
  <div role="row" aria-label={`${y}`} className="flex">
    {Array.from({ length: columns }).map((_, i) => (
      <Tile onMouseOver={onMouseOver} key={i} x={i} y={y} />
    ))}
  </div>
)

export default Row
