import { render, screen } from '@testing-library/react'
import useSession from '@/hooks/useSession'
import useUser from '@/hooks/useUser'
import ProfileFormModal from './ProfileFormModal'

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

describe('ProfileFormModal', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders Modal', () => {
    useUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<ProfileFormModal title="Create user" />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Create user' })
    ).toBeInTheDocument()
  })

  test('renders Form', () => {
    useUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<ProfileFormModal title="Create user" />)

    expect(
      screen.getByRole('textbox', { name: 'Your display name' })
    ).toBeInTheDocument()
  })

  test('renders the Close button if the onClose prop is given', () => {
    const onClose = vi.fn()

    useUserMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<ProfileFormModal title="Edit Profile" onClose={onClose} />)

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('does not render the Close button if the onClose prop is not given', () => {
    useUserMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<ProfileFormModal title="Edit Profile" />)

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument()
  })
})
