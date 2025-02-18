import React, { FC } from 'react'
import Button from '@/app/_components/Button'
import { Globe, CircleHelp, CircleUserRound, CirclePlus } from 'lucide-react'

const Actions: FC = () => {
  return (
    <div className="mx-2 my-2 flex gap-2">
      <Button
        className="flex py-2.5"
        behavior="prefix-icon"
        icon={<CircleUserRound />}
      >
        S.T.
      </Button>
      <Button
        className="flex py-2.5"
        behavior="prefix-icon"
        icon={<CircleHelp />}
      >
        Resources
      </Button>
      <Button className="flex py-2.5" behavior="prefix-icon" icon={<Globe />}>
        English
      </Button>
      <Button
        className="flex py-2.5"
        behavior="prefix-icon"
        icon={<CirclePlus />}
      >
        Create Spaces
      </Button>
    </div>
  )
}

export default Actions
