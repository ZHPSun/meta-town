import { FC } from 'react'
import IconButton from '@/components/IconButton'

interface Props {
  name: string
  time: string
}

const Info: FC<Props> = ({ name, time }) => (
  <div className="flex items-center justify-between pt-1">
    <span className="text">{name}</span>
    <div className="flex items-center gap-4">
      <span className="text-sm text-neutral-500">{time}</span>
      <IconButton
        size="small"
        variant="naked"
        icon="more-vertical"
        label="Options"
      />
    </div>
  </div>
)

export default Info
