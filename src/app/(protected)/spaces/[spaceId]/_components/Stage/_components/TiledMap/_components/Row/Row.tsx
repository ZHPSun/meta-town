import { FC } from 'react'
import Tile from './_components/Tile'

interface Props {
  y: number
  columns: number
  onEdit?: (x: number, y: number) => void
}

const Row: FC<Props> = ({ y, columns, onEdit = undefined }) => (
  <div role="row" aria-label={`${y}`} className="flex">
    {Array.from({ length: columns }).map((_, i) => (
      <Tile onEdit={onEdit} key={i} x={i} y={y} />
    ))}
  </div>
)

export default Row
