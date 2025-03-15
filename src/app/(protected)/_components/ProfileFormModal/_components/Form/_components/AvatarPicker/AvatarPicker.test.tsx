import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT as BUTTON_VARIANT } from '@/components/Button'
import AvatarPicker from './AvatarPicker'

describe('AvatarPicker', () => {
  test('selects the color with provided value', () => {
    const value = { animal: 'dog', color: 'gray' }

    render(<AvatarPicker onChange={vi.fn()} value={value} />)

    expect(
      within(screen.getByRole('button', { name: value.color })).getByLabelText(
        `${value.color} Selected`
      )
    ).toBeInTheDocument()
  })

  test('selects the animal with provided value', async () => {
    const value = { animal: 'dog', color: 'gray' }

    render(<AvatarPicker onChange={vi.fn()} value={value} />)

    expect(await screen.findByRole('button', { name: 'dog' })).toHaveClass(
      BUTTON_VARIANT.secondary
    )
  })

  test('selects color on click', async () => {
    const user = userEvent.setup()
    const value = { animal: '', color: '' }
    const onChange = vi.fn()

    render(<AvatarPicker onChange={onChange} value={value} />)

    await user.click(await screen.findByRole('button', { name: 'blue' }))

    expect(onChange).toHaveBeenCalledWith({ animal: '', color: 'blue' })
  })

  test('selects animal on click', async () => {
    const user = userEvent.setup()
    const value = { animal: '', color: '' }
    const onChange = vi.fn()

    render(<AvatarPicker onChange={onChange} value={value} />)

    await user.click(await screen.findByRole('button', { name: 'bird' }))

    expect(onChange).toHaveBeenCalledWith({ animal: 'bird', color: '' })
  })
})
