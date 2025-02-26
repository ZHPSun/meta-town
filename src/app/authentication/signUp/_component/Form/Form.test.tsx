import { render, screen } from '@testing-library/react'
import Form from './Form'

describe('Form', () => {
  test('renders input email', () => {
    render(<Form />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  test('renders input password', () => {
    render(<Form />)

    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  test('renders input confirm password', () => {
    render(<Form />)

    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument()
  })

  test('renders Join Meta Town button', () => {
    render(<Form />)

    expect(
      screen.getByRole('button', { name: 'Join Meta Town' })
    ).toBeInTheDocument()
  })
})
