import createSupabaseClient from '@/utils/createSupabaseClient'
import upsertSpacePosition from './upsertSpacePosition'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('upsertSpacePosition', () => {
  test('calls supabase upsert with data', async () => {
    const data = {
      userId: 'USER_ID',
      spaceId: 'SPACE_ID',
      coordinates: { x: 3, y: 4, direction: 'N' } as const,
    }

    const supabaseClient = {
      from: vi.fn().mockReturnValue({
        upsert: vi.fn(),
      }),
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    await upsertSpacePosition(data)

    expect(supabaseClient.from).toHaveBeenCalledWith('user_space_positions')
    expect(
      supabaseClient.from('user_space_positions').upsert
    ).toHaveBeenCalledWith(
      {
        user_id: data.userId,
        space_id: data.spaceId,
        x: data.coordinates.x,
        y: data.coordinates.y,
        direction: data.coordinates.direction,
      },
      {
        onConflict: 'user_id,space_id',
      }
    )
  })
})
