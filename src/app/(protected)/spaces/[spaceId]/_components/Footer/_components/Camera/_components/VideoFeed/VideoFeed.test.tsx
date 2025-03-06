import { render, screen } from '@testing-library/react'
import VideoFeed from './VideoFeed'

describe('VideoFeed', () => {
  test('renders video attached to stream', () => {
    const stream = {} as unknown as MediaStream
    render(<VideoFeed stream={stream} />)

    expect(
      screen.getByLabelText<HTMLVideoElement>('Video Feed').srcObject
    ).toBe(stream)
  })
})
