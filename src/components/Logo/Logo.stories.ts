import type { Meta, StoryObj } from '@storybook/react'
import Logo from './Logo'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const LogoDefault: Story = {}
