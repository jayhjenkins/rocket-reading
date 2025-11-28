import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Item, Rating, ResponseData } from '../../types'
import { AudioPlayer } from '../../core/audio-player'
import { WORLD_1_LETTERS, WORLD_1_LETTER_SOUNDS } from '../../data/world-1-letters'
import styles from './SoundLetterGame.module.css'

interface SoundLetterGameProps {
  item: Item
  onSubmit: (rating: Rating, responseData: ResponseData) => Promise<void>
}

export const SoundLetterGame: React.FC<SoundLetterGameProps> = ({ item, onSubmit }) => {
  const [responseStartTime, setResponseStartTime] = useState(Date.now())
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [audioPlayer] = useState(() => new AudioPlayer())
  const [hintCountdown, setHintCountdown] = useState(0)

  // Refs to store timer IDs for cleanup
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const playSound = useCallback(async () => {
    try {
      await audioPlayer.playLetterSound(item.content)
    } catch (error) {
      console.error('Failed to play sound:', error)
    }
  }, [item.content, audioPlayer])

  useEffect(() => {
    // Clear any running timers when item changes
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
      countdownIntervalRef.current = null
    }
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current)
      hintTimeoutRef.current = null
    }

    // Reset all state when item changes
    setResponseStartTime(Date.now())
    setSelectedLetter(null)
    setShowFeedback(false)
    setHintsUsed(0)
    setHintCountdown(0)

    // Generate 3-4 letter options (including correct answer)
    const correctLetter = item.content
    const otherLetters = WORLD_1_LETTERS
      .map(l => l.content)
      .filter(l => l !== correctLetter)

    // Shuffle and pick 2-3 wrong options
    const shuffled = otherLetters.sort(() => Math.random() - 0.5)
    const wrongOptions = shuffled.slice(0, 3)

    // Combine and shuffle final options
    const allOptions = [correctLetter, ...wrongOptions].sort(() => Math.random() - 0.5)
    setOptions(allOptions)

    // Auto-play sound after state is reset and options are ready
    playSound()

    // Cleanup on unmount
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current)
    }
  }, [item.content, playSound])

  const handleLetterTap = (letter: string) => {
    const isCorrect = letter === item.content
    setSelectedLetter(letter)

    if (!isCorrect) {
      setHintsUsed(hintsUsed + 1)
      setShowFeedback(true)
      setHintCountdown(100) // Start at 100%

      // Clear any existing timers
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current)

      // Countdown timer - update every 50ms for smooth animation
      countdownIntervalRef.current = setInterval(() => {
        setHintCountdown(prev => {
          const newValue = prev - 2.5 // Decrease by 2.5% every 50ms (50ms * 40 = 2000ms)
          if (newValue <= 0) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current)
              countdownIntervalRef.current = null
            }
            return 0
          }
          return newValue
        })
      }, 50)

      // Clear hint after 2 seconds
      hintTimeoutRef.current = setTimeout(() => {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current)
          countdownIntervalRef.current = null
        }
        setShowFeedback(false)
        setSelectedLetter(null)
        setHintCountdown(0)
        hintTimeoutRef.current = null
      }, 2000)
    } else {
      setShowFeedback(true)
      setHintCountdown(0)
    }
  }

  const handleParentGrade = (rating: Rating) => {
    const responseData: ResponseData = {
      raw_response: `tapped_letter_${selectedLetter}`,
      response_time_ms: Date.now() - responseStartTime,
      hints_used: hintsUsed,
      context: {
        options,
        correct: item.content,
        selected: selectedLetter
      }
    }
    onSubmit(rating, responseData)
  }

  return (
    <div className={styles.container}>
      <div className={styles.prompt}>
        <button onClick={playSound} className={styles.soundButton}>
          🔊
        </button>
        <p>Tap the letter that says {WORLD_1_LETTER_SOUNDS[item.content]}</p>
      </div>

      <div className={styles.letterOptions}>
        {options.map(letter => (
          <button
            key={letter}
            onClick={() => handleLetterTap(letter)}
            className={`${styles.letterTile} ${
              selectedLetter === letter ? styles.selected : ''
            }`}
            disabled={showFeedback}
          >
            {letter}
          </button>
        ))}
      </div>

      {showFeedback && selectedLetter !== item.content && (
        <div className={styles.hint}>
          <div className={styles.hintText}>
            This is {WORLD_1_LETTER_SOUNDS[selectedLetter!]}. We want {WORLD_1_LETTER_SOUNDS[item.content]}.
          </div>
          <div className={styles.countdownBar}>
            <div
              className={styles.countdownFill}
              style={{ width: `${hintCountdown}%` }}
            />
          </div>
        </div>
      )}

      {showFeedback && selectedLetter === item.content && (
        <div className={styles.feedback}>
          <div className={styles.celebration}>Great job! 🎉</div>
          <div className={styles.gradingButtons}>
            <button onClick={() => handleParentGrade('correct')}>✅ Got it</button>
            <button onClick={() => handleParentGrade('needed_help')}>😬 Needed help</button>
            <button onClick={() => handleParentGrade('incorrect')}>❌ Didn't know</button>
          </div>
        </div>
      )}
    </div>
  )
}
