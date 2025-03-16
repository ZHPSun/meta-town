import { render, screen } from '@testing-library/react'
import useOwnedSpaces from '@/hooks/useOwnedSpaces'
import Spaces from './Spaces'

vi.mock('@/hooks/useOwnedSpaces')
const useOwnedSpacesMock = vi.mocked(useOwnedSpaces)

describe('Spaces', () => {
  afterAll(() => {
    vi.resetAllMocks()
  })

  test('renders Spaces', () => {
    useOwnedSpacesMock.mockReturnValue({
      isLoading: false,
      data: [
        { id: '1', name: 'Space 1' },
        { id: '2', name: 'Space 2' },
      ],
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    render(<Spaces />)

    expect(screen.getByText('Space 1')).toBeInTheDocument()

    expect(screen.getByText('Space 2')).toBeInTheDocument()

    expect(screen.getAllByRole('status')).toHaveLength(2)
  })

  test('renders Loading', () => {
    useOwnedSpacesMock.mockReturnValue({
      isLoading: true,
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    render(<Spaces />)
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })
})
