import type { Meta, StoryObj } from '@storybook/react'
import IconButton from './IconButton'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Beer',
    icon: 'beer',
  },
}
