import { render, screen } from '@testing-library/react'
import SpacePreview from './SpacePreview'

describe('SpacePreview', () => {
  test('renders Participant', () => {
    render(<SpacePreview name="Test Name" spaceId="Space_ID" />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders Info', async () => {
    render(<SpacePreview name="Test Name" spaceId="Space_ID" />)
    expect(
      await screen.findByRole('button', { name: 'Options' })
    ).toBeInTheDocument()
    expect(screen.getByText('Test Name')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Placeholder/i })).toHaveAttribute(
      'href',
      '/spaces/Space_ID'
    )
  })

  test('renders Preview', () => {
    render(<SpacePreview name="Test Name" spaceId="Space_ID" />)
    expect(screen.getByText('Placeholder')).toBeInTheDocument()
  })
})
