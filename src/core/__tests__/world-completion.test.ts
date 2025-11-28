import { SREngine } from '../sr-engine'
import { WorldCompletion } from '../world-completion'
import { WORLD_1_LETTERS } from '../../data/world-1-letters'

describe('WorldCompletion', () => {
  let srEngine: SREngine
  let worldCompletion: WorldCompletion

  beforeEach(async () => {
    srEngine = new SREngine()
    await srEngine.initialize()
    worldCompletion = new WorldCompletion(srEngine)
  })

  it('returns false if no letters have been started', async () => {
    const isComplete = await worldCompletion.checkWorld1Complete('profile_1')
    expect(isComplete).toBe(false)
  })

  it('returns false if letters have <5 reviews', async () => {
    await srEngine.seedItems('profile_1', WORLD_1_LETTERS)

    // Do 3 reviews for letter_m
    for (let i = 0; i < 3; i++) {
      await srEngine.logReview('profile_1', 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })
    }

    const isComplete = await worldCompletion.checkWorld1Complete('profile_1')
    expect(isComplete).toBe(false)
  })

  it('returns false if any letter has <90% accuracy', async () => {
    await srEngine.seedItems('profile_1', WORLD_1_LETTERS)

    // Do 5 correct reviews for most letters
    for (const letter of WORLD_1_LETTERS.slice(0, 11)) {
      for (let i = 0; i < 5; i++) {
        await srEngine.logReview('profile_1', letter.id, 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }
    }

    // But make last letter have 80% accuracy (4 correct, 1 incorrect)
    const lastLetter = WORLD_1_LETTERS[12]
    for (let i = 0; i < 4; i++) {
      await srEngine.logReview('profile_1', lastLetter.id, 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })
    }
    await srEngine.logReview('profile_1', lastLetter.id, 'incorrect', {
      raw_response: 'test',
      response_time_ms: 1000,
      hints_used: 0
    })

    const isComplete = await worldCompletion.checkWorld1Complete('profile_1')
    expect(isComplete).toBe(false)
  })

  it('returns true when all letters have ≥5 reviews and ≥90% accuracy', async () => {
    await srEngine.seedItems('profile_1', WORLD_1_LETTERS)

    // Do 10 correct reviews for all letters
    for (const letter of WORLD_1_LETTERS) {
      for (let i = 0; i < 10; i++) {
        await srEngine.logReview('profile_1', letter.id, 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }
    }

    const isComplete = await worldCompletion.checkWorld1Complete('profile_1')
    expect(isComplete).toBe(true)
  })

  it('calculates progress correctly', async () => {
    await srEngine.seedItems('profile_1', WORLD_1_LETTERS)

    // Do 5 correct reviews for 6 letters
    for (const letter of WORLD_1_LETTERS.slice(0, 6)) {
      for (let i = 0; i < 5; i++) {
        await srEngine.logReview('profile_1', letter.id, 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }
    }

    const progress = await worldCompletion.getWorld1Progress('profile_1')

    expect(progress.lettersStarted).toBe(6)
    expect(progress.lettersMastered).toBe(6)
    expect(progress.overallAccuracy).toBeGreaterThanOrEqual(0.9)
  })
})
