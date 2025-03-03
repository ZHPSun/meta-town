import { render, screen, waitFor } from '@testing-library/react'
import SpacePreview from './SpacePreview'

describe('SpacePreview', () => {
  test('renders Participant', () => {
    render(<SpacePreview />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders Info', async () => {
    render(<SpacePreview />)
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Options' })
      ).toBeInTheDocument()
    )
  })

  test('renders Preview', () => {
    render(<SpacePreview />)
    expect(screen.getByText('Placeholder')).toBeInTheDocument()
  })
})
