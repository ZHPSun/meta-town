import { render, screen } from '@testing-library/react'
import Avatar from './Avatar'

describe('Avatar', () => {
  test('renders avatar iconButton', async () => {
    render(<Avatar avatar="bird" name="Jack" />)

    expect(
      await screen.findByRole('button', { name: 'Jack' })
    ).toBeInTheDocument()
  })
})
