'use client'

import { FC, useState, FormEvent } from 'react'
import Input from '@/components/Input'
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
      <div>
        <label className="mb-1 block text-sm text-neutral-600" htmlFor="email">
          Email
        </label>
        <Input
          type="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label
          className="mb-1 block text-sm text-neutral-600"
          htmlFor="password"
        >
          Password
        </label>
        <Input
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button className="w-full">Login</Button>
    </form>
  )
}

export default Form
