import { FC } from 'react'
import Close from './_components/Close'

interface Props {
  onClose: () => void
}

const Header: FC<Props> = ({ onClose }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Create a new space</h2>
    <Close onClose={onClose} />
  </div>
)

export default Header
