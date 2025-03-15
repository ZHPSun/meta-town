'use client'

import { FC, ReactNode } from 'react'
import useSession from '@/hooks/useSession'
import useUser from '@/hooks/useUser'
import GlobalLoading from '@/components/GlobalLoading'
import ProfileFormModal from '../ProfileFormModal'

interface Props {
  children: ReactNode
}

const CreateUserGuard: FC<Props> = ({ children }) => {
  const { data: user, isLoading: isUserLoading } = useUser()
  const { data: session, isLoading: isSessionLoading } = useSession()

  if (isUserLoading || isSessionLoading) {
    return <GlobalLoading />
  }

  if (!session) {
    return null
  }

  return (
    <div>
      {!user && <ProfileFormModal title="Create user" />}
      {children}
    </div>
  )
}

export default CreateUserGuard
