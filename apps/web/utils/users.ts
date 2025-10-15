import { Resume } from '../types'

/**
 * Get list of available users
 * This function reads the users directory and returns available usernames
 */
export const getAvailableUsers = (): string[] => {
   // In production, this could be dynamic or from a database
   // For now, we'll maintain a list of available users
   return ['idimetrix']
}

/**
 * Check if a user exists
 */
export const userExists = (username: string): boolean => {
   return getAvailableUsers().includes(username.toLowerCase())
}

/**
 * Dynamically import a user's resume data
 * This ensures we only load the data we need, supporting 1000+ users
 */
export const getUserResume = async (
   username: string
): Promise<Resume | null> => {
   try {
      const normalizedUsername = username.toLowerCase()

      if (!userExists(normalizedUsername)) {
         return null
      }

      // Dynamic import - only loads when needed
      const userModule = await import(`../users/${normalizedUsername}`)
      return userModule.RESUME
   } catch (error) {
      console.error(`Failed to load user: ${username}`, error)
      return null
   }
}

/**
 * Get default user (for homepage)
 */
export const getDefaultUser = (): string => {
   return 'idimetrix'
}
