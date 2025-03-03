import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useSession from '@/hooks/useSession'
import navigate from '@/utils/navigate'
import Form from './Form'
import login from './_utils/login'

vi.mock('./_utils/login')
const loginMock = vi.mocked(login)

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
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
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
    loginMock.mockResolvedValue({ error: null })

    const user = userEvent.setup()

    render(<Form />)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    })

    expect(mutate).toHaveBeenCalledWith()
    expect(navigate).toHaveBeenCalledWith('/')
  })

  test('shows validation errors message when form is submitted with empty fields', async () => {
    useSessionMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSession>)

    const user = userEvent.setup()
    render(<Form />)

    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(
      screen.getByText('Please enter your email address')
    ).toBeInTheDocument()
    expect(screen.getByText('Please enter a password')).toBeInTheDocument()
  })
})
