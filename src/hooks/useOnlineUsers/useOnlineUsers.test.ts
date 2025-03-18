import { renderHook } from '@testing-library/react'
import useSWR from 'swr'
import getOnlineUsers from '@/db/getOnlineUsers'
import useOnlineUsers from './useOnlineUsers'

vi.mock('swr')
const useSWRMock = vi.mocked(useSWR)

describe('useOnlineUsers', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('calls useSWR with key and fetcher', () => {
    const spaceId = 'SPACE_ID'

    renderHook(() => useOnlineUsers(spaceId))

    expect(useSWRMock).toHaveBeenCalledWith(
      ['online-users', spaceId],
      getOnlineUsers
    )
  })

  test('returns result from useSWR', () => {
    const spaceId = 'SPACE_ID'

    const data = {
      id: 'ID',
      displayName: 'Display Name',
      avatar: 'Avatar',
    }

    useSWRMock.mockReturnValue({
      data,
      isLoading: false,
    } as unknown as ReturnType<typeof useSWR>)

    const { result } = renderHook(() => useOnlineUsers(spaceId))

    expect(result.current).toEqual({
      data,
      isLoading: false,
    })
  })
})
