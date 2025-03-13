import { render, screen } from '@testing-library/react'
import Content from './Content'

describe('Content', () => {
  test('renders children', () => {
    render(<Content>Message</Content>)

    expect(screen.getByText('Message')).toBeInTheDocument()
  })
})
