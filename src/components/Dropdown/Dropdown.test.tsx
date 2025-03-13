import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/Button'
import Dropdown, { POSITION } from './Dropdown'

describe('Dropdown', () => {
  test('renders dropdown trigger button', () => {
    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
      >
        Content
      </Dropdown>
    )

    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  test('opens dropdown when trigger is clicked', async () => {
    const user = userEvent.setup()

    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
      >
        Content
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('menu')).toHaveTextContent('Content')
  })

  test('closes the dropdown when trigger is clicked again', async () => {
    const user = userEvent.setup()

    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
      >
        Content
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('menu')).toHaveTextContent('Content')
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  test.each(['bottom-left', 'bottom-right', 'top-left', 'top-right'] as const)(
    'renders dropdown panel with %s position',
    async (position) => {
      const user = userEvent.setup()

      render(
        <Dropdown
          trigger={(toggle, isOpen) => (
            <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
          )}
          position={position}
        >
          Content
        </Dropdown>
      )

      await user.click(screen.getByRole('button', { name: 'Open' }))
      expect(screen.getByRole('menu')).toHaveTextContent('Content')
      expect(screen.getByRole('menu')).toHaveClass(POSITION[position])
    }
  )

  test('closes the dropdown when clicked item inside without interrupt the original click', async () => {
    const user = userEvent.setup()

    const fn = vi.fn()

    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
      >
        <Button onClick={fn}>Logout</Button>
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    await user.click(screen.getByRole('button', { name: 'Logout' }))

    expect(fn).toHaveBeenCalled()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  test('closes the dropdown when clicked item outside without  interrupt the original click', async () => {
    const user = userEvent.setup()

    const fn = vi.fn()

    render(
      <div>
        <Dropdown
          trigger={(toggle, isOpen) => (
            <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
          )}
        >
          Hello world
        </Dropdown>
        <Button onClick={fn}>Login</Button>
      </div>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(fn).toHaveBeenCalled()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
