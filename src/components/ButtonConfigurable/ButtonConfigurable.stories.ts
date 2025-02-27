import { type Meta, type StoryObj } from '@storybook/react'
import ButtonConfigurable from './ButtonConfigurable'

const meta = {
  title: 'Components/ButtonConfigurable',
  component: ButtonConfigurable,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
  },
} satisfies Meta<typeof ButtonConfigurable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: 'video',
    label: 'Video',
  },
}

export const Button: Story = {
  args: {
    children: 'Button',
  },
}
