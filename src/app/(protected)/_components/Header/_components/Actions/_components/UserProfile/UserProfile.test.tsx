import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useUser from '@/hooks/useUser'
import useSession from '@/hooks/useSession'
import createUser from '@/db/createUser'
import UserProfile from './UserProfile'

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/db/createUser')
const createUserMock = vi.mocked(createUser)

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

  test('does not render edit profile modal initially', async () => {
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
      screen.queryByRole('heading', { name: 'Edit Your Profile' })
    ).not.toBeInTheDocument()
  })

  test('opens edit profile modal when button is clicked', async () => {
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
    await user.click(screen.getByRole('button', { name: 'Edit Profile' }))

    expect(
      screen.getByRole('heading', { name: 'Edit Your Profile' })
    ).toBeInTheDocument()
  })

  test('closes edit profile modal when close button is clicked', async () => {
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
    await user.click(screen.getByRole('button', { name: 'Edit Profile' }))
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(
      screen.queryByRole('heading', { name: 'Edit Your Profile' })
    ).not.toBeInTheDocument()
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

  test('closes edit profile modal after submission', async () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
      isLoading: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {
        user: { id: 'ID', email: 'test@example.com' },
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    createUserMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    )

    const user = userEvent.setup()

    render(<UserProfile />)

    await user.click(screen.getByRole('button', { name: 'John Doe' }))
    await user.click(screen.getByRole('button', { name: 'Edit Profile' }))
    await user.click(screen.getByRole('button', { name: 'bird' }))

    expect(
      screen.queryByRole('textbox', { name: 'Your profile name' })
    ).not.toBeInTheDocument()
  })
})
