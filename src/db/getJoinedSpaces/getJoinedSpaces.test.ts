import createSupabaseClient from '@/utils/createSupabaseClient'
import getJoinedSpaces from './getJoinedSpaces'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('getJoinedSpaces', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('return joined spaces', async () => {
    const userId = 'ID'

    const data = [{ id: 'Space_ID', name: 'Space Name' }]

    const supabaseClient = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({ data }),
        }),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const joinedSpaces = await getJoinedSpaces(userId)

    expect(supabaseClient.from).toHaveBeenCalledWith('spaces')

    expect(supabaseClient.from('spaces').select).toHaveBeenCalledWith(
      `
    id, name,
    _users_joined_spaces!inner (B)
  `
    )

    expect(supabaseClient.from('spaces').select().eq).toHaveBeenCalledWith(
      '_users_joined_spaces.B',
      userId
    )

    expect(joinedSpaces).toEqual(data)
  })

  test('return null if no joined spaces found', async () => {
    const userId = 'ID'

    const supabaseClient = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({ data: null }),
        }),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const joinedSpaces = await getJoinedSpaces(userId)

    expect(supabaseClient.from).toHaveBeenCalledWith('spaces')

    expect(supabaseClient.from('spaces').select).toHaveBeenCalledWith(
      `
    id, name,
    _users_joined_spaces!inner (B)
  `
    )

    expect(supabaseClient.from('spaces').select().eq).toHaveBeenCalledWith(
      '_users_joined_spaces.B',
      userId
    )

    expect(joinedSpaces).toEqual([])
  })
})
