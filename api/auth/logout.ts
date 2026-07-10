import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildClearCookie } from '../../server/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }
  res.setHeader('Set-Cookie', buildClearCookie());
  res.status(200).json({ ok: true });
}
