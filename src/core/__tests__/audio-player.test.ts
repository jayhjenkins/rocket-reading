import { AudioPlayer } from '../audio-player'

// Mock HTMLAudioElement
global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  preload: '',
  src: '',
  currentTime: 0,
  onended: null
})) as any

describe('AudioPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('can be instantiated', () => {
    const player = new AudioPlayer()
    expect(player).toBeDefined()
  })

  it('preloads all World 1 letter sounds', () => {
    const player = new AudioPlayer()

    // Verify Audio constructor was called for each letter
    expect(global.Audio).toHaveBeenCalledTimes(13)
  })

  it('plays letter sound when requested', async () => {
    const player = new AudioPlayer()

    // Should complete without throwing
    await expect(player.playLetterSound('m')).resolves.not.toThrow()
  })

  it('handles missing audio files gracefully', async () => {
    const player = new AudioPlayer()

    // Should not throw
    await expect(player.playLetterSound('z')).resolves.not.toThrow()
  })

  it('disposes resources correctly', () => {
    const player = new AudioPlayer()

    // Should not throw
    expect(() => player.dispose()).not.toThrow()
  })
})
