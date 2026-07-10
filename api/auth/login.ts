import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyCredentials, signSessionToken, buildSessionCookie } from '../../server/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }

  const { email, password } = (req.body ?? {}) as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    return;
  }

  if (!verifyCredentials(email, password)) {
    res.status(401).json({ error: 'Credenciais inválidas.' });
    return;
  }

  const token = signSessionToken({ email: process.env.ADMIN_EMAIL as string, role: 'admin' });
  res.setHeader('Set-Cookie', buildSessionCookie(token));
  res.status(200).json({ ok: true, email: process.env.ADMIN_EMAIL });
}
