import React, { FC, useState, FormEvent } from 'react'
import Button from '@/components/Button'
import useUser from '@/hooks/useUser'
import TextField from '@/components/TextField'
import createSpace from './_utils/createSpace'

const Form: FC = () => {
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
