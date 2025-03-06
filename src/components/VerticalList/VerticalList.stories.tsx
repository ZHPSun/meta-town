import { type Meta, type StoryObj } from '@storybook/react'
import Button from '../Button'
import IconButton from '../IconButton'
import Dropdown from '../Dropdown'
import ListItem from '../ListItem'
import ListDivider from '../ListDivider'
import VerticalList from './VerticalList'

const meta = {
  title: 'Components/VerticalList',
  component: VerticalList,
  tags: ['autodocs'],
} satisfies Meta<typeof VerticalList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <></>,
  },

  render: () => (
    <Dropdown
      trigger={(toggle, isOpen) => (
        <Button
          onClick={toggle}
          variant={isOpen ? 'secondary' : 'primary'}
          suffix={{ icon: 'chevron-down', label: 'Toggle dropdown' }}
        >
          Menu
        </Button>
      )}
    >
      <VerticalList>
        <ListItem>
          <Button variant="primary" prefix={{ icon: 'nut', label: 'Nut' }}>
            Button
          </Button>
        </ListItem>
        <ListDivider />
        <ListItem>
          <Button variant="secondary" suffix={{ icon: 'bell', label: 'Bell' }}>
            Button
          </Button>
        </ListItem>
        <ListDivider />
        <ListItem>Plain Text</ListItem>
        <ListDivider />
        <ListItem placement="right">
          <IconButton icon="apple" label="Apple" variant="secondary" />
        </ListItem>
      </VerticalList>
    </Dropdown>
  ),
}
