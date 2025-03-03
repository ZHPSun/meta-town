import createSupabaseClient from '@/utils/createSupabaseClient'
import getUser from './getUser'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('getUser', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('returns user if user exists', async () => {
    const AUTH_DATA = {
      user: {
        id: 'ID',
      },
    }

    const USER_DATA = {
      id: 'ID',
      displayName: 'John Doe',
      avatar: 'dog',
    }

    const supabaseClient = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: AUTH_DATA }),
      },
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: USER_DATA }),
          }),
        }),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const user = await getUser()

    expect(supabaseClient.from).toHaveBeenCalledWith('users')

    expect(supabaseClient.from('users').select).toHaveBeenCalledWith(
      'id, displayName, avatar'
    )

    expect(supabaseClient.from('users').select().eq).toHaveBeenCalledWith(
      'id',
      AUTH_DATA.user.id
    )

    expect(
      supabaseClient.from('users').select().eq('id', AUTH_DATA.user.id).single
    ).toHaveBeenCalled()

    expect(user).toEqual(USER_DATA)
  })

  test('returns null if auth user does not exist', async () => {
    const supabaseClient = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const user = await getUser()

    expect(user).toBeNull()
  })
})
