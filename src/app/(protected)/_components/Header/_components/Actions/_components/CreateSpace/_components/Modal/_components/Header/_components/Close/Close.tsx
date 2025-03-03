import { FC } from 'react'
import { X } from 'lucide-react'
import Button from '@/components/Button'

interface Props {
  onClose: () => void
}

const Close: FC<Props> = ({ onClose }) => (
  <Button variant="naked" size="small" onClick={onClose}>
    <X aria-label="Close" size="18px" />
  </Button>
)

export default Close
