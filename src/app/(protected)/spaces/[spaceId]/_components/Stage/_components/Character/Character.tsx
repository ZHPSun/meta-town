import { FC } from 'react'
import clsx from 'clsx'
import { PersonStanding } from 'lucide-react'
import { TILE_SIZE } from '../../consts'

const Character: FC = () => (
  <div
    className={clsx('flex rotate-180 items-center justify-center')}
    style={{ width: `${TILE_SIZE}px`, height: `${TILE_SIZE}px` }}
  >
    <PersonStanding aria-label="Character" />
  </div>
)

export default Character
