import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readSessionCookie, verifySessionToken } from '../../server/auth';
import { listProjects, createProject, ValidationError } from '../../server/handlers/projects';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const projects = await listProjects();
      res.status(200).json({ projects });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao carregar projetos.' });
    }
    return;
  }

  if (req.method === 'POST') {
    const session = verifySessionToken(readSessionCookie(req.headers.cookie));
    if (!session) {
      res.status(401).json({ error: 'Não autorizado.' });
      return;
    }
    try {
      const project = await createProject(req.body ?? {});
      res.status(201).json({ project });
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar projeto.' });
    }
    return;
  }

  res.status(405).json({ error: 'Método não permitido.' });
}
