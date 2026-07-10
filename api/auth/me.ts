import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readSessionCookie, verifySessionToken } from '../../server/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = readSessionCookie(req.headers.cookie);
  const session = verifySessionToken(token);
  if (!session) {
    res.status(401).json({ authenticated: false });
    return;
  }
  res.status(200).json({ authenticated: true, email: session.email });
}
