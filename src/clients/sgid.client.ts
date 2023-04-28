import { SgidClient } from '@opengovsg/sgid-client'

export const sgidClient = new SgidClient({
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  redirectUri: process.env.REDIRECT_URI || 'http://localhost:8082/callback',
})
