import React, { useState, useEffect } from 'react'
import { Profile } from '../types'
import { ProfileManager } from '../core/profile-manager'
import { ProfileSetup } from './components/ProfileSetup'
import { SessionScreen } from './components/SessionScreen'
import styles from './App.module.css'

export const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isInSession, setIsInSession] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      const profileManager = new ProfileManager()
      const p = await profileManager.getProfile()
      if (p) {
        setProfile(p)
      }
      setIsLoading(false)
    }

    loadProfile()
  }, [])

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!profile) {
    return <ProfileSetup onProfileCreated={setProfile} />
  }

  if (isInSession) {
    return (
      <SessionScreen
        profile={profile}
        onSessionComplete={() => setIsInSession(false)}
      />
    )
  }

  return (
    <div className={styles.homeScreen}>
      <h1>Hi {profile.name}! 👋</h1>
      <p>Ready to grow your reading power?</p>
      <button onClick={() => setIsInSession(true)}>Let's Go!</button>
    </div>
  )
}
