import { render, screen } from '@testing-library/react'
import useUser from '@/hooks/useUser'
import useSession from '@/hooks/useSession'
import Header from './Header'

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

describe('Header', () => {
  test('renders Navigation', () => {
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
    render(<Header />)

    expect(screen.getByRole('button', { name: 'Events' })).toBeInTheDocument()
  })

  test('renders Actions', () => {
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
    render(<Header />)

    expect(
      screen.getByRole('button', {
        name: 'John Doe',
      })
    ).toBeInTheDocument()
  })
})
