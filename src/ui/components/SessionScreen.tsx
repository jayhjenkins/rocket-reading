import React, { useState, useEffect } from 'react'
import { Profile, Item } from '../../types'
import { SREngine } from '../../core/sr-engine'
import { LetterSoundGame } from './LetterSoundGame'
import styles from './SessionScreen.module.css'

const SEED_ITEMS: Item[] = [
  { id: 'letter_m', type: 'letter', content: 'm', world: 1, metadata: { phonics_coverage: ['m'] } },
  { id: 'letter_a', type: 'letter', content: 'a', world: 1, metadata: { phonics_coverage: ['a'] } },
  { id: 'letter_t', type: 'letter', content: 't', world: 1, metadata: { phonics_coverage: ['t'] } },
  { id: 'letter_s', type: 'letter', content: 's', world: 1, metadata: { phonics_coverage: ['s'] } },
  { id: 'letter_i', type: 'letter', content: 'i', world: 1, metadata: { phonics_coverage: ['i'] } },
]

interface SessionScreenProps {
  profile: Profile
  onSessionComplete: () => void
}

export const SessionScreen: React.FC<SessionScreenProps> = ({ profile, onSessionComplete }) => {
  const [srEngine] = useState(() => new SREngine())
  const [dueItems, setDueItems] = useState<Item[]>([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionComplete, setSessionComplete] = useState(false)

  useEffect(() => {
    const initializeSession = async () => {
      try {
        await srEngine.initialize()

        // Seed items if not already seeded
        const existingItems = await srEngine.getAllItems(profile.id)
        if (existingItems.length === 0) {
          await srEngine.seedItems(profile.id, SEED_ITEMS)
        }

        // Get due items
        const items = await srEngine.getDueItems(profile.id, new Date())
        setDueItems(items.slice(0, 5)) // Limit to 5 items per session
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to initialize session:', error)
        setIsLoading(false)
      }
    }

    initializeSession()
  }, [profile.id, srEngine])

  const handleGameSubmit = async (rating: 'correct' | 'needed_help' | 'incorrect', responseData: any) => {
    try {
      const currentItem = dueItems[currentItemIndex]
      await srEngine.logReview(profile.id, currentItem.id, rating, responseData)

      if (currentItemIndex < dueItems.length - 1) {
        setCurrentItemIndex(currentItemIndex + 1)
      } else {
        setSessionComplete(true)
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
    }
  }

  if (isLoading) {
    return <div className={styles.container}>Loading session...</div>
  }

  if (dueItems.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>No items due today. Great job!</div>
        <button onClick={onSessionComplete}>Back Home</button>
      </div>
    )
  }

  if (sessionComplete) {
    return (
      <div className={styles.completionScreen}>
        <h1>You grew your reading power today! 🎉</h1>
        <p>You completed {dueItems.length} reviews</p>
        <button onClick={onSessionComplete}>Done</button>
      </div>
    )
  }

  const currentItem = dueItems[currentItemIndex]
  return (
    <div>
      <div className={styles.sessionInfo}>
        <p>Item {currentItemIndex + 1} of {dueItems.length}</p>
      </div>
      <LetterSoundGame
        item={currentItem}
        onSubmit={handleGameSubmit}
      />
    </div>
  )
}
