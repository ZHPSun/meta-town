import createSupabaseClient from '@/utils/createSupabaseClient'
import createUser from './createUser'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('createUser', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('creates a new user', async () => {
    const authId = 'AUTH_ID'

    const data = { displayName: 'John Doe', avatar: 'dog' }

    const supabaseClient = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: authId } } }),
      },
      from: vi.fn().mockReturnValue({
        insert: vi.fn(),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await createUser(data)

    expect(supabaseClient.auth.getUser).toHaveBeenCalled()

    expect(supabaseClient.from).toHaveBeenCalledWith('users')

    expect(supabaseClient.from('users').insert).toHaveBeenCalledWith({
      display_name: data.displayName,
      avatar: data.avatar,
      auth_id: authId,
    })
  })

  test('does not create user when auth is null', async () => {
    const data = { displayName: 'John Doe', avatar: 'dog' }

    const supabaseClient = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
      from: vi.fn(),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await createUser(data)

    expect(supabaseClient.auth.getUser).toHaveBeenCalled()

    expect(supabaseClient.from).not.toHaveBeenCalled()
  })
})
