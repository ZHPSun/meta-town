import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT as BUTTON_VARIANT } from '@/components/Button'
import AvatarPicker, { ANIMALS } from './AvatarPicker'

describe('AvatarPicker', () => {
  test('selects default color gray', () => {
    render(<AvatarPicker />)

    expect(
      within(screen.getByRole('button', { name: 'gray' })).getByLabelText(
        'gray Selected'
      )
    ).toBeInTheDocument()
  })

  test('selects color on click', async () => {
    const user = userEvent.setup()

    render(<AvatarPicker />)

    await user.click(await screen.findByRole('button', { name: 'pink' }))

    expect(
      within(screen.getByRole('button', { name: 'pink' })).getByLabelText(
        'pink Selected'
      )
    ).toBeInTheDocument()
  })

  test('unselects color when select another color', async () => {
    const user = userEvent.setup()

    render(<AvatarPicker />)

    await user.click(await screen.findByRole('button', { name: 'pink' }))

    await user.click(await screen.findByRole('button', { name: 'blue' }))

    expect(
      within(screen.getByRole('button', { name: 'pink' })).getByLabelText(
        'pink Option'
      )
    ).toBeInTheDocument()

    expect(
      within(screen.getByRole('button', { name: 'blue' })).getByLabelText(
        'blue Selected'
      )
    ).toBeInTheDocument()
  })

  test.each(ANIMALS)('renders %s animal IconButton', async (animal) => {
    render(<AvatarPicker />)

    expect(
      await screen.findByRole('button', { name: animal })
    ).toBeInTheDocument()
  })

  test('renders naked variant for unselected animal', async () => {
    render(<AvatarPicker />)

    expect(await screen.findByRole('button', { name: 'pink' })).toHaveClass(
      BUTTON_VARIANT.naked
    )
  })

  test('renders secondary variant for selected animal', async () => {
    const user = userEvent.setup()

    render(<AvatarPicker />)

    await user.click(await screen.findByRole('button', { name: 'bird' }))

    expect(await screen.findByRole('button', { name: 'bird' })).toHaveClass(
      BUTTON_VARIANT.secondary
    )
  })

  test('unselects animal when select another animal', async () => {
    const user = userEvent.setup()

    render(<AvatarPicker />)

    await user.click(await screen.findByRole('button', { name: 'bird' }))

    await waitFor(() => user.click(screen.getByRole('button', { name: 'cat' })))

    expect(await screen.findByRole('button', { name: 'bird' })).toHaveClass(
      BUTTON_VARIANT.naked
    )

    expect(await screen.findByRole('button', { name: 'cat' })).toHaveClass(
      BUTTON_VARIANT.secondary
    )
  })
})
