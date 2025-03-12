import { render, screen } from '@testing-library/react'
import Form from './Form'

describe('Form', () => {
  test('renders TextField', () => {
    render(<Form />)

    expect(screen.getByLabelText('Display your name')).toBeInTheDocument()
  })

  test('renders AvatarPicker', () => {
    render(<Form />)

    expect(screen.getByRole('button', { name: 'gray' })).toBeInTheDocument()
  })

  test('renders Button', () => {
    render(<Form />)

    expect(
      screen.getByRole('button', { name: 'Save Changes' })
    ).toBeInTheDocument()
  })
})
