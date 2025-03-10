import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

const onCloseMock = vi.fn()

describe('Modal', () => {
  test('renders modal with provided children', () => {
    render(
      <Modal onClose={onCloseMock} title="Test Title">
        Modal Content
      </Modal>
    )

    expect(
      screen.getByRole('heading', { name: 'Test Title' })
    ).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  test('renders overlay', () => {
    render(
      <Modal onClose={onCloseMock} title="Test Title">
        Test
      </Modal>
    )

    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  test('renders Header', () => {
    render(
      <Modal onClose={onCloseMock} title="Test Title">
        Test
      </Modal>
    )

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <Modal onClose={onCloseMock} title="Test Title">
        Test
      </Modal>
    )

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onCloseMock).toHaveBeenCalled()
  })
})
