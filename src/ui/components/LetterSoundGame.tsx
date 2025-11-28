import React, { useState, useEffect } from 'react'
import { Item, Rating, ResponseData } from '../../types'
import { AudioPlayer } from '../../core/audio-player'
import styles from './LetterSoundGame.module.css'

interface LetterSoundGameProps {
  item: Item
  onSubmit: (rating: Rating, responseData: ResponseData) => Promise<void>
}

export const LetterSoundGame: React.FC<LetterSoundGameProps> = ({ item, onSubmit }) => {
  const [startTime, setStartTime] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [audioPlayer] = useState(() => new AudioPlayer())

  useEffect(() => {
    setStartTime(Date.now())
  }, [])

  const handleGrade = async (rating: Rating) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    const responseTime = Date.now() - startTime

    // Play letter sound as feedback
    await audioPlayer.playLetterSound(item.content)

    const responseData: ResponseData = {
      raw_response: 'parent_graded',
      response_time_ms: responseTime,
      hints_used: 0,
      context: { item_id: item.id }
    }

    await onSubmit(rating, responseData)
    setIsSubmitting(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.prompt}>
        <p>What sound does this letter make?</p>
      </div>

      <div className={styles.letter}>
        {item.content}
      </div>

      <div className={styles.instructions}>
        <p>Listen and have your child say the sound aloud.</p>
      </div>

      {/* CODE-BASED BUTTONS: Uses CSS + Unicode emoji (✅😬❌), no image files needed */}
      <div className={styles.gradingButtons}>
        <button
          className={`${styles.button} ${styles.buttonCorrect}`}
          onClick={() => handleGrade('correct')}
          disabled={isSubmitting}
        >
          ✅ Got it
        </button>
        <button
          className={`${styles.button} ${styles.buttonHelp}`}
          onClick={() => handleGrade('needed_help')}
          disabled={isSubmitting}
        >
          😬 Needed help
        </button>
        <button
          className={`${styles.button} ${styles.buttonWrong}`}
          onClick={() => handleGrade('incorrect')}
          disabled={isSubmitting}
        >
          ❌ Didn't know
        </button>
      </div>
    </div>
  )
}
