import { Resume } from '../types'
import fs from 'fs'
import path from 'path'

/**
 * Deep clean an object by removing all undefined values
 * This is necessary for Next.js serialization in getServerSideProps
 */
const cleanUndefined = <T>(obj: T): T => {
   if (obj === null || obj === undefined) {
      return null as T
   }

   if (Array.isArray(obj)) {
      return obj.map((item) => cleanUndefined(item)) as T
   }

   if (typeof obj === 'object') {
      const cleaned: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(obj)) {
         if (value !== undefined) {
            cleaned[key] = cleanUndefined(value)
         }
      }
      return cleaned as T
   }

   return obj
}

/**
 * Get list of available users
 * This function automatically reads the users directory and returns all available usernames
 * Just add a new folder in apps/web/users/{username}/ and it will be automatically detected!
 */
export const getAvailableUsers = (): string[] => {
   try {
      const usersDir = path.join(process.cwd(), 'users')

      // Read all items in the users directory
      const items = fs.readdirSync(usersDir, { withFileTypes: true })

      // Filter to get only directories (exclude files like README.md, index.ts, and TEMPLATE)
      const usernames = items
         .filter(
            (item) =>
               item.isDirectory() && item.name.toLowerCase() !== 'template'
         )
         .map((item) => item.name.toLowerCase())

      return usernames
   } catch (error) {
      console.error('Error reading users directory:', error)
      // Fallback to default user if directory reading fails
      return ['idimetrix']
   }
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

      // Clean undefined values for Next.js serialization
      return cleanUndefined(userModule.RESUME)
   } catch (error) {
      console.error(`Failed to load user: ${username}`, error)
      return null
   }
}

/**
 * Get default user (for homepage)
 * Always returns 'idimetrix' as the primary user
 */
export const getDefaultUser = (): string => {
   return 'idimetrix'
}
