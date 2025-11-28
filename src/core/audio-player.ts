export class AudioPlayer {
  private audioElements: Map<string, HTMLAudioElement> = new Map()

  constructor() {
    // Preload all letter sounds for better performance
    this.preloadLetterSounds()
  }

  private preloadLetterSounds(): void {
    const letters = ['m', 'a', 't', 's', 'i', 'p', 'n', 'o', 'e', 'r', 'd', 'h', 'l']

    letters.forEach(letter => {
      const audio = new Audio()

      // Browser will choose best supported format
      // Most browsers prefer MP3, Firefox falls back to OGG
      // Use relative path from src/assets/audio/
      audio.src = `/src/assets/audio/letter_${letter}.mp3`

      // Preload but don't play yet
      audio.preload = 'auto'

      this.audioElements.set(letter, audio)
    })
  }

  async playLetterSound(letter: string): Promise<void> {
    const audio = this.audioElements.get(letter)

    if (!audio) {
      console.warn(`Audio file not found for letter: ${letter}`)
      return
    }

    // Reset to beginning if already played
    audio.currentTime = 0

    try {
      // Ensure audio is loaded before playing (skip in test environment)
      // Skip loading check if readyState is undefined (test environment)
      if (audio.readyState !== undefined && audio.readyState < 2) {
        // Wait for audio to be ready, with timeout to prevent hanging in edge cases
        await Promise.race([
          new Promise<void>((resolve) => {
            const onCanPlay = () => {
              audio.removeEventListener('canplay', onCanPlay)
              resolve()
            }
            audio.addEventListener('canplay', onCanPlay)
            // Also trigger load in case preload didn't work
            audio.load()
          }),
          // Timeout after 5 seconds
          new Promise<void>((resolve) => setTimeout(resolve, 5000))
        ])
      }

      await audio.play()

      // Wait for audio to finish (or resolve immediately in test environment)
      return new Promise<void>((resolve) => {
        // Handle both real browser and test environment
        if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
          audio.onended = () => resolve()
        } else {
          // In test environment, resolve immediately
          resolve()
        }
      })
    } catch (error) {
      console.error(`Failed to play audio for letter ${letter}:`, error)
    }
  }

  async playFeedbackSound(type: 'correct' | 'incorrect' | 'hint'): Promise<void> {
    // Placeholder for feedback sounds (to be added in future slices)
    console.log(`Playing ${type} feedback sound`)
  }

  // Clean up resources
  dispose(): void {
    this.audioElements.forEach(audio => {
      audio.pause()
      audio.src = ''
    })
    this.audioElements.clear()
  }
}
