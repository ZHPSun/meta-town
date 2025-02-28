import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'
import login from './_utils/login'

vi.mock('./_utils/login')

describe('Form', () => {
  test('renders input email', () => {
    render(<Form />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  test('renders input password', () => {
    render(<Form />)

    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  test('renders Login button', () => {
    render(<Form />)

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  test('authenticates user on form submit', async () => {
    const user = userEvent.setup()

    render(<Form />)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')

    await user.type(screen.getByLabelText('Password'), 'password')

    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    })
  })
})
