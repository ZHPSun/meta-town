import { FC } from 'react'
import Modal from '@/components/Modal'
import Form from './_components/Form'

interface Props {
  title: string
  onClose?: () => void
}

const ProfileFormModal: FC<Props> = ({ title, onClose = undefined }) => (
  <Modal title={title} onClose={onClose}>
    <Form onCreated={onClose} />
  </Modal>
)

export default ProfileFormModal
