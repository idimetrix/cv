import { NextApiRequest, NextApiResponse } from 'next'
import { getUserResume, userExists } from '../../../utils/users'

/**
 * API endpoint to check if a user exists and get basic info
 * GET /api/users/[username]
 */
export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
   }

   const { username } = req.query

   if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Username is required' })
   }

   try {
      const exists = userExists(username)

      if (!exists) {
         return res.status(404).json({
            exists: false,
            message: `User '${username}' not found`,
         })
      }

      // Optionally, return basic user info without loading full resume
      const resume = await getUserResume(username)

      if (!resume) {
         return res.status(404).json({
            exists: false,
            message: `User '${username}' not found`,
         })
      }

      res.status(200).json({
         exists: true,
         user: {
            username,
            name: resume.name,
            summary: resume.summary,
            avatar: resume.avatar,
            location: resume.locations[0]?.name,
         },
      })
   } catch (error) {
      console.error('Error fetching user:', error)
      res.status(500).json({ error: 'Internal server error' })
   }
}
