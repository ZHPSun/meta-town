import { redirect } from 'next/navigation'
import createSupabaseClient from '@/utils/createSupabaseClient'
import signUp from './signUp'

vi.mock('@/utils/createSupabaseClient')
vi.mock('next/navigation')

const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('signUp', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('redirects user to homepage after successful sign up', async () => {
    const supabaseClient = {
      auth: {
        signUp: vi.fn().mockResolvedValue({
          data: {} as unknown,
          error: null,
        }),
      },
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await signUp({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(supabaseClient.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(redirect).toHaveBeenCalledWith('/')
  })

  test('returns error after unsuccessful login', async () => {
    const supabaseClient = {
      auth: {
        signUp: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Invalid signUp credentials' },
        }),
      },
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const { error } = await signUp({
      email: 'invalid@email.com',
      password: 'password',
    })

    expect(error).toEqual({ message: 'Invalid signUp credentials' })
  })
})
