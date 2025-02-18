import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'
import Icon from './Icon'
import Configurable from './Configurable'

const meta = {
  title: 'Design/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const ButtonDefault: Story = {
  name: 'Button',
  render: Button,
}

export const ButtonIcon: Story = {
  name: 'Button.Icon',
  render: Icon,
}

export const ButtonConfigurable: Story = {
  name: 'Button.Configurable',
  render: Configurable,
}
