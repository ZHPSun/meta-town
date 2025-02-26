import { FC } from 'react'
import Input from '@/components/Input'
import Conditions from './_components/Conditions'
import Button from '@/components/Button'

const Form: FC = () => (
  <div className="max-w-sm space-y-4">
    <div>
      <label htmlFor="email">Email</label>
      <Input type="email" id="email" />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <Input type="password" id="password" />
    </div>
    <div>
      <label htmlFor="confirmPassword">Confirm password</label>
      <Input type="password" id="confirmPassword" />
    </div>
    <Conditions />
    <Button className="w-full">Join Meta Town</Button>
  </div>
)

export default Form
