'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import login from './_utils/login'

const schema = z.object({
  email: z.string().nonempty('Please enter your email address'),
  password: z.string().nonempty('Please enter a password'),
}) satisfies z.ZodType<{
  email: string
  password: string
}>

type Schema = z.infer<typeof schema>

const Form: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async ({ email, password }: Schema): Promise<void> => {
    await login({ email, password })
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <TextField
        label="Email"
        type="email"
        errorMessage={errors.email?.message}
        {...register('email')}
      />

      <TextField
        label="Password"
        type="password"
        errorMessage={errors.password?.message}
        {...register('password')}
      />

      <Button className="w-full">Login</Button>
    </form>
  )
}

export default Form
