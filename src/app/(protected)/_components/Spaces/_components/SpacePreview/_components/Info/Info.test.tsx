import { render, screen } from '@testing-library/react'
import Info from './Info'

describe('Info', () => {
  test('renders name', () => {
    render(<Info name="Test Name" time="Test Time" />)
    expect(screen.getByText('Test Name')).toBeInTheDocument()
  })

  test('renders time', () => {
    render(<Info name="Test Name" time="Test Time" />)
    expect(screen.getByText('Test Time')).toBeInTheDocument()
  })

  test('renders Option button', async () => {
    render(<Info name="Test Name" time="Test Time" />)
    expect(
      await screen.findByRole('button', { name: 'Options' })
    ).toBeInTheDocument()
  })
})
