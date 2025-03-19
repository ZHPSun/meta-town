import { render, screen } from '@testing-library/react'
import useSessionUser from '@/hooks/useSessionUser'
import useSession from '@/hooks/useSession'
import useOwnedSpaces from '@/hooks/useOwnedSpaces'
import Home from './page'

vi.mock('@/hooks/useSessionUser')
const useSessionUserMock = vi.mocked(useSessionUser)

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/hooks/useOwnedSpaces')
const useOwnedSpacesMock = vi.mocked(useOwnedSpaces)

describe('Home', () => {
  test('renders Header', () => {
    useSessionUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: {
        user: { id: 'ID', email: 'test@example.com' },
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useOwnedSpacesMock.mockReturnValue({
      data: [
        {
          id: 'Space ID',
          name: 'Space Name',
        },
      ],
      isLoading: false,
    } as unknown as ReturnType<typeof useOwnedSpaces>)
    render(<Home />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toBeInTheDocument()
  })

  test('renders Filter', () => {
    useOwnedSpacesMock.mockReturnValue({
      data: [
        {
          id: 'Space ID',
          name: 'Space Name',
        },
      ],
      isLoading: false,
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    render(<Home />)

    expect(
      screen.getByRole('button', { name: 'Last visited' })
    ).toBeInTheDocument()
  })

  test('renders Spaces', () => {
    useOwnedSpacesMock.mockReturnValue({
      data: [
        {
          id: 'Space ID',
          name: 'Space Name',
        },
      ],
      isLoading: false,
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    render(<Home />)
    expect(screen.getByRole('group', { name: 'Spaces' })).toBeInTheDocument()
  })
})
