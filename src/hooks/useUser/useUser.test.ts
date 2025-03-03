import { renderHook } from '@testing-library/react'
import useSWR from 'swr'
import useUser from './useUser'
import getUser from './utils/getUser'

vi.mock('swr')
const useSWRMock = vi.mocked(useSWR)

describe('useUser', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('calls useSWR with key and fetcher', () => {
    renderHook(() => useUser())

    expect(useSWRMock).toHaveBeenCalledWith('user', getUser)
  })

  test('returns result from useSWR', () => {
    const USER_DATA = {
      id: 'ID',
      displayName: 'John Doe',
      avatar: 'dog',
    }

    useSWRMock.mockReturnValue({
      data: USER_DATA,
      isLoading: false,
    } as unknown as ReturnType<typeof useSWR>)

    const { result } = renderHook(() => useUser())

    expect(result.current).toEqual({
      data: USER_DATA,
      isLoading: false,
    })
  })
})
