import { FC } from 'react'
import Input from '@/components/Input'
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
    <Button className="w-full">Login</Button>
  </div>
)

export default Form
