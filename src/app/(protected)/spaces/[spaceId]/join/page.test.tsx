import { render, screen, waitFor } from '@testing-library/react'
import { useParams } from 'next/navigation'
import getJoinedSpaces from '@/db/getJoinedSpaces'
import joinSpace from '@/db/joinSpace'
import useUser from '@/hooks/useUser'
import navigate from '@/utils/navigate'
import Join from './page'

vi.mock('next/navigation')
const mockParamsMock = vi.mocked(useParams)

vi.mock('@/utils/navigate')

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('@/db/getJoinedSpaces')
const getJoinedSpacesMock = vi.mocked(getJoinedSpaces)

vi.mock('@/db/joinSpace')

describe('Join', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders GlobalLoading', () => {
    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    getJoinedSpacesMock.mockResolvedValueOnce([
      {
        id: 'SPACE_ID',
        name: 'John Doe',
      },
    ])

    render(<Join />)

    expect(
      screen.getByText('Please wait, we are syncing the metaverse...')
    ).toBeInTheDocument()
  })

  test('does not call joinSpace and getJoinedSpaces if there is no user', () => {
    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useUserMock.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    render(<Join />)

    expect(joinSpace).not.toBeCalled()
    expect(getJoinedSpaces).not.toBeCalled()
  })

  test('redirect to space if user has joined the space', async () => {
    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    getJoinedSpacesMock.mockResolvedValueOnce([
      {
        id: 'SPACE_ID',
        name: 'John Doe',
      },
    ])

    render(<Join />)

    await waitFor(() => expect(getJoinedSpaces).toBeCalledWith('ID'))

    expect(joinSpace).not.toBeCalled()

    expect(navigate).toHaveBeenCalledWith('/spaces/SPACE_ID')
  })

  test('adds user to space and redirect to space if user has not joined the space', async () => {
    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    getJoinedSpacesMock.mockResolvedValueOnce([
      {
        id: 'SPACE_ID_2',
        name: 'John Doe',
      },
    ])

    render(<Join />)

    await waitFor(() => expect(getJoinedSpaces).toBeCalledWith('ID'))

    await waitFor(() =>
      expect(joinSpace).toBeCalledWith({
        spaceId: 'SPACE_ID',
        userId: 'ID',
      })
    )

    expect(navigate).toHaveBeenCalledWith('/spaces/SPACE_ID')
  })
})
