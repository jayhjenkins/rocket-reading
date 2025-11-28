import React, { useState, useEffect } from 'react'
import { Profile, Item } from '../../types'
import { SREngine } from '../../core/sr-engine'
import { LetterSoundGame } from './LetterSoundGame'
import { SoundLetterGame } from './SoundLetterGame'
import { WORLD_1_LETTERS } from '../../data/world-1-letters'
import styles from './SessionScreen.module.css'

// TEMPORARY: 50/50 random game type assignment
// This will be replaced by Quest Generator in Slice 3
// Isolated for easy swapping
const assignGameType = (item: Item): 'letter_sound' | 'sound_letter' => {
  return Math.random() < 0.5 ? 'letter_sound' : 'sound_letter'
}

interface ItemWithGameType {
  item: Item
  gameType: 'letter_sound' | 'sound_letter'
}

interface SessionScreenProps {
  profile: Profile
  onSessionComplete: () => void | Promise<void>
}

export const SessionScreen: React.FC<SessionScreenProps> = ({ profile, onSessionComplete }) => {
  const [srEngine] = useState(() => new SREngine())
  const [dueItems, setDueItems] = useState<ItemWithGameType[]>([])
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
          await srEngine.seedItems(profile.id, WORLD_1_LETTERS)
        }

        // Get due items
        const items = await srEngine.getDueItems(profile.id, new Date())

        // Assign game types and limit to 10 items per session (expanded from 5)
        const itemsWithGames = items.slice(0, 10).map(item => ({
          item,
          gameType: assignGameType(item)
        }))

        setDueItems(itemsWithGames)
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
      const currentItemConfig = dueItems[currentItemIndex]
      await srEngine.logReview(profile.id, currentItemConfig.item.id, rating, responseData)

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

  const currentItemConfig = dueItems[currentItemIndex]
  return (
    <div>
      <div className={styles.sessionInfo}>
        <p>Item {currentItemIndex + 1} of {dueItems.length}</p>
      </div>
      {currentItemConfig.gameType === 'letter_sound' ? (
        <LetterSoundGame
          item={currentItemConfig.item}
          onSubmit={handleGameSubmit}
        />
      ) : (
        <SoundLetterGame
          item={currentItemConfig.item}
          onSubmit={handleGameSubmit}
        />
      )}
    </div>
  )
}
