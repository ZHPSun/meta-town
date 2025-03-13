import { render, screen } from '@testing-library/react'
import Messages from './Messages'

describe('Messages', () => {
  test('renders messages', () => {
    render(<Messages />)

    expect(screen.getAllByRole('region', { name: 'message' })).toHaveLength(6)
  })
})
