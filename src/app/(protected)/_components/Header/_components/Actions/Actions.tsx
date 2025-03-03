'use client'

import { FC } from 'react'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
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
      position="bottom-left"
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
      <div className="w-[300px] space-y-4 rounded border border-neutral-300 bg-white px-2 py-4">
        <div className="space-y-2">
          <Button variant="naked" className="w-full">
            English
          </Button>
        </div>
        <div className="space-y-2">
          <Button variant="naked" className="w-full">
            Chinese
          </Button>
        </div>
        <div className="space-y-2">
          <Button variant="naked" className="w-full">
            日本語
          </Button>
        </div>
      </div>
    </Dropdown>

    <CreateSpace />
  </div>
)

export default Actions
