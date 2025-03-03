'use client'

import { FC, useState } from 'react'
import Button from '@/components/Button'
import Modal from './_components/Modal'

const CreateSpace: FC = () => {
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false)
  const onClose = (): void => setIsCreateSpaceModalOpen(false)

  return (
    <div>
      <Button
        variant="success"
        prefix={{ icon: 'circle-plus' }}
        onClick={() => setIsCreateSpaceModalOpen(true)}
      >
        Create Spaces
      </Button>
      {isCreateSpaceModalOpen && <Modal onClose={onClose} />}
    </div>
  )
}

export default CreateSpace
