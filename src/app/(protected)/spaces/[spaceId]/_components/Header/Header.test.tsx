import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT } from '@/components/Button'
import Header from './Header'

describe('Header', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders copy link button', async () => {
    render(<Header onMeetingViewClick={vi.fn()} onEditSpace={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Copy invite link' })
    ).toBeInTheDocument()
  })

  test('renders lock meeting area button', async () => {
    render(<Header onMeetingViewClick={vi.fn()} onEditSpace={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Lock meeting area' })
    ).toBeInTheDocument()
  })

  test('renders all-hands button', () => {
    render(<Header onMeetingViewClick={vi.fn()} onEditSpace={vi.fn()} />)

    expect(
      screen.getByRole('button', { name: 'All-Hands' })
    ).toBeInTheDocument()
  })

  test('renders meeting view button', () => {
    render(<Header onMeetingViewClick={vi.fn()} onEditSpace={vi.fn()} />)

    expect(
      screen.getByRole('button', { name: 'Meeting view' })
    ).toBeInTheDocument()
  })

  test('calls onMeetingViewClick when meeting view button is clicked', async () => {
    const onMeetingViewClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Header onMeetingViewClick={onMeetingViewClick} onEditSpace={vi.fn()} />
    )
    await user.click(screen.getByRole('button', { name: 'Meeting view' }))
    expect(onMeetingViewClick).toHaveBeenCalled()
  })

  test('renders meeting view button with naked variant without isShowMeeting', async () => {
    render(<Header onMeetingViewClick={vi.fn()} onEditSpace={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Meeting view' })
    ).toHaveClass(VARIANT.naked)
  })

  test('renders meeting view button with secondary variant with isShowMeeting', async () => {
    const user = userEvent.setup()

    render(
      <Header
        onMeetingViewClick={vi.fn()}
        onEditSpace={vi.fn()}
        isShowMeeting
      />
    )

    await user.click(screen.getByRole('button', { name: 'Meeting view' }))

    expect(
      await screen.findByRole('button', { name: 'Meeting view' })
    ).toHaveClass(VARIANT.secondary)
  })

  test('calls onEditSpace when edit space button is clicked', async () => {
    const onEditSpace = vi.fn()

    const user = userEvent.setup()

    render(<Header onMeetingViewClick={vi.fn()} onEditSpace={onEditSpace} />)

    expect(
      await screen.findByRole('button', { name: 'More options' })
    ).toBeInTheDocument()

    await user.click(
      await screen.findByRole('button', { name: 'More options' })
    )

    expect(
      screen.getByRole('button', { name: 'Edit space' })
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Edit space' }))

    expect(onEditSpace).toHaveBeenCalled()
  })
})
