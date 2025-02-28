import { redirect } from 'next/navigation'
import supabaseClient from '@/utils/createSupabaseClient'

interface Data {
  email: string
  password: string
}

const login = async ({ email, password }: Data): Promise<void> => {
  const { error } = await supabaseClient().auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return redirect('/')
}

export default login
