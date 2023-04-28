// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sgidClient } from '@/clients/sgid.client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code, state } = req.query
    const { sub: tokenSub, accessToken } = await sgidClient.callback(
      code as string
    )
    const { sub: userSub, data } = await sgidClient.userinfo(accessToken)
    res.status(200).json({ data, tokenSub, userSub })
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message })
    }
  }
}
