import { render, screen, waitFor } from '@testing-library/react'
import MeetingView, { GRID } from './MeetingView'

describe('MeetingView', () => {
  test('renders region', () => {
    render(<MeetingView participantCount={20} />)

    expect(
      screen.getByRole('region', { name: 'Meeting View' })
    ).toBeInTheDocument()
  })

  test('renders Videos', () => {
    render(<MeetingView participantCount={20} />)

    expect(screen.getAllByText('Placeholder').length).toBe(20)
  })

  test('renders left button', async () => {
    render(<MeetingView participantCount={20} />)

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Previous' })
      ).toBeInTheDocument()
    )
  })

  test('renders right button', async () => {
    render(<MeetingView participantCount={20} />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
    )
  })

  test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const)(
    'renders MeetingView with %s participants',
    (count) => {
      render(<MeetingView participantCount={count} />)

      expect(screen.getByRole('grid', { name: 'Grid' })).toHaveClass(
        GRID[Math.min(count - 1, GRID.length - 1)]
      )
    }
  )
})
