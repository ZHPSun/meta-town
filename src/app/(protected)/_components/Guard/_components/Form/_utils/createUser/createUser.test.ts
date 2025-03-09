import createSupabaseClient from '@/utils/createSupabaseClient'
import createUser from './createUser'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('createUser', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('creates a new user', async () => {
    const data = {
      displayName: 'John Doe',
      avatar: 'dog',
      authId: 'AUTH_ID',
    }

    const supabaseClient = {
      from: vi.fn().mockReturnValue({
        insert: vi.fn(),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await createUser(data)

    expect(supabaseClient.from).toHaveBeenCalledWith('users')
    expect(supabaseClient.from('users').insert).toHaveBeenCalledWith({
      display_name: data.displayName,
      avatar: data.avatar,
      auth_id: data.authId,
    })
  })
})
