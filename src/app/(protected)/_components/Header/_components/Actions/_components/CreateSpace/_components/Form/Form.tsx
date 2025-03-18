import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/Button'
import TextField from '@/components/TextField'
import createSpace from '@/db/createSpace'
import useUser from '@/hooks/useUser'
import useOwnedSpaces from '@/hooks/useOwnedSpaces'

interface Props {
  onCreated: () => void
}

const schema = z.object({
  spaceName: z.string().nonempty('Please enter a space name'),
})

type Schema = z.infer<typeof schema>

const Form: FC<Props> = ({ onCreated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({ resolver: zodResolver(schema) })
  const { data: user } = useUser()

  const { mutate } = useOwnedSpaces()

  if (!user) {
    return
  }

  const onSubmit: SubmitHandler<Schema> = async (data): Promise<void> => {
    await createSpace({ name: data.spaceName, ownerId: String(user.id) })
    await mutate()
    onCreated()
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event)
      }}
    >
      <TextField
        {...register('spaceName')}
        label="Space Name:"
        errorMessage={errors.spaceName?.message}
      />
      <Button className="w-full" type="submit" isLoading={isSubmitting}>
        Create Space
      </Button>
    </form>
  )
}

export default Form
