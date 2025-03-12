import createSupabaseClient from '@/utils/createSupabaseClient'
import { Coordinates } from '../../../../_components/Placement'

interface Data {
  userId: number
  spaceId: number
  coordinates: Coordinates
}

const updateSpacePosition = async (data: Data): Promise<void> => {
  const supabaseClient = createSupabaseClient()

  const { coordinates } = data

  await supabaseClient.from('user_space_positions').upsert(
    {
      user_id: data.userId,
      space_id: data.spaceId,
      x: coordinates.x,
      y: coordinates.y,
      direction: coordinates.direction,
    },
    {
      onConflict: 'user_id,space_id',
    }
  )
}

export default updateSpacePosition
