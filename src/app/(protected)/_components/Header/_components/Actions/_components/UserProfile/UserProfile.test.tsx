import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useUser from '@/hooks/useUser'
import useSession from '@/hooks/useSession'
import UserProfile from './UserProfile'

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

afterEach(() => {
  vi.resetAllMocks()
})

describe('UserProfile', () => {
  test('renders user profile button', () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {
        user: { id: 'ID', email: 'test@example.com' },
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<UserProfile />)

    expect(screen.getByRole('button', { name: 'John Doe' })).toBeInTheDocument()
  })

  test('renders dropdown menu when user profile button is clicked', async () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {
        user: { id: 'ID', email: 'test@example.com' },
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    const user = userEvent.setup()

    render(<UserProfile />)

    await user.click(screen.getByRole('button', { name: 'John Doe' }))

    expect(
      within(screen.getByRole('menu')).getByRole('button', {
        name: 'Edit Profile',
      })
    ).toBeInTheDocument()

    expect(
      await within(screen.getByRole('menu')).findByRole('button', {
        name: 'Sign Out',
      })
    ).toBeInTheDocument()
  })

  test('renders user display name', () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {
        user: { id: 'ID', email: 'test@example.com' },
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<UserProfile />)

    expect(screen.getByRole('button', { name: 'John Doe' })).toBeInTheDocument()
  })

  test('renders session user email when user is null', () => {
    useUserMock.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {
        user: { id: 'ID', email: 'test@example.com' },
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<UserProfile />)

    expect(
      screen.getByRole('button', { name: 'test@example.com' })
    ).toBeInTheDocument()
  })

  test('renders nothing when session is null', () => {
    useUserMock.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    const { container } = render(<UserProfile />)

    expect(container).toBeEmptyDOMElement()
  })
})
