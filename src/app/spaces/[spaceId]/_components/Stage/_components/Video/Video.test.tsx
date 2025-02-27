import { render, screen } from '@testing-library/react'
import Video from './Video'

describe('Video', () => {
  test('renders UserInfo', () => {
    render(<Video />)

    expect(screen.getByText('Jack')).toBeInTheDocument()
  })

  test('renders placeholder', () => {
    render(<Video />)

    expect(screen.getByText('Placeholder')).toBeInTheDocument()
  })
})
