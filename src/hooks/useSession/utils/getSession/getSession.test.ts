import createSupabaseClient from '@/utils/createSupabaseClient'
import getSession from './getSession'

vi.mock('@/utils/createSupabaseClient')
const createSupabaseClientMock = vi.mocked(createSupabaseClient)

describe('getSession', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('returns true if session exists', async () => {
    const supabaseClient = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: {} } }),
      },
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const session = await getSession()

    expect(session).toBe(true)
  })

  test('returns false if session does not exist', async () => {
    const supabaseClient = {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      },
    } as unknown as ReturnType<typeof createSupabaseClient>

    createSupabaseClientMock.mockReturnValue(supabaseClient)

    const session = await getSession()

    expect(session).toBe(false)
  })
})
