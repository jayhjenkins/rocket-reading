import { Item, ItemState, Review, ResponseData, Profile, Rating } from '../models'

describe('Data Models', () => {
  it('should create a valid Item', () => {
    const item: Item = {
      id: 'letter_m',
      type: 'letter',
      content: 'm',
      world: 1,
      metadata: {
        phonics_coverage: ['m']
      }
    }
    expect(item.id).toBe('letter_m')
    expect(item.content).toBe('m')
  })

  it('should create a valid ItemState with initial values', () => {
    const now = new Date()
    const itemState: ItemState = {
      item_id: 'letter_m',
      profile_id: 'child_1',
      last_seen: now,
      next_due: now,  // Due immediately for new items
      interval_days: 0,  // Not yet graduated from massed practice
      correct_streak: 0,
      error_count: 0,
      status: 'new',
      learning_threshold_met: false  // New field: hasn't graduated yet
    }
    expect(itemState.status).toBe('new')
    expect(itemState.interval_days).toBe(0)
    expect(itemState.learning_threshold_met).toBe(false)
  })

  it('should create a valid ResponseData', () => {
    const response: ResponseData = {
      raw_response: 'parent_graded',
      response_time_ms: 2500,
      hints_used: 0,
      context: { item_id: 'letter_m' }
    }
    expect(response.hints_used).toBe(0)
  })

  it('should create a valid Review', () => {
    const review: Review = {
      id: 'review_1',
      profile_id: 'child_1',
      item_id: 'letter_m',
      timestamp: new Date(),
      rating: 'correct',
      response_data: {
        raw_response: 'parent_graded',
        response_time_ms: 1200,
        hints_used: 0
      },
      mode: 'co_play'
    }
    expect(review.rating).toBe('correct')
    expect(review.mode).toBe('co_play')
  })

  it('should create a valid Profile', () => {
    const profile: Profile = {
      id: 'child_1',
      name: 'Emma',
      age: 4,
      created_at: new Date(),
      current_world: 1
    }
    expect(profile.name).toBe('Emma')
    expect(profile.age).toBe(4)
  })
})
