import { render, screen } from '@testing-library/react'
import useUser from '@/hooks/useUser'
import useSession from '@/hooks/useSession'
import Home from './page'

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

describe('Home', () => {
  test('renders Header', () => {
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
    render(<Home />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toBeInTheDocument()
  })

  test('renders Filter', () => {
    render(<Home />)

    expect(
      screen.getByRole('button', { name: 'Last visited' })
    ).toBeInTheDocument()
  })

  test('renders Spaces', () => {
    render(<Home />)
    expect(screen.getAllByRole('status')).toHaveLength(6)
  })
})
