import { render, screen } from '@testing-library/react'
import Button from './Button'
import userEvent from '@testing-library/user-event'

describe('Button Component', () => {
  test('renders button with provided children', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('passes the native onClick property to the attribute', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Create Spaces</Button>)

    await userEvent.click(screen.getByText('Create Spaces'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
