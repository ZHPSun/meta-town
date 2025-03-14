import { FC, FormEvent, useState } from 'react'
import Button from '@/components/Button'
import TextField from '@/components/TextField'
import createSpace from '@/db/createSpace'
import useUser from '@/hooks/useUser'

interface Props {
  onCreated: () => void
}

const Form: FC<Props> = ({ onCreated }) => {
  const { data: user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [spaceName, setSpaceName] = useState('')

  if (!user) {
    return
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    if (!spaceName) {
      return
    }

    const data = {
      name: spaceName,
      ownerId: user.id,
    }

    setIsLoading(true)
    await createSpace(data)
    setIsLoading(false)
    onCreated()
  }

  return (
    <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
      <TextField
        label="Space Name:"
        value={spaceName}
        onChange={(event) => setSpaceName(event.target.value)}
      />
      <Button className="w-full" type="submit" isLoading={isLoading}>
        Create Space
      </Button>
    </form>
  )
}

export default Form
