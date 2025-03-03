import { redirect } from 'next/navigation'
import createSupabaseClient from '@/utils/createSupabaseClient'

interface Data {
  email: string
  password: string
}

const signUp = async ({ email, password }: Data): Promise<void> => {
  const supabaseClient = createSupabaseClient()

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return redirect('/')
}

export default signUp
