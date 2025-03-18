import createSupabaseClient from '@/utils/createSupabaseClient'
import getOnlineUsers from './getOnlineUsers'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('getOnlineUsers', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('returns users', async () => {
    const SPACE_ID = 'SPACE_ID'

    const data = [
      {
        id: 'ID',
        display_name: 'Display Name',
        avatar: 'Avatar',
        user_space_presences: {
          space_id: SPACE_ID,
          status: 'ONLINE',
        },
      },
    ]

    const supabaseClient = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          match: vi.fn().mockReturnValue({ data }),
        }),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const users = await getOnlineUsers(['online-users', SPACE_ID])

    expect(supabaseClient.from).toHaveBeenCalledWith('users')

    expect(supabaseClient.from('users').select).toHaveBeenCalledWith(
      `
      id,
      display_name,
      avatar,
      user_space_presences!inner (
        space_id,
        status
      )
      `
    )

    expect(supabaseClient.from('users').select().match).toHaveBeenCalledWith({
      'user_space_presences.space_id': SPACE_ID,
      'user_space_presences.status': 'ONLINE',
    })

    expect(users).toEqual([
      {
        id: 'ID',
        displayName: 'Display Name',
        avatar: 'Avatar',
      },
    ])
  })

  test('returns null if users not found', async () => {
    const SPACE_ID = 'SPACE_ID'

    const supabaseClient = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          match: vi.fn().mockReturnValue({ data: null }),
        }),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const users = await getOnlineUsers(['online-users', SPACE_ID])

    expect(supabaseClient.from).toHaveBeenCalledWith('users')

    expect(supabaseClient.from('users').select).toHaveBeenCalledWith(
      `
      id,
      display_name,
      avatar,
      user_space_presences!inner (
        space_id,
        status
      )
      `
    )

    expect(supabaseClient.from('users').select().match).toHaveBeenCalledWith({
      'user_space_presences.space_id': SPACE_ID,
      'user_space_presences.status': 'ONLINE',
    })

    expect(users).toEqual(null)
  })
})
