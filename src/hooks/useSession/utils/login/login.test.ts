import { redirect } from 'next/navigation'
import login from './login'

vi.mock('next/navigation')

describe('login', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('redirects to /authentication/login', () => {
    login()

    expect(redirect).toHaveBeenCalledWith('/authentication/login')
  })
})
