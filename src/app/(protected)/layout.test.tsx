import { render, screen } from '@testing-library/react'
import useSession from '@/hooks/useSession'
import useUser from '@/hooks/useUser'
import ProtectedLayout from './layout'

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

describe('ProtectedLayout', () => {
  beforeEach(() => {
    useSessionMock.mockReturnValue({
      data: true,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useUserMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders Guard', () => {
    render(<ProtectedLayout>Hello world</ProtectedLayout>)

    expect(useSession).toHaveBeenCalled()
    expect(useUser).toHaveBeenCalled()
  })

  test('passes children to Guard', () => {
    render(<ProtectedLayout>Hello world</ProtectedLayout>)

    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})
