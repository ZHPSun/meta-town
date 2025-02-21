import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
  test('renders input', () => {
    render(<Input />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('renders prefix', async () => {
    render(<Input prefix={{ name: 'search', label: 'Search' }} />)

    await waitFor(() =>
      expect(screen.getByLabelText('Search')).toBeInTheDocument()
    )
  })

  test('passes the native value and onChange properties to the attributes', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Input onChange={onChange} />)

    await user.type(screen.getByRole('textbox'), 'Hello, World!')
    expect(screen.getByRole('textbox')).toHaveValue('Hello, World!')
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'Hello, World!',
        }),
      })
    )
  })
})
