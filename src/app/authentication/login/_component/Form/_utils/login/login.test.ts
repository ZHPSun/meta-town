import { redirect } from 'next/navigation'
import createSupabaseClient from '@/utils/createSupabaseClient'
import login from './login'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

vi.mock('next/navigation')

describe('login', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('redirects user to homepage after log in', async () => {
    const supabaseClient = {
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: {} as unknown,
          error: null,
        }),
      },
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await login({ email: 'test@example.com', password: 'password123' })

    expect(supabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(redirect).toHaveBeenCalledWith('/')
  })

  test('prevents an unverified user from logging in', async () => {
    const supabaseClient = {
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Invalid login credentials' },
        }),
      },
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await expect(
      login({ email: 'test@example.com', password: 'wrong-password' })
    ).rejects.toThrow('Invalid login credentials')

    expect(redirect).not.toHaveBeenCalled()
  })
})
