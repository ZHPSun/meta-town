import { FC } from 'react'
import Overlay from './_components/Overlay'
import Header from './_components/Header'
import Form from './_components/Form'
import { createPortal } from 'react-dom'

interface Props {
  onClose: () => void
}

const Modal: FC<Props> = ({ onClose }) =>
  createPortal(
    <div className="fixed">
      <Overlay />
      <div className="fixed inset-0 flex h-full w-full items-center justify-center">
        <div className="w-96 space-y-12 rounded-lg bg-white p-8 shadow-lg">
          <Header onClose={onClose} />
          <Form />
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )

export default Modal
