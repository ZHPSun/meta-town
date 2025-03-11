import createSupabaseClient from '@/utils/createSupabaseClient'

interface Data {
  name: string
  ownerId: number
}

const createSpace = async (data: Data): Promise<void> => {
  const supabaseClient = createSupabaseClient()

  await supabaseClient.from('spaces').insert({
    name: data.name,
    owner_id: data.ownerId,
  })
}

export default createSpace
