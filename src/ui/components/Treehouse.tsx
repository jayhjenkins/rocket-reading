import React from 'react'
import { Profile } from '../../types'
import styles from './Treehouse.module.css'

interface TreehouseProps {
  profile: Profile
  onStartSession: () => void
  world1Progress: {
    lettersStarted: number
    lettersMastered: number
    overallAccuracy: number
  }
}

export const Treehouse: React.FC<TreehouseProps> = ({
  profile,
  onStartSession,
  world1Progress
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.sky}>
        <div className={styles.clouds}>☁️ ☁️ ☁️</div>
      </div>

      <div className={styles.treehouse}>
        <div className={styles.tree}>🌳</div>
        <div className={styles.house}>🏠</div>
        <div className={styles.mascot}>🐻</div>
      </div>

      <div className={styles.greeting}>
        <h1>Hi {profile.name}! 👋</h1>
        <p>Welcome to your Reading Treehouse!</p>
      </div>

      <div className={styles.progress}>
        <p>Letters learned: {world1Progress.lettersMastered} / 12</p>
        {world1Progress.overallAccuracy > 0 && (
          <p>Accuracy: {Math.round(world1Progress.overallAccuracy * 100)}%</p>
        )}
      </div>

      <button onClick={onStartSession} className={styles.startButton}>
        Let's Go! 🚀
      </button>
    </div>
  )
}
