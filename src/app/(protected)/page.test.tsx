import { render, screen } from '@testing-library/react'
import useUser from '@/hooks/useUser'
import useSession from '@/hooks/useSession'
import useSpaces from '@/hooks/useSpaces'
import Home from './page'

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/hooks/useSpaces')
const useSpacesMock = vi.mocked(useSpaces)

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

    useSpacesMock.mockReturnValue({
      data: [
        {
          id: 'Space ID',
          name: 'Space Name',
        },
      ],
      isLoading: false,
    } as unknown as ReturnType<typeof useSpaces>)
    render(<Home />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toBeInTheDocument()
  })

  test('renders Filter', () => {
    useSpacesMock.mockReturnValue({
      data: [
        {
          id: 'Space ID',
          name: 'Space Name',
        },
      ],
      isLoading: false,
    } as unknown as ReturnType<typeof useSpaces>)

    render(<Home />)

    expect(
      screen.getByRole('button', { name: 'Last visited' })
    ).toBeInTheDocument()
  })

  test('renders Spaces', () => {
    useSpacesMock.mockReturnValue({
      data: [
        {
          id: 'Space ID',
          name: 'Space Name',
        },
      ],
      isLoading: false,
    } as unknown as ReturnType<typeof useSpaces>)

    render(<Home />)
    expect(screen.getByRole('group', { name: 'Spaces' })).toBeInTheDocument()
  })
})
