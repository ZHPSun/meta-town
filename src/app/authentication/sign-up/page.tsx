import { FC } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Form from './_component/Form'

const SignUp: FC = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="basis-[360px] space-y-12 py-12">
      <div className="space-y-4 text-center">
        <Logo />
        <p className="font-stretch-expanded text-xl text-neutral-800">
          Sign Up! Step Into Your Virtual World
        </p>
      </div>
      <Form />
      <p className="border-t border-neutral-200 pt-4 text-center text-neutral-600">
        Already have an account? &nbsp;
        <Link href="/authentication/login" className="text-blue-500">
          Login now!
        </Link>
      </p>
    </div>
  </div>
)

export default SignUp
