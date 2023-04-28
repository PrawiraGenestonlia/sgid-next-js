// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sgidClient } from '@/clients/sgid.client'
import { userSessionService } from '@/services/user-session.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = req.cookies['sgid-session'] || ''
    const sessionData = userSessionService.getSession(session)
    const { sub, data } = await sgidClient.userinfo(
      sessionData['accessToken'] as string
    )
    res.status(200).json({ data, state: sessionData['state'] })
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message })
    }
  }
}
