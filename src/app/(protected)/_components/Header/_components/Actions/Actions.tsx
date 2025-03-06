'use client'

import { FC } from 'react'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import VerticalList from '@/components/VerticalList'
import ListItem from '@/components/ListItem'
import ListDivider from '@/components/ListDivider'
import CreateSpace from './_components/CreateSpace'

const Actions: FC = () => (
  <div className="flex gap-4">
    <Button variant="secondary" prefix={{ icon: 'circle-user-round' }}>
      S.T.
    </Button>
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
      <div>
        <VerticalList>
          <ListItem>
            <Button variant="naked">English</Button>
          </ListItem>
          <ListDivider />
          <ListItem>
            <Button variant="naked">Chinese</Button>
          </ListItem>
          <ListDivider />
          <ListItem>
            <Button variant="naked">日本語</Button>
          </ListItem>
        </VerticalList>
      </div>
    </Dropdown>

    <CreateSpace />
  </div>
)

export default Actions
