// Item Types
export type ItemType = 'letter' | 'word' | 'sentence' | 'tricky_word'
export type ItemStatus = 'new' | 'learning' | 'maturing' | 'mastered' | 'maintenance'
export type Rating = 'correct' | 'needed_help' | 'incorrect'
export type SessionMode = 'co_play' | 'adventure'

// Core Data Models
export interface Item {
  id: string
  type: ItemType
  content: string
  world: number
  metadata: {
    phonics_coverage?: string[]
    is_personalized?: boolean
  }
}

export interface ItemState {
  item_id: string
  profile_id: string
  last_seen: Date
  next_due: Date
  interval_days: number
  ease_factor?: number
  correct_streak: number
  error_count: number
  status: ItemStatus
  learning_threshold_met: boolean  // Has item graduated from massed practice?
}

export interface ResponseData {
  raw_response: string
  response_time_ms: number
  hints_used: number
  context?: Record<string, unknown>
}

export interface Review {
  id: string
  profile_id: string
  item_id: string
  timestamp: Date
  rating: Rating
  response_data: ResponseData
  mode: SessionMode
}

export interface Profile {
  id: string
  name: string
  age: number
  created_at: Date
  current_world: number
}

export interface MiniGameConfig {
  type: string
  item: Item
  theme?: string
}
