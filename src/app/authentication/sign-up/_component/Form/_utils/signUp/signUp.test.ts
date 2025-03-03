import { redirect } from 'next/navigation'
import createSupabaseClient from '@/utils/createSupabaseClient'
import signUp from './signUp'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

vi.mock('next/navigation')

describe('signUp', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('redirects user to homepage after succussed sign up', async () => {
    const supabaseClient = {
      auth: {
        signUp: vi.fn().mockResolvedValue({
          data: {} as unknown,
          error: null,
        }),
      },
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await signUp({ email: 'test@example.com', password: 'password123' })

    expect(supabaseClient.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(redirect).toHaveBeenCalledWith('/')
  })

  test('prevents a user from signing up when supabase reject it', async () => {
    const supabaseClient = {
      auth: {
        signUp: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Invalid signUp credentials' },
        }),
      },
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await expect(
      signUp({ email: 'test@example.com', password: 'wrong-password' })
    ).rejects.toThrow('Invalid signUp credentials')

    expect(redirect).not.toHaveBeenCalled()
  })
})
