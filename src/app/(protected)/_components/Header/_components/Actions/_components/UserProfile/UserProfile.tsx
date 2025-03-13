'use client'

import { FC, useState } from 'react'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Modal from '@/components/Modal'
import VerticalList from '@/components/VerticalList'
import useSession from '@/hooks/useSession'
import useUser from '@/hooks/useUser'
import Form from './_components/Form'
import SignOut from './_components/SignOut'

const UserProfile: FC = () => {
  const { data: user } = useUser()
  const { data: session } = useSession()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  if (!session) {
    return
  }

  const displayName = user?.displayName ?? session.user.email

  return (
    <div>
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button
            prefix={{ icon: 'circle-user-round', label: 'avatar' }}
            onClick={toggle}
            variant={isOpen ? 'secondary' : 'naked'}
            aria-label={displayName}
          >
            {displayName}
          </Button>
        )}
      >
        <VerticalList>
          <VerticalList.Item>
            <Button
              variant="secondary"
              prefix={{ icon: 'user-pen' }}
              onClick={() => setIsEditModalOpen(true)}
              className="w-full"
            >
              Edit Profile
            </Button>
          </VerticalList.Item>
          <VerticalList.Item placement="right">
            <SignOut />
          </VerticalList.Item>
        </VerticalList>
      </Dropdown>
      {isEditModalOpen && (
        <Modal
          title="Edit Your Profile"
          onClose={() => setIsEditModalOpen(false)}
        >
          <Form />
        </Modal>
      )}
    </div>
  )
}

export default UserProfile
