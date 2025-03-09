import { FC, FormEvent, useState } from 'react'
import Button from '@/components/Button'
import useSession from '@/hooks/useSession'
import useUser from '@/hooks/useUser'
import createUser from './_utils/createUser'

const Form: FC = () => {
  const { mutate } = useUser()
  const { data: session } = useSession()

  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState({
    displayName: '',
    avatar: 'dog',
  })

  if (!session) {
    return null
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    setIsLoading(true)

    await createUser({
      ...data,
      authId: session.user.id,
    })

    await mutate()

    setIsLoading(false)
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)}>
      <p>
        <input
          type="text"
          placeholder="Display name"
          value={data.displayName}
          onChange={(event) =>
            setData((previousData) => ({
              ...previousData,
              displayName: event.target.value,
            }))
          }
        />
      </p>

      <Button type="submit" disabled={isLoading}>
        Create user
      </Button>
    </form>
  )
}

export default Form
