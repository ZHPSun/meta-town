'use client'

import { FC, useState } from 'react'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import ProfileFormModal from '@/app/(protected)/_components/ProfileFormModal'
import VerticalList from '@/components/VerticalList'
import useSession from '@/hooks/useSession'
import useSessionUser from '@/hooks/useSessionUser'
import SignOut from './_components/SignOut'

const UserProfile: FC = () => {
  const { data: user } = useSessionUser()
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
        <ProfileFormModal
          title="Edit Your Profile"
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  )
}

export default UserProfile
