import { FC } from 'react'
import Input from '@/components/Input'
import IconButton from '@/components/IconButton'

const Form: FC = () => (
  <div className="flex w-full justify-center gap-6 px-4 align-middle">
    <Input />
    <IconButton tooltip={{ position: 'top' }} icon="send" label="Send" />
  </div>
)

export default Form
