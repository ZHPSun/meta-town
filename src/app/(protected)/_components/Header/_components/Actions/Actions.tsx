'use client'

import { FC } from 'react'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import VerticalList from '@/components/VerticalList'
import CreateSpace from './_components/CreateSpace'
import UserProfile from './_components/UserProfile'

const Actions: FC = () => (
  <div className="flex gap-4">
    <UserProfile />

    <Button variant="naked" prefix={{ icon: 'circle-help' }}>
      Resources
    </Button>

    <Dropdown
      trigger={(toggle, isOpen) => (
        <Button
          prefix={{ icon: 'globe', label: 'Language' }}
          suffix={{ icon: 'chevron-down', label: 'Select language' }}
          onClick={toggle}
          variant={isOpen ? 'secondary' : 'primary'}
        >
          English
        </Button>
      )}
    >
      <VerticalList>
        <VerticalList.Item>
          <Button variant="secondary">English</Button>
        </VerticalList.Item>
        <VerticalList.Divider />
        <VerticalList.Item>
          <Button variant="secondary">Chinese</Button>
        </VerticalList.Item>
        <VerticalList.Divider />
        <VerticalList.Item>
          <Button variant="secondary">日本語</Button>
        </VerticalList.Item>
      </VerticalList>
    </Dropdown>

    <CreateSpace />
  </div>
)

export default Actions
