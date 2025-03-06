import { render, screen } from '@testing-library/react'
import Camera from './Camera'

describe('Camera', () => {
  test('renders Video Feed with valid stream', () => {
    render(<Camera stream={{} as unknown as MediaStream} />)

    expect(screen.getByLabelText('Video Feed')).toBeInTheDocument()
  })

  test('does not render Video Feed with null stream', () => {
    render(<Camera stream={null} />)

    expect(screen.queryByLabelText('Video Feed')).not.toBeInTheDocument()
  })
})
