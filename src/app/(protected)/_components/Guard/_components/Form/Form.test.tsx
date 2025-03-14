import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import createUser from '@/db/createUser'
import useSession from '@/hooks/useSession'
import useUser from '@/hooks/useUser'
import Form from './Form'

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('@/db/createUser')
const createUserMock = vi.mocked(createUser)

describe('Form', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders form', () => {
    useUserMock.mockReturnValue({
      mutate: vi.fn(),
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<Form />)

    expect(screen.getByPlaceholderText('Display name')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Create user' })
    ).toBeInTheDocument()
  })

  test('renders null if session is null', () => {
    useUserMock.mockReturnValue({
      mutate: vi.fn(),
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    const { container } = render(<Form />)

    expect(container).toBeEmptyDOMElement()
  })

  test('calls createUser on form submit', async () => {
    const mutate = vi.fn()
    const session = { user: { id: 'AUTH_ID' } }

    useSessionMock.mockReturnValue({
      data: session,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useUserMock.mockReturnValue({
      mutate,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    createUserMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    )

    const user = userEvent.setup()

    render(<Form />)

    await user.type(screen.getByPlaceholderText('Display name'), 'John Doe')
    await user.click(screen.getByRole('button', { name: 'Create user' }))

    expect(screen.getByRole('button', { name: 'Loading' })).toBeDisabled()

    expect(createUser).toHaveBeenCalledWith({
      displayName: 'John Doe',
      avatar: 'dog',
      authId: session.user.id,
    })

    await waitFor(() => expect(mutate).toHaveBeenCalled())

    expect(
      screen.getByRole('button', { name: 'Create user' })
    ).not.toBeDisabled()
  })
})
