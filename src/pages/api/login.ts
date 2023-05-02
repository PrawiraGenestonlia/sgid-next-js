// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 } from 'uuid'
import { serialize } from 'cookie'
import { sgidClient } from '@/clients/sgid.client'
import { userSessionService } from '@/services/user-session.service'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionToken = v4()
  const queryString = req.url?.split('?')[1] || ''
  const state = `sessionToken=${sessionToken}&${queryString}}`
  const { url } = sgidClient.authorizationUrl(
    state,
    ['openid', 'myinfo.name'], // or space-concatenated string
    null // defaults to randomly generated nonce if unspecified
  )
  userSessionService.updateSession(sessionToken, { state })
  res
    .setHeader(
      'Set-Cookie',
      serialize('sgid-session', sessionToken, { path: '/', httpOnly: true })
    )
    .redirect(url)
}
