import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'
import signUp from './_utils/signUp'

vi.mock('./_utils/signUp')

describe('Form', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

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
    vi.mocked(signUp).mockResolvedValue({ error: null })

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

  test('shows validation errors message when form is submitted with empty fields', async () => {
    const user = userEvent.setup()
    render(<Form />)

    await user.click(screen.getByRole('button', { name: 'Join Meta Town' }))

    expect(
      screen.getByText('Please enter your email address')
    ).toBeInTheDocument()
    expect(screen.getByText('Please enter a password')).toBeInTheDocument()
    expect(screen.getByText('Please confirm your password')).toBeInTheDocument()
  })

  test('shows validation error message when email format is invalid', async () => {
    const user = userEvent.setup()
    render(<Form />)

    await user.type(screen.getByLabelText('Email'), 'email')

    await user.click(screen.getByRole('button', { name: 'Join Meta Town' }))

    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument()
  })

  test('shows validation error message when password is too short', async () => {
    const user = userEvent.setup()
    render(<Form />)

    await user.type(screen.getByLabelText('Password'), 'passwor')

    await user.click(screen.getByRole('button', { name: 'Join Meta Town' }))

    expect(
      screen.getByText('Password must be at least 8 characters long')
    ).toBeInTheDocument()
  })

  test('shows validation errors message when passwords do not match', async () => {
    const user = userEvent.setup()
    render(<Form />)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password')
    await user.type(screen.getByLabelText('Confirm password'), 'password2')

    await user.click(screen.getByRole('button', { name: 'Join Meta Town' }))

    expect(
      screen.getByText('Passwords do not match. Please try again')
    ).toBeInTheDocument()
  })
})
