'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '@/components/Button'
import TextField from '@/components/TextField'
import useSession from '@/hooks/useSession'
import navigate from '@/utils/navigate'
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
  const { mutate } = useSession(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async ({ email, password }: Schema): Promise<void> => {
    await login({ email, password })
    await mutate()

    navigate('/')
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
