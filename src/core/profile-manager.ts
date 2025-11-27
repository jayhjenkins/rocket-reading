import { Profile } from '../types'

export class ProfileManager {
  private profileKey = 'rocketreading_profile'

  async createProfile(name: string, age: number): Promise<Profile> {
    const profile: Profile = {
      id: `child_${Date.now()}`,
      name,
      age,
      created_at: new Date(),
      current_world: 1
    }

    localStorage.setItem(this.profileKey, JSON.stringify(profile))
    return profile
  }

  async getProfile(): Promise<Profile | null> {
    const stored = localStorage.getItem(this.profileKey)
    if (!stored) return null

    const profile = JSON.parse(stored) as Profile
    profile.created_at = new Date(profile.created_at)
    return profile
  }

  async hasProfile(): Promise<boolean> {
    return localStorage.getItem(this.profileKey) !== null
  }
}
