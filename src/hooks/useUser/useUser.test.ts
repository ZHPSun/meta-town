import { renderHook } from '@testing-library/react'
import useSWR from 'swr'
import useSession from '@/hooks/useSession'
import useUser from './useUser'
import getUser from './utils/getUser'

vi.mock('swr')
const useSWRMock = vi.mocked(useSWR)

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

describe('useUser', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('calls useSWR with null key if session is false', () => {
    useSessionMock.mockReturnValue({
      data: false,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    renderHook(() => useUser())

    expect(useSWRMock).toHaveBeenCalledWith(null, getUser)
  })

  test('calls useSWR with key and fetcher', () => {
    useSessionMock.mockReturnValue({
      data: true,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    renderHook(() => useUser())

    expect(useSWRMock).toHaveBeenCalledWith('user', getUser)
  })

  test('returns result from useSWR', () => {
    const USER_DATA = {
      id: 'ID',
      displayName: 'John Doe',
      avatar: 'dog',
    }

    useSessionMock.mockReturnValue({
      data: true,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

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
