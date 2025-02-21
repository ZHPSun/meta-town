import { render, screen } from '@testing-library/react'
import LastVisited from './LastVisited'

describe('LastVisited', () => {
  test('renders Last Visited button', () => {
    render(<LastVisited />)
    expect(
      screen.getByRole('button', { name: 'Last Visited' })
    ).toBeInTheDocument()
  })
})
