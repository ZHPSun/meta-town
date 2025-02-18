import React, { FC } from 'react'
import Button from '@/app/_components/Button'
import { Grape, Calendar, Sparkles } from 'lucide-react'

const Navigation: FC = () => {
  return (
    <div className="mx-2 my-2 flex">
      <Button className="flex py-2.5" behavior="icon">
        <Grape aria-label="Meta Town" />
      </Button>
      <Button
        className="flex py-2.5"
        behavior="prefix-icon"
        icon={<Calendar />}
      >
        Events
      </Button>
      <Button
        className="flex py-2.5"
        behavior="prefix-icon"
        icon={<Sparkles />}
      >
        My Spaces
      </Button>
    </div>
  )
}

export default Navigation
