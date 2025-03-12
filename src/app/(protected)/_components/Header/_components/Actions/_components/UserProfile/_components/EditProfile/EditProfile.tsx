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
        prefix={{ icon: 'user-pen' }}
        onClick={() => setIsEditProfileOpen(true)}
        className="w-full"
      >
        Edit Profile
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
