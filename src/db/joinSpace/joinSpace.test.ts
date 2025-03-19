import createSupabaseClient from '@/utils/createSupabaseClient'
import joinSpace from './joinSpace'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('joinSpace', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('add user to space', async () => {
    const data = {
      spaceId: 'SPACE_ID',
      userId: 'ID',
    }

    const supabaseClient = {
      from: vi.fn().mockReturnValue({
        insert: vi.fn(),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await joinSpace(data)

    expect(supabaseClient.from).toHaveBeenCalledWith('_users_joined_spaces')
    expect(
      supabaseClient.from('_users_joined_spaces').insert
    ).toHaveBeenCalledWith({
      A: data.spaceId,
      B: data.userId,
    })
  })
})
