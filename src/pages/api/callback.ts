// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sgidClient } from '@/clients/sgid.client'
import { userSessionService } from '@/services/user-session.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query
  const session = req.cookies['sgid-session'] || ''
  const sessionData = userSessionService.getSession(session)

  if (sessionData['state'] !== state) {
    res.status(400).json({ error: 'Invalid state' })
  } else {
    const { sub, accessToken } = await sgidClient.callback(code as string)
    userSessionService.updateSession(session, { accessToken })
    res.redirect('/logged-in')
  }
}
