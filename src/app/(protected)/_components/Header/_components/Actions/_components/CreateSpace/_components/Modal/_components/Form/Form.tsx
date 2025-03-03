import React, { FC, useId } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'

const Form: FC = () => {
  const spaceNameId = useId()

  return (
    <div className="space-y-4">
      <div>
        <label className="pb-1 text-sm" htmlFor={spaceNameId}>
          Space Name:
        </label>
        <Input placeholder="Enter the name of the space" id={spaceNameId} />
      </div>

      <Button className="w-full">Create</Button>
    </div>
  )
}

export default Form
