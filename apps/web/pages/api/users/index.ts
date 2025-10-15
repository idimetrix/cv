import { NextApiRequest, NextApiResponse } from 'next'
import { getAvailableUsers } from '../../../utils/users'

/**
 * API endpoint to get list of available users
 * GET /api/users
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
   }

   try {
      const users = getAvailableUsers()

      res.status(200).json({
         users,
         count: users.length,
      })
   } catch (error) {
      console.error('Error fetching users:', error)
      res.status(500).json({ error: 'Internal server error' })
   }
}
