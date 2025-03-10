import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Overlay from './_components/Overlay'
import Header from './_components/Header'

interface Props {
  onClose: () => void
  children: ReactNode
  title: string
}

const Modal: FC<Props> = ({ onClose, children, title }) =>
  createPortal(
    <div>
      <Overlay />
      <div className="fixed inset-0 flex h-full w-full items-center justify-center">
        <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
          <Header onClose={onClose}>{title}</Header>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )

export default Modal
