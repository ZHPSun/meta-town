import createSupabaseClient from '@/utils/createSupabaseClient'
import CreateSpace from './createSpace'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('CreateSpace', () => {
  test('creates a new space', async () => {
    const data = { name: 'Space', ownerId: 'OWNER_ID' }

    const supabaseClient = {
      from: vi.fn().mockReturnValue({
        insert: vi.fn(),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>
    createSupabaseClientMock.mockReturnValue(supabaseClient)
    await CreateSpace(data)

    expect(supabaseClient.from).toHaveBeenCalledWith('spaces')
    expect(supabaseClient.from('spaces').insert).toHaveBeenCalledWith({
      name: data.name,
      owner_id: data.ownerId,
    })
  })
})
