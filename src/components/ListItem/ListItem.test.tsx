import { render, screen } from '@testing-library/react'
import ListItem, { PLACEMENT } from './ListItem'

describe('ListItem', () => {
  test('renders children', () => {
    render(<ListItem>Item</ListItem>)

    expect(screen.getByRole('listitem')).toHaveTextContent('Item')
  })

  test.each(['left', 'full', 'right'] as const)(
    'renders list item with %s placement',

    (placement) => {
      render(<ListItem placement={placement}>Item</ListItem>)

      expect(screen.getByRole('listitem')).toHaveTextContent('Item')
      expect(screen.getByRole('listitem')).toHaveClass(PLACEMENT[placement])
    }
  )
})
