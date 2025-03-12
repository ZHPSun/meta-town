'use client'

import { FC } from 'react'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import Dropdown from '@/components/Dropdown'
import VerticalList from '@/components/VerticalList'
import useUser from '@/hooks/useUser'
import useSession from '@/hooks/useSession'
import EditProfile from './_components/EditProfile'

const UserProfile: FC = () => {
  const { data: user } = useUser()
  const { data: session } = useSession()

  if (!session) {
    return
  }

  const displayName = user?.displayName ?? session.user.email

  return (
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
          <EditProfile />
        </VerticalList.Item>
        <VerticalList.Item placement="right">
          <IconButton icon="log-out" label="logout" variant="danger" />
        </VerticalList.Item>
      </VerticalList>
    </Dropdown>
  )
}

export default UserProfile
