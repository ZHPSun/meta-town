import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useSession from '@/hooks/useSession'
import navigate from '@/utils/navigate'
import signUp from './_utils/signUp'
import Form, { getServerErrorMessage } from './Form'

vi.mock('./_utils/signUp')
const signUpMock = vi.mocked(signUp)

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/utils/navigate')

describe('Form', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders form', () => {
    useSessionMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSession>)

    render(<Form />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Join Meta Town' })
    ).toBeInTheDocument()
  })

  test('calls useSession with skipCheck', () => {
    useSessionMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSession>)

    render(<Form />)

    expect(useSessionMock).toHaveBeenCalledWith(true)
  })

  test('authenticates user on form submit', async () => {
    const mutate = vi.fn()
    useSessionMock.mockReturnValue({
      mutate,
    } as unknown as ReturnType<typeof useSession>)

    signUpMock.mockResolvedValue({ error: null })

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

    expect(mutate).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/')
  })

  test('shows validation errors message when form is submitted with empty fields', async () => {
    useSessionMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSession>)

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
    useSessionMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSession>)

    const user = userEvent.setup()
    render(<Form />)

    await user.type(screen.getByLabelText('Email'), 'email')

    await user.click(screen.getByRole('button', { name: 'Join Meta Town' }))

    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument()
  })

  test('shows validation error message when password is too short', async () => {
    useSessionMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSession>)

    const user = userEvent.setup()
    render(<Form />)

    await user.type(screen.getByLabelText('Password'), 'pass')

    await user.click(screen.getByRole('button', { name: 'Join Meta Town' }))

    expect(
      screen.getByText('Password must be at least 8 characters long')
    ).toBeInTheDocument()
  })

  test('shows validation errors message when passwords do not match', async () => {
    useSessionMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSession>)

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

  test('renders supabase errors message when email is taken during sign up', async () => {
    useSessionMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSession>)

    signUpMock.mockResolvedValue({
      error: { code: 'email_exists' },
    } as unknown as Awaited<ReturnType<typeof signUp>>)

    const user = userEvent.setup()
    render(<Form />)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password')
    await user.type(screen.getByLabelText('Confirm password'), 'password')
    await user.click(screen.getByRole('button', { name: 'Join Meta Town' }))

    expect(
      screen.getByText(
        'This email is already registered. Please use a different email or log in instead.'
      )
    ).toBeInTheDocument()
  })

  test('renders bypassed supabase error message when it is not related to email conflict', async () => {
    useSessionMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSession>)

    signUpMock.mockResolvedValue({
      error: { code: 'manual_linking_disabled' },
    } as unknown as Awaited<ReturnType<typeof signUp>>)

    const user = userEvent.setup()
    render(<Form />)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password')
    await user.type(screen.getByLabelText('Confirm password'), 'password')
    await user.click(screen.getByRole('button', { name: 'Join Meta Town' }))

    expect(
      screen.getByText('Something wrong, please try again later.')
    ).toBeInTheDocument()
  })
})

describe('getServerErrorMessage', () => {
  test('returns undefined if there is no errors', () => {
    expect(getServerErrorMessage(undefined)).toBeUndefined()
    expect(getServerErrorMessage(null)).toBeUndefined()
  })
})
