import { SREngine } from '../../core/sr-engine'
import { WorldCompletion } from '../../core/world-completion'
import { WORLD_1_LETTERS } from '../../data/world-1-letters'

describe('Slice 2 Integration: Full Session with 12 Letters', () => {
  it('completes a session with 12 letters and mixed game types', async () => {
    const srEngine = new SREngine()
    await srEngine.initialize()

    const profileId = 'test_profile'
    await srEngine.seedItems(profileId, WORLD_1_LETTERS)

    // Get due items
    const dueItems = await srEngine.getDueItems(profileId, new Date())
    expect(dueItems.length).toBe(13) // All 13 letters are new

    // Simulate session with 10 items
    for (let i = 0; i < 10; i++) {
      const item = dueItems[i]
      await srEngine.logReview(profileId, item.id, 'correct', {
        raw_response: 'test',
        response_time_ms: 1500,
        hints_used: 0
      })
    }

    // Verify reviews logged
    const firstReview = await srEngine.getLastReview(profileId, dueItems[0].id)
    expect(firstReview).toBeDefined()
    expect(firstReview?.rating).toBe('correct')
  })

  it('tracks progress toward World 1 completion', async () => {
    const srEngine = new SREngine()
    await srEngine.initialize()

    const profileId = 'test_profile_2'
    await srEngine.seedItems(profileId, WORLD_1_LETTERS)

    const worldCompletion = new WorldCompletion(srEngine)

    // Do 5 correct reviews for 6 letters
    for (const letter of WORLD_1_LETTERS.slice(0, 6)) {
      for (let i = 0; i < 5; i++) {
        await srEngine.logReview(profileId, letter.id, 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }
    }

    const progress = await worldCompletion.getWorld1Progress(profileId)
    expect(progress.lettersStarted).toBe(6)
    expect(progress.lettersMastered).toBe(6)

    const isComplete = await worldCompletion.checkWorld1Complete(profileId)
    expect(isComplete).toBe(false) // Only 6/13 letters mastered
  })

  it('validates SR engine handles 20+ reviews in a session', async () => {
    const srEngine = new SREngine()
    await srEngine.initialize()

    const profileId = 'test_profile_3'
    await srEngine.seedItems(profileId, WORLD_1_LETTERS)

    // Simulate multiple rounds with same items (massed practice)
    const dueItems = await srEngine.getDueItems(profileId, new Date())

    // Do 3 rounds of 10 items each (30 total reviews)
    for (let round = 0; round < 3; round++) {
      for (let i = 0; i < 10; i++) {
        const item = dueItems[i]
        await srEngine.logReview(profileId, item.id, 'correct', {
          raw_response: `round_${round}_item_${i}`,
          response_time_ms: 1000 + (round * 100),
          hints_used: 0
        })
      }
    }

    // Verify reviews are logged correctly
    const firstItemState = await srEngine.getItemState(profileId, dueItems[0].id)
    expect(firstItemState.correct_streak).toBe(3) // 3 correct in a row
    expect(firstItemState.interval_days).toBe(1) // Graduated to spaced practice
  })

  it('validates response logging consistency across game types', async () => {
    const srEngine = new SREngine()
    await srEngine.initialize()

    const profileId = 'test_profile_4'
    await srEngine.seedItems(profileId, WORLD_1_LETTERS.slice(0, 2))

    // Simulate letter_sound game type response
    await srEngine.logReview(profileId, 'letter_m', 'correct', {
      raw_response: 'parent_graded',
      response_time_ms: 2000,
      hints_used: 0,
      context: { game_type: 'letter_sound' }
    })

    // Simulate sound_letter game type response
    await srEngine.logReview(profileId, 'letter_a', 'correct', {
      raw_response: 'tapped_letter_a',
      response_time_ms: 1500,
      hints_used: 0,
      context: { game_type: 'sound_letter', options: ['a', 'm', 't', 's'] }
    })

    // Verify both types logged correctly
    const review1 = await srEngine.getLastReview(profileId, 'letter_m')
    const review2 = await srEngine.getLastReview(profileId, 'letter_a')

    expect(review1?.response_data.raw_response).toBe('parent_graded')
    expect(review2?.response_data.raw_response).toBe('tapped_letter_a')
    expect(review2?.response_data.context).toHaveProperty('options')
  })
})
