import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'
import signUp from './_utils/signUp'

vi.mock('./_utils/signUp')

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

  test('authenticates sign up on form submit', async () => {
    const user = userEvent.setup()

    render(<Form />)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')

    await user.type(screen.getByLabelText('Password'), 'password')

    await user.type(screen.getByLabelText('Confirm password'), 'password')

    await user.click(screen.getByRole('button', { name: 'Join Meta Town' }))

    expect(signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    })
  })
})
