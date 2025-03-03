import { renderHook } from '@testing-library/react'
import useSWR from 'swr'
import useSession from './useSession'
import getSession from './utils/getSession'
import login from './utils/login'

vi.mock('swr')
const useSWRMock = vi.mocked(useSWR)

vi.mock('./utils/login')

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

    expect(login).toHaveBeenCalled()
  })
})
