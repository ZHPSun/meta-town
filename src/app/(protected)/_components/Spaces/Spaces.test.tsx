import { render, screen } from '@testing-library/react'
import useSpaces from '@/hooks/useSpaces'
import Spaces from './Spaces'

vi.mock('@/hooks/useSpaces')
const useSpacesMock = vi.mocked(useSpaces)

describe('Spaces', () => {
  afterAll(() => {
    vi.resetAllMocks()
  })

  test('renders Spaces', () => {
    useSpacesMock.mockReturnValue({
      isLoading: false,
      data: [
        { id: '1', name: 'Space 1' },
        { id: '2', name: 'Space 2' },
      ],
    } as unknown as ReturnType<typeof useSpaces>)

    render(<Spaces />)

    expect(screen.getByText('Space 1')).toBeInTheDocument()

    expect(screen.getByText('Space 2')).toBeInTheDocument()

    expect(screen.getAllByRole('status')).toHaveLength(2)
  })

  test('renders Loading', () => {
    useSpacesMock.mockReturnValue({
      isLoading: true,
    } as unknown as ReturnType<typeof useSpaces>)

    render(<Spaces />)
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })
})
