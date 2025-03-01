'use client'

import { FC, useState, FormEvent } from 'react'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import login from './_utils/login'

const Form: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    await login({ email, password })
  }

  return (
    <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
      <TextField
        label="Email"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button className="w-full">Login</Button>
    </form>
  )
}

export default Form
