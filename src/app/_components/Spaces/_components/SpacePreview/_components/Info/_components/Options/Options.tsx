import { FC } from 'react'
import { EllipsisVertical } from 'lucide-react'
import Button from '@/components/Button'

const Option: FC = () => (
  <Button variant="naked">
    <EllipsisVertical aria-label="Options" />
  </Button>
)

export default Option
