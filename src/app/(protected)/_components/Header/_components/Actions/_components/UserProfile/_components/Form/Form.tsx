import React, { FC } from 'react'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import AvatarPicker from './_components/AvatarPicker'

const Form: FC = () => (
  <div className="space-y-10">
    <TextField label="Display your name" />

    <AvatarPicker />

    <Button className="w-full">Save Changes</Button>
  </div>
)

export default Form
