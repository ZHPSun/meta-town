import { render, screen } from '@testing-library/react'
import useSession from '@/hooks/useSession'
import useUser from '@/hooks/useUser'
import Guard from './Guard'

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

describe('Guard', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('calls useSession and useUser', () => {
    useSessionMock.mockReturnValue({
      data: true,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useUserMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    render(<Guard>Hello world</Guard>)

    expect(useSessionMock).toHaveBeenCalled()
    expect(useUserMock).toHaveBeenCalled()
  })

  test('renders loading when useSession is loading', () => {
    useSessionMock.mockReturnValue({
      data: null,
      isLoading: true,
    } as unknown as ReturnType<typeof useSession>)

    useUserMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    render(<Guard>Hello world</Guard>)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders loading when useUser is loading', () => {
    useSessionMock.mockReturnValue({
      data: true,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useUserMock.mockReturnValue({
      data: null,
      isLoading: true,
    } as unknown as ReturnType<typeof useUser>)

    render(<Guard>Hello world</Guard>)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders nothing when useSession returns false', () => {
    useSessionMock.mockReturnValue({
      data: false,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useUserMock.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    const { container } = render(<Guard>Hello world</Guard>)

    expect(container).toBeEmptyDOMElement()
  })

  test('renders form on top of children when user is not found', () => {
    useSessionMock.mockReturnValue({
      data: true,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useUserMock.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    render(<Guard>Hello world</Guard>)

    expect(
      screen.getByRole('button', { name: 'Create user' })
    ).toBeInTheDocument()
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  test('renders only children when user is found', () => {
    useSessionMock.mockReturnValue({
      data: true,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useUserMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    render(<Guard>Hello world</Guard>)

    expect(
      screen.queryByRole('button', { name: 'Create user' })
    ).not.toBeInTheDocument()
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})
