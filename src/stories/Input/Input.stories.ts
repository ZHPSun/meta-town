import { type Meta, type StoryObj } from '@storybook/react'
import Input from './Input'

const meta = {
  title: 'Design/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
