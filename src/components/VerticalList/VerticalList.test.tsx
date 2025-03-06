import { render, screen } from '@testing-library/react'
import ListItem from '../ListItem'
import VerticalList from './VerticalList'

describe('VerticalList', () => {
  test('renders children', () => {
    render(
      <VerticalList>
        <ListItem>Test item</ListItem>
      </VerticalList>
    )

    expect(screen.getByRole('listitem')).toHaveTextContent('Test item')
  })
})
