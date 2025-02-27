import { FC } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Conditions from './_components/Conditions'

const Form: FC = () => (
  <form className="space-y-4">
    <div>
      <label className="mb-1 block text-sm text-neutral-600" htmlFor="email">
        Email
      </label>
      <Input type="email" id="email" />
    </div>
    <div>
      <label className="mb-1 block text-sm text-neutral-600" htmlFor="password">
        Password
      </label>
      <Input type="password" id="password" />
    </div>
    <div>
      <label
        className="mb-1 block text-sm text-neutral-600"
        htmlFor="confirmPassword"
      >
        Confirm password
      </label>
      <Input type="password" id="confirmPassword" />
    </div>
    <div className="py-2">
      <Conditions />
    </div>
    <Button className="w-full">Join Meta Town</Button>
  </form>
)

export default Form
