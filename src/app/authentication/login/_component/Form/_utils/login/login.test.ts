import { redirect } from 'next/navigation'
import { SupabaseClient } from '@supabase/supabase-js'
import createSupabaseClient from '@/utils/createSupabaseClient'
import login from './login'

vi.mock('@/utils/createSupabaseClient')

const createSupabaseClientMock = vi.mocked(createSupabaseClient)

vi.mock('next/navigation')

const signInWithPasswordMock = vi.fn()

describe('login', () => {
  beforeEach(() => {
    createSupabaseClientMock.mockReturnValue({
      auth: {
        signInWithPassword: signInWithPasswordMock,
      },
    } as unknown as SupabaseClient)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('redirects user to homepage after log in', async () => {
    signInWithPasswordMock.mockResolvedValue({
      data: {} as unknown,
      error: null,
    })

    await login({ email: 'test@example.com', password: 'password123' })

    expect(signInWithPasswordMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(redirect).toHaveBeenCalledWith('/')
  })

  test('prevents an unverified user from logging in', async () => {
    signInWithPasswordMock.mockResolvedValue({
      data: null,
      error: { message: 'Invalid login credentials' },
    })

    await expect(
      login({ email: 'test@example.com', password: 'wrong-password' })
    ).rejects.toThrow('Invalid login credentials')

    expect(redirect).not.toHaveBeenCalled()
  })
})
