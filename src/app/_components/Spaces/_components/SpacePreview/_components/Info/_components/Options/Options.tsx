import { FC } from 'react'
import { EllipsisVertical } from 'lucide-react'
import Button from '@/components/Button'

const Option: FC = () => (
  <Button variant="naked" size="small">
    <EllipsisVertical aria-label="Options" size="18px" />
  </Button>
)

export default Option
