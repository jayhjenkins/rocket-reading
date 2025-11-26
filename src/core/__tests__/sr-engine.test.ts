import { SREngine } from '../sr-engine'
import { Item, Rating } from '../../types'

describe('SR Engine', () => {
  let engine: SREngine
  const testProfile = 'test_child_1'

  const testItems: Item[] = [
    { id: 'letter_m', type: 'letter', content: 'm', world: 1, metadata: { phonics_coverage: ['m'] } },
    { id: 'letter_a', type: 'letter', content: 'a', world: 1, metadata: { phonics_coverage: ['a'] } },
    { id: 'letter_t', type: 'letter', content: 't', world: 1, metadata: { phonics_coverage: ['t'] } },
  ]

  beforeEach(async () => {
    // Clean up previous database
    try {
      indexedDB.deleteDatabase('rocketreading_db')
    } catch (e) {
      // Ignore errors
      console.log('Delete database error (ignoring):', e)
    }

    try {
      engine = new SREngine()
      await engine.initialize()
    } catch (error) {
      console.error('beforeEach error:', error)
      throw error
    }
  })

  afterEach(() => {
    // Close database connection
    if (engine) {
      const db = (engine as any).db
      if (db) {
        db.close()
      }
    }
  })

  describe('seedItems', () => {
    it('should seed initial items', async () => {
      await engine.seedItems(testProfile, testItems)
      const items = await engine.getAllItems(testProfile)
      expect(items.length).toBe(3)
    })
  })

  describe('getDueItems', () => {
    it('should return items due today', async () => {
      await engine.seedItems(testProfile, testItems)
      const today = new Date()
      const dueItems = await engine.getDueItems(testProfile, today)
      expect(dueItems.length).toBe(3) // All new items are due
    })

    it('should not return items not yet due', async () => {
      await engine.seedItems(testProfile, testItems)

      // Graduate letter_m (3 correct reviews → interval = 1 day)
      for (let i = 0; i < 3; i++) {
        await engine.logReview(testProfile, 'letter_m', 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }

      // Check today - letter_m should NOT be due (next_due = today + 1 day)
      const today = new Date()
      const dueItems = await engine.getDueItems(testProfile, today)

      // letter_m should not be due yet (interval = 1 day, so due tomorrow)
      const mItemDue = dueItems.find((i: Item) => i.id === 'letter_m')
      expect(mItemDue).toBeUndefined()
    })
  })

  describe('logReview', () => {
    it('should keep item in massed practice until 3 correct in a row', async () => {
      try {
        await engine.seedItems(testProfile, testItems)

        // First correct → still in massed practice (interval = 0)
        await engine.logReview(testProfile, 'letter_m', 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })

        let state = await engine.getItemState(testProfile, 'letter_m')
        expect(state.interval_days).toBe(0)  // Show again in same session
        expect(state.correct_streak).toBe(1)
        expect(state.learning_threshold_met).toBe(false)

        // Second correct → still in massed practice
        await engine.logReview(testProfile, 'letter_m', 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })

        state = await engine.getItemState(testProfile, 'letter_m')
        expect(state.interval_days).toBe(0)  // Show again in same session
        expect(state.correct_streak).toBe(2)
        expect(state.learning_threshold_met).toBe(false)

        // Third correct → GRADUATED to spacing!
        await engine.logReview(testProfile, 'letter_m', 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })

        state = await engine.getItemState(testProfile, 'letter_m')
        expect(state.interval_days).toBe(1)  // Now 1-day interval
        expect(state.correct_streak).toBe(3)
        expect(state.learning_threshold_met).toBe(true)
        expect(state.status).toBe('maturing')
      } catch (error) {
        console.error('Test error:', error)
        throw error
      }
    })

    it('should double interval after graduation', async () => {
      await engine.seedItems(testProfile, testItems)

      // Graduate item (3 correct in a row)
      for (let i = 0; i < 3; i++) {
        await engine.logReview(testProfile, 'letter_m', 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }

      let state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(1)
      expect(state.learning_threshold_met).toBe(true)

      // Move next_due to today
      state.next_due = new Date()
      await engine.updateItemState(testProfile, state)

      // Fourth correct → double to 2 days
      await engine.logReview(testProfile, 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(2)  // 1 * 2 = 2
    })

    it('should reset to massed practice on incorrect rating', async () => {
      await engine.seedItems(testProfile, testItems)

      // Graduate item
      for (let i = 0; i < 3; i++) {
        await engine.logReview(testProfile, 'letter_m', 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }

      // Incorrect → reset to massed practice
      await engine.logReview(testProfile, 'letter_m', 'incorrect', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      const state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(0)  // Back to massed practice
      expect(state.correct_streak).toBe(0)
      expect(state.learning_threshold_met).toBe(false)  // Reset flag
      expect(state.status).toBe('learning')
      expect(state.error_count).toBe(1)
    })

    it('should handle needed_help rating during massed practice', async () => {
      await engine.seedItems(testProfile, testItems)

      // First correct
      await engine.logReview(testProfile, 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      let state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.correct_streak).toBe(1)

      // Needed help → reduce streak, keep in massed practice
      await engine.logReview(testProfile, 'letter_m', 'needed_help', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 1
      })

      state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(0)  // Still in massed practice
      expect(state.correct_streak).toBe(0)  // Streak reduced
      expect(state.learning_threshold_met).toBe(false)
    })

    it('should save response data with review', async () => {
      await engine.seedItems(testProfile, testItems)

      const responseData = {
        raw_response: 'parent_graded_mmm',
        response_time_ms: 2300,
        hints_used: 0,
        context: { item_id: 'letter_m' }
      }

      await engine.logReview(testProfile, 'letter_m', 'correct', responseData)

      const review = await engine.getLastReview(testProfile, 'letter_m')
      expect(review?.response_data).toEqual(responseData)
    })
  })

  describe('getItemState', () => {
    it('should return item state', async () => {
      await engine.seedItems(testProfile, testItems)
      const state = await engine.getItemState(testProfile, 'letter_m')

      expect(state).toBeDefined()
      expect(state.item_id).toBe('letter_m')
      expect(state.profile_id).toBe(testProfile)
      expect(state.status).toBe('new')
    })
  })
})
