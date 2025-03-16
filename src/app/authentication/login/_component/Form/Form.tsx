'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from '@/components/Button'
import TextField from '@/components/TextField'
import login from '@/db/login'
import useSession from '@/hooks/useSession'
import navigate from '@/utils/navigate'

const schema = z.object({
  email: z.string().nonempty('Please enter your email address'),
  password: z.string().nonempty('Please enter a password'),
}) satisfies z.ZodType<{
  email: string
  password: string
}>

type ServerError = Awaited<ReturnType<typeof login>>['error']
type Schema = z.infer<typeof schema>

export const getServerErrorMessage = (
  error: ServerError
): string | undefined => {
  if (!error) return

  if (error.code === 'invalid_credentials') {
    return 'Incorrect email or password. Please try again.'
  }

  return 'Something wrong, please try again later.'
}

const Form: FC = () => {
  const { mutate } = useSession(true)

  const [serverError, setServerError] = useState<ServerError>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async ({ email, password }: Schema): Promise<void> => {
    const { error } = await login({ email, password })

    if (error) {
      setServerError(error)

      return
    }

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
      {serverError && (
        <p className="text-rose-500">{getServerErrorMessage(serverError)}</p>
      )}
      <Button className="w-full" type="submit" isLoading={isSubmitting}>
        Login
      </Button>
    </form>
  )
}

export default Form
