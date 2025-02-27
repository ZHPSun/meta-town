import { FC } from 'react'
import { PersonStanding } from 'lucide-react'
import { TILE_SIZE } from '../../consts'

const OtherCharacter: FC = () => (
  <div>
    <PersonStanding size={TILE_SIZE} aria-label="OtherCharacter" />
  </div>
)

export default OtherCharacter
