import { SREngine } from './sr-engine'
import { WORLD_1_LETTERS } from '../data/world-1-letters'

export class WorldCompletion {
  private srEngine: SREngine

  constructor(srEngine: SREngine) {
    this.srEngine = srEngine
  }

  async checkWorld1Complete(profileId: string): Promise<boolean> {
    const world1LetterIds = WORLD_1_LETTERS.map(l => l.id)

    let totalCorrect = 0
    let totalReviews = 0

    for (const letterId of world1LetterIds) {
      try {
        const state = await this.srEngine.getItemState(profileId, letterId)

        // Calculate accuracy for this letter
        const totalAttempts = state.correct_streak + state.error_count
        if (totalAttempts === 0) return false // Not started yet

        const accuracy = state.correct_streak / totalAttempts

        // Need at least 5 reviews per letter AND ≥90% accuracy
        if (totalAttempts < 5 || accuracy < 0.9) {
          return false
        }

        totalCorrect += state.correct_streak
        totalReviews += totalAttempts
      } catch (error) {
        // Item not yet seeded, not complete
        return false
      }
    }

    // Overall accuracy across all World 1 letters must be ≥90%
    const overallAccuracy = totalCorrect / totalReviews
    return overallAccuracy >= 0.9
  }

  async getWorld1Progress(profileId: string): Promise<{
    lettersStarted: number
    lettersMastered: number
    overallAccuracy: number
  }> {
    const world1LetterIds = WORLD_1_LETTERS.map(l => l.id)

    let lettersStarted = 0
    let lettersMastered = 0
    let totalCorrect = 0
    let totalReviews = 0

    for (const letterId of world1LetterIds) {
      try {
        const state = await this.srEngine.getItemState(profileId, letterId)

        const totalAttempts = state.correct_streak + state.error_count
        if (totalAttempts > 0) {
          lettersStarted++

          const accuracy = state.correct_streak / totalAttempts
          if (totalAttempts >= 5 && accuracy >= 0.9) {
            lettersMastered++
          }

          totalCorrect += state.correct_streak
          totalReviews += totalAttempts
        }
      } catch (error) {
        // Item not yet seeded, skip
        continue
      }
    }

    const overallAccuracy = totalReviews > 0 ? totalCorrect / totalReviews : 0

    return {
      lettersStarted,
      lettersMastered,
      overallAccuracy
    }
  }
}
