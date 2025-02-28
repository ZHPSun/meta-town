'use client'

import { FC, useState, FormEvent } from 'react'
import Input from '@/components/Input'
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
        <Input type="password" id="password" />
      </div>
      <div>
        <label
          className="mb-1 block text-sm text-neutral-600"
          htmlFor="confirmPassword"
        >
          Confirm password
        </label>
        <Input
          type="password"
          id="confirmPassword"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="py-2">
        <Conditions />
      </div>
      <Button className="w-full">Join Meta Town</Button>
    </form>
  )
}

export default Form
