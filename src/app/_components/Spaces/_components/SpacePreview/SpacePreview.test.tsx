import { render, screen } from '@testing-library/react'
import SpacePreview from './SpacePreview'

describe('SpacePreview', () => {
  test('renders Participant', () => {
    render(<SpacePreview />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders Info', () => {
    render(<SpacePreview />)
    expect(screen.getByRole('button', { name: 'Options' })).toBeInTheDocument()
  })

  test('renders Preview', () => {
    render(<SpacePreview />)
    expect(screen.getByText('Placeholder')).toBeInTheDocument()
  })
})
