import { render, screen } from '@testing-library/react'
import LastVisited from './LastVisited'

describe('LastVisited', () => {
  test('renders Last visited button', () => {
    render(<LastVisited />)
    expect(
      screen.getByRole('button', { name: 'Last visited' })
    ).toBeInTheDocument()
  })
})
