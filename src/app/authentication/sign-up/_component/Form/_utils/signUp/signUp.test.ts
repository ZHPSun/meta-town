import { redirect } from 'next/navigation'
import { SupabaseClient } from '@supabase/supabase-js'
import createSupabaseClient from '@/utils/createSupabaseClient'
import signUp from './signUp'

vi.mock('@/utils/createSupabaseClient')

const createSupabaseClientMock = vi.mocked(createSupabaseClient)

vi.mock('next/navigation')

const signUpMock = vi.fn()

describe('signUp', () => {
  beforeEach(() => {
    createSupabaseClientMock.mockReturnValue({
      auth: {
        signUp: signUpMock,
      },
    } as unknown as SupabaseClient)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('redirects user to homepage after succussed sign up', async () => {
    signUpMock.mockResolvedValue({
      data: {} as unknown,
      error: null,
    })

    await signUp({ email: 'test@example.com', password: 'password123' })

    expect(signUpMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(redirect).toHaveBeenCalledWith('/')
  })

  test('prevents a user from signing up when supabase reject it', async () => {
    signUpMock.mockResolvedValue({
      data: null,
      error: { message: 'Invalid signUp credentials' },
    })

    await expect(
      signUp({ email: 'test@example.com', password: 'wrong-password' })
    ).rejects.toThrow('Invalid signUp credentials')

    expect(redirect).not.toHaveBeenCalled()
  })
})
