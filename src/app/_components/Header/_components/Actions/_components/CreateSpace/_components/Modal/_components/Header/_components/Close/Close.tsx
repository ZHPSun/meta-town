import { FC } from 'react'
import Button from '@/components/Button'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
}

const Close: FC<Props> = ({ onClose }) => (
  <Button variant="naked" size="small" onClick={onClose}>
    <X aria-label="Close" size="18px" />
  </Button>
)

export default Close
