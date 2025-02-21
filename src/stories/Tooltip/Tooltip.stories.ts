import type { Meta, StoryObj } from '@storybook/react'
import Tooltip from './Tooltip'

const meta = {
  title: 'Design/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const TooltipDefault: Story = {
  name: 'Tooltip',
}
