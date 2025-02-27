import { FC } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Form from './_component/Form'

const Login: FC = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="basis-[360px] space-y-12 py-12">
      <div className="text-center">
        <Logo />
      </div>
      <Form />
      <p className="border-t border-neutral-200 pt-4 text-center text-neutral-600">
        Do not have an account yet? &nbsp;
        <Link href="/authentication/sign-up" className="text-blue-500">
          Sign up now!
        </Link>
      </p>
    </div>
  </div>
)

export default Login
