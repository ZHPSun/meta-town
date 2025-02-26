import Form from './_component/Form'
import Logo from '@/components/Logo'
import { FC } from 'react'
import Link from 'next/link'

const SignUp: FC = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="space-y-6">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p>Sign Up! Step Into Your Virtual World</p>
      <Form />
      <p>
        Already have an account?
        <Link href="/authentication/login" className="text-blue-500">
          Login now!
        </Link>
      </p>
    </div>
  </div>
)

export default SignUp
