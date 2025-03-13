'use client'

import { FC, useState } from 'react'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Form from './_components/Form'

const CreateSpace: FC = () => {
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false)

  return (
    <div>
      <Button
        variant="success"
        prefix={{ icon: 'circle-plus' }}
        onClick={() => setIsCreateSpaceModalOpen(true)}
      >
        Create Spaces
      </Button>
      {isCreateSpaceModalOpen && (
        <Modal
          title="Create a new space"
          onClose={() => setIsCreateSpaceModalOpen(false)}
        >
          <Form onCreated={() => setIsCreateSpaceModalOpen(false)} />
        </Modal>
      )}
    </div>
  )
}

export default CreateSpace
