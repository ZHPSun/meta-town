'use client'

import { FC, useState } from 'react'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Form from './_components/Form'

const EditProfile: FC = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  return (
    <div>
      <Button
        variant="secondary"
        prefix={{ icon: 'circle-user-round' }}
        onClick={() => setIsEditProfileOpen(true)}
      >
        S.T.
      </Button>
      {isEditProfileOpen && (
        <Modal
          title="Edit Your Profile"
          onClose={() => setIsEditProfileOpen(false)}
        >
          <Form />
        </Modal>
      )}
    </div>
  )
}

export default EditProfile
