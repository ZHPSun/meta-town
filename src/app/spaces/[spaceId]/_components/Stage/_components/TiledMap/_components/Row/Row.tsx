import { FC } from 'react'
import Tile from './_components/Tile'

interface Props {
  y: number
  columns: number
}

const Row: FC<Props> = ({ y, columns }) => (
  <div role="row" aria-label={`${y}`} className="flex">
    {Array.from({ length: columns }).map((_, i) => (
      <Tile key={i} x={i} y={y} />
    ))}
  </div>
)

export default Row
