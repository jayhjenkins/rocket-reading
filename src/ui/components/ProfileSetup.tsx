import React, { useState } from 'react'
import { Profile } from '../../types'
import { ProfileManager } from '../../core/profile-manager'
import styles from './ProfileSetup.module.css'

interface ProfileSetupProps {
  onProfileCreated: (profile: Profile) => void
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onProfileCreated }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(3)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const profileManager = new ProfileManager()
    const profile = await profileManager.createProfile(name, age)
    onProfileCreated(profile)
  }

  return (
    <div className={styles.container}>
      <h1>Welcome to Rocket Reading!</h1>
      <p>Let's set up your child's profile</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Child's Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Emma"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <select
            id="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            disabled={isSubmitting}
          >
            <option value={2.5}>2.5 years</option>
            <option value={3}>3 years</option>
            <option value={4}>4 years</option>
            <option value={5}>5 years</option>
            <option value={6}>6 years</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Setting up...' : 'Let\'s Go!'}
        </button>
      </form>
    </div>
  )
}
