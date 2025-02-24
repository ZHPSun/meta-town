import type { Meta, StoryObj } from '@storybook/react'
import Tooltip from './Tooltip'
import Button from '../Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    text: 'Tooltip',
    position: 'center',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
}
