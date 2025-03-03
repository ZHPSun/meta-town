import { renderHook } from '@testing-library/react'
import useSWR from 'swr'
import navigate from '@/utils/navigate'
import useSession from './useSession'
import getSession from './utils/getSession'

vi.mock('swr')
const useSWRMock = vi.mocked(useSWR)

vi.mock('@/utils/navigate')

describe('useSession', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('calls useSWR with key and fetcher', () => {
    useSWRMock.mockReturnValue({
      data: true,
      isLoading: false,
    } as unknown as ReturnType<typeof useSWR>)

    renderHook(() => useSession())

    expect(useSWRMock).toHaveBeenCalledWith('session', getSession)
  })

  test('returns result from useSWR', () => {
    useSWRMock.mockReturnValue({
      data: true,
      isLoading: false,
    } as unknown as ReturnType<typeof useSWR>)

    const { result } = renderHook(() => useSession())

    expect(result.current).toEqual({
      data: true,
      isLoading: false,
    })
  })

  test('calls login if session does not exist', () => {
    useSWRMock.mockReturnValue({
      data: false,
      isLoading: false,
    } as unknown as ReturnType<typeof useSWR>)

    renderHook(() => useSession())

    expect(navigate).toHaveBeenCalledWith('/authentication/login')
  })

  test('does not call login if session does not exist with skipCheck', () => {
    useSWRMock.mockReturnValue({
      data: false,
      isLoading: false,
    } as unknown as ReturnType<typeof useSWR>)

    renderHook(() => useSession(true))

    expect(navigate).not.toHaveBeenCalledWith('/authentication/login')
  })
})
