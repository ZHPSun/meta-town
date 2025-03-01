'use client'

import { FC, useState, FormEvent } from 'react'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import Conditions from './_components/Conditions'
import signUp from './_utils/signUp'

const Form: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    await signUp({ email, password })
  }

  return (
    <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
      <TextField
        label="Email"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField label="Password" type="password" />

      <TextField
        label="Confirm password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />

      <div className="py-2">
        <Conditions />
      </div>
      <Button className="w-full">Join Meta Town</Button>
    </form>
  )
}

export default Form
