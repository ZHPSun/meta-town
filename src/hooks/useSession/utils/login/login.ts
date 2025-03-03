import { redirect } from 'next/navigation'

const login = (): never => redirect('/authentication/login')

export default login
