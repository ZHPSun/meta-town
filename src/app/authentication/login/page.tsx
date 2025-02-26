import Form from './_component/Form'
import Logo from '@/components/Logo'
import { FC } from 'react'
import Link from 'next/link'

const Login: FC = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="space-y-6">
      <div className="flex justify-center">
        <Logo />
      </div>
      <Form />
      <p>
        Do not have an account yet?
        <Link href="/authentication/signUp" className="text-blue-500">
          Sign up now!
        </Link>
      </p>
    </div>
  </div>
)

export default Login
