import createSupabaseClient from '@/utils/createSupabaseClient'
import createUser from './createUser'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('createUser', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('creates a new user', async () => {
    const USER_DATA = {
      id: 'ID',
      displayName: 'John Doe',
      avatar: 'dog',
    }

    const data = { displayName: 'John Doe', avatar: 'dog' }

    const supabaseClient = {
      from: vi.fn().mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: USER_DATA }),
          }),
        }),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const user = await createUser(data)

    expect(supabaseClient.from).toHaveBeenCalledWith('users')

    expect(supabaseClient.from('users').insert).toHaveBeenCalledWith(data)

    expect(
      supabaseClient.from('users').insert(data).select
    ).toHaveBeenCalledWith('id, displayName, avatar')

    expect(
      supabaseClient.from('users').insert(data).select().single
    ).toHaveBeenCalled()

    expect(user).toEqual(USER_DATA)
  })
})
