'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import Conditions from './_components/Conditions'
import signUp from './_utils/signUp'

const schema = z
  .object({
    email: z
      .string()
      .nonempty('Please enter your email address')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .nonempty('Please enter a password')
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().nonempty('Please confirm your password'),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ['confirmPassword'],
    message: 'Passwords do not match. Please try again',
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
    await signUp({ email, password })
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
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

      <TextField
        label="Confirm password"
        type="password"
        errorMessage={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <div className="py-2">
        <Conditions />
      </div>
      <Button className="w-full">Join Meta Town</Button>
    </form>
  )
}

export default Form
