import { FC, ReactNode } from 'react'
import Close from './_components/Close'

interface Props {
  onClose: () => void
  children: ReactNode
}

const Header: FC<Props> = ({ onClose, children }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">{children}</h2>
    <Close onClose={onClose} />
  </div>
)

export default Header
