'use client'

import { FC, useEffect } from 'react'
import signOut from '@/db/signOut'
import useSession from '@/hooks/useSession'
import navigate from '@/utils/navigate'

const SignOut: FC = () => {
  const { mutate } = useSession(true)

  useEffect(() => {
    const handleSignOut = async (): Promise<void> => {
      await signOut()

      await mutate()

      navigate('/authentication/login')
    }

    void handleSignOut()
  })

  return <div>Signing out...</div>
}

export default SignOut
