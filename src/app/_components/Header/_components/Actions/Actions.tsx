'use client'
import Button from '@/components/Button'
import { FC } from 'react'
import CreateSpace from './_components/CreateSpace'

const Actions: FC = () => (
  <div className="flex gap-4">
    <Button variant="secondary" prefix={{ icon: 'circle-user-round' }}>
      S.T.
    </Button>
    <Button variant="naked" prefix={{ icon: 'circle-help' }}>
      Resources
    </Button>
    <Button variant="secondary" prefix={{ icon: 'globe' }}>
      English
    </Button>
    <CreateSpace />
  </div>
)

export default Actions
