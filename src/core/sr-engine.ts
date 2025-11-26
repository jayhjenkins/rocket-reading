import { Item, ItemState, Review, ResponseData, Rating } from '../types'

export class SREngine {
  private db: IDBDatabase | null = null
  private dbName = 'rocketreading_db'
  private version = 1

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains('items')) {
          db.createObjectStore('items', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('item_states')) {
          const store = db.createObjectStore('item_states', { keyPath: 'id' })
          store.createIndex('profile_id', 'profile_id', { unique: false })
          store.createIndex('next_due', 'next_due', { unique: false })
          store.createIndex('profile_item', ['profile_id', 'item_id'], { unique: true })
        }
        if (!db.objectStoreNames.contains('reviews')) {
          const store = db.createObjectStore('reviews', { keyPath: 'id' })
          store.createIndex('profile_id', 'profile_id', { unique: false })
          store.createIndex('item_id', 'item_id', { unique: false })
        }
      }
    })
  }

  async seedItems(profileId: string, items: Item[]): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    const tx = this.db.transaction(['items', 'item_states'], 'readwrite')

    items.forEach(item => {
      tx.objectStore('items').put(item)

      const itemState: any = {
        id: `${profileId}_${item.id}`,  // Composite ID
        item_id: item.id,
        profile_id: profileId,
        last_seen: new Date(),
        next_due: new Date(), // Due immediately
        interval_days: 0,  // Start in massed practice
        correct_streak: 0,
        error_count: 0,
        status: 'new',
        learning_threshold_met: false  // Not yet graduated
      }
      tx.objectStore('item_states').put(itemState)
    })

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getDueItems(profileId: string, date: Date): Promise<Item[]> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['item_states', 'items'], 'readonly')
      const stateStore = tx.objectStore('item_states')
      const itemStore = tx.objectStore('items')

      const index = stateStore.index('profile_id')
      const range = IDBKeyRange.only(profileId)
      const request = index.getAll(range)

      request.onsuccess = () => {
        const states = request.result as ItemState[]
        const dueStates = states.filter(s => new Date(s.next_due) <= date)

        const dueItems: Item[] = []
        dueStates.forEach(state => {
          const itemRequest = itemStore.get(state.item_id)
          itemRequest.onsuccess = () => {
            const item = itemRequest.result as Item
            if (item) dueItems.push(item)
          }
        })

        tx.oncomplete = () => resolve(dueItems)
      }

      request.onerror = () => reject(request.error)
    })
  }

  async logReview(profileId: string, itemId: string, rating: Rating, responseData: ResponseData): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    const state = await this.getItemState(profileId, itemId)
    const now = new Date()

    // Massed + Spaced Hybrid Algorithm
    const LEARNING_THRESHOLD = 3  // Need 3 correct in a row to graduate

    let newInterval = state.interval_days
    let newStreak = state.correct_streak
    let newErrors = state.error_count
    let newStatus = state.status
    let newLearningThresholdMet = state.learning_threshold_met

    if (rating === 'correct') {
      newStreak = state.correct_streak + 1

      if (!state.learning_threshold_met) {
        // MASSED PRACTICE PHASE
        if (newStreak >= LEARNING_THRESHOLD) {
          // GRADUATED to spacing!
          newInterval = 1  // Start with 1-day interval
          newLearningThresholdMet = true
          newStatus = 'maturing'
        } else {
          // Still in massed practice
          newInterval = 0  // Show again in same session
          newStatus = 'learning'
        }
      } else {
        // SPACED PRACTICE PHASE (already graduated)
        newInterval = Math.min(state.interval_days * 2, 30)  // Double, cap at 30 days
        newStatus = 'maturing'
      }
    } else if (rating === 'incorrect') {
      // Reset to massed practice
      newInterval = 0  // Show again in same session
      newStreak = 0
      newErrors = state.error_count + 1
      newLearningThresholdMet = false  // Reset graduation flag
      newStatus = 'learning'
    } else if (rating === 'needed_help') {
      // Reduce streak, keep in current phase
      if (!state.learning_threshold_met) {
        // In massed practice: reduce streak, stay in session
        newInterval = 0
        newStreak = Math.max(0, state.correct_streak - 1)
      } else {
        // In spaced practice: reduce interval
        newInterval = Math.max(Math.ceil(state.interval_days * 0.5), 1)
        newStreak = 0
      }
    }

    // Calculate next_due date
    const nextDue = newInterval === 0
      ? now  // Due immediately (show again in same session)
      : new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000)

    // Update item state
    const updatedState: ItemState = {
      ...state,
      last_seen: now,
      next_due: nextDue,
      interval_days: newInterval,
      correct_streak: newStreak,
      error_count: newErrors,
      status: newStatus,
      learning_threshold_met: newLearningThresholdMet
    }

    await this.updateItemState(profileId, updatedState)

    // Save review
    const review: Review = {
      id: `review_${profileId}_${itemId}_${Date.now()}`,
      profile_id: profileId,
      item_id: itemId,
      timestamp: now,
      rating,
      response_data: responseData,
      mode: 'co_play'
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['reviews'], 'readwrite')
      const request = tx.objectStore('reviews').put(review)

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getItemState(profileId: string, itemId: string): Promise<ItemState> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['item_states'], 'readonly')
      const compositeId = `${profileId}_${itemId}`
      const request = tx.objectStore('item_states').get(compositeId)

      request.onsuccess = () => {
        const state = request.result as ItemState
        if (!state) {
          reject(new Error(`ItemState not found for ${itemId}`))
        } else {
          resolve(state)
        }
      }

      request.onerror = () => reject(request.error)
    })
  }

  async updateItemState(profileId: string, state: ItemState): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['item_states'], 'readwrite')
      const stateWithId: any = {
        ...state,
        id: `${profileId}_${state.item_id}`
      }
      const request = tx.objectStore('item_states').put(stateWithId)

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getAllItems(profileId: string): Promise<Item[]> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['item_states', 'items'], 'readonly')
      const stateStore = tx.objectStore('item_states')
      const itemStore = tx.objectStore('items')

      const index = stateStore.index('profile_id')
      const range = IDBKeyRange.only(profileId)
      const request = index.getAll(range)

      request.onsuccess = () => {
        const states = request.result as ItemState[]
        const items: Item[] = []

        states.forEach(state => {
          const itemRequest = itemStore.get(state.item_id)
          itemRequest.onsuccess = () => {
            const item = itemRequest.result as Item
            if (item) items.push(item)
          }
        })

        tx.oncomplete = () => resolve(items)
      }

      request.onerror = () => reject(request.error)
    })
  }

  async getLastReview(profileId: string, itemId: string): Promise<Review | undefined> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['reviews'], 'readonly')
      const store = tx.objectStore('reviews')
      const index = store.index('item_id')

      const request = index.getAll(itemId)

      request.onsuccess = () => {
        const reviews = request.result as Review[]
        const sorted = reviews.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        resolve(sorted[0])
      }

      request.onerror = () => reject(request.error)
    })
  }
}
