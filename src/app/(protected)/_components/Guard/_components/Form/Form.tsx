import { FC, FormEvent, useState } from 'react'
import Button from '@/components/Button'
import useUser from '@/hooks/useUser'
import createUser from './_utils/createUser'

const Form: FC = () => {
  const { mutate, isLoading } = useUser()

  const [data, setData] = useState({
    displayName: '',
    avatar: 'dog',
  })

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    await createUser(data)

    await mutate()
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
