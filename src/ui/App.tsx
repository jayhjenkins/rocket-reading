import React, { useState, useEffect } from 'react'
import { Profile } from '../types'
import { ProfileManager } from '../core/profile-manager'
import { SREngine } from '../core/sr-engine'
import { WorldCompletion } from '../core/world-completion'
import { ProfileSetup } from './components/ProfileSetup'
import { SessionScreen } from './components/SessionScreen'
import { Treehouse } from './components/Treehouse'
import styles from './App.module.css'

export const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isInSession, setIsInSession] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [srEngine] = useState(() => new SREngine())
  const [world1Progress, setWorld1Progress] = useState({
    lettersStarted: 0,
    lettersMastered: 0,
    overallAccuracy: 0
  })

  useEffect(() => {
    const loadProfile = async () => {
      const profileManager = new ProfileManager()
      const p = await profileManager.getProfile()
      if (p) {
        setProfile(p)

        // Load World 1 progress
        await srEngine.initialize()
        const worldCompletion = new WorldCompletion(srEngine)
        const progress = await worldCompletion.getWorld1Progress(p.id)
        setWorld1Progress(progress)
      }
      setIsLoading(false)
    }

    loadProfile()
  }, [srEngine])

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!profile) {
    return <ProfileSetup onProfileCreated={setProfile} />
  }

  const handleSessionComplete = async () => {
    // Reload World 1 progress after session completion
    const worldCompletion = new WorldCompletion(srEngine)
    const progress = await worldCompletion.getWorld1Progress(profile.id)
    setWorld1Progress(progress)
    setIsInSession(false)
  }

  if (isInSession) {
    return (
      <SessionScreen
        profile={profile}
        onSessionComplete={handleSessionComplete}
      />
    )
  }

  return (
    <Treehouse
      profile={profile}
      onStartSession={() => setIsInSession(true)}
      world1Progress={world1Progress}
    />
  )
}
