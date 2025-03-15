import { FC } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import Button from '@/components/Button'
import useSession from '@/hooks/useSession'
import useUser from '@/hooks/useUser'
import TextField from '@/components/TextField'
import createUser from '@/db/createUser'
import AvatarPicker from './_components/AvatarPicker'

export interface Avatar {
  animal: string | null
  color: string
}

interface Props {
  onCreated?: () => void
}

const schema = z.object({
  text: z
    .string()
    .nonempty('Please enter your display name')
    .min(2, { message: 'The display name must be at least 2 characters long' }),
  avatar: z
    .object({
      animal: z.string().nonempty('Please select an animal'),
      color: z.string().nonempty('Please select a color'),
    })
    .required(),
})

type Schema = z.infer<typeof schema>

const Form: FC<Props> = ({ onCreated = undefined }) => {
  const { data: user, mutate } = useUser()
  const { data: session } = useSession()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: user?.displayName ?? '',
      avatar: {
        animal: '',
        color: 'gray',
      },
    },
  })

  if (!session) {
    return null
  }

  const onSubmit = async (data: Schema): Promise<void> => {
    await createUser({
      displayName: data.text,
      avatar: data.avatar.animal,
      authId: session.user.id,
    })

    await mutate()
    onCreated?.()
  }

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <TextField
        {...register('text')}
        errorMessage={errors.text?.message}
        type="text"
        label="Your display name"
        placeholder="Your display name"
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <AvatarPicker onChange={onChange} value={value} />
        )}
        name="avatar"
        control={control}
      />
      {errors.avatar && (
        <span className="block text-sm text-rose-500">
          {errors.avatar.animal?.message}
        </span>
      )}

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        {user ? 'Save Changes' : 'Create user'}
      </Button>
    </form>
  )
}

export default Form
