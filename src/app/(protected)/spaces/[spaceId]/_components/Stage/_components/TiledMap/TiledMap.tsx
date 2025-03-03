import { FC } from 'react'
import clsx from 'clsx'
import Row from './_components/Row'

interface Props {
  dimensions: {
    rows: number
    columns: number
  }
}

const TiledMap: FC<Props> = ({ dimensions }) => (
  <div
    role="grid"
    aria-label="Tiled Map"
    className={clsx('w-max border border-gray-400')}
  >
    {Array.from({ length: dimensions.rows }).map((_, i) => (
      <Row key={i} y={i} columns={dimensions.columns} />
    ))}
  </div>
)

export default TiledMap
