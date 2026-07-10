import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readSessionCookie, verifySessionToken } from '../../server/auth';
import { updateProject, deleteProject, ValidationError } from '../../server/handlers/projects';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = verifySessionToken(readSessionCookie(req.headers.cookie));
  if (!session) {
    res.status(401).json({ error: 'Não autorizado.' });
    return;
  }

  const idParam = req.query.id;
  const id = Number(Array.isArray(idParam) ? idParam[0] : idParam);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'ID inválido.' });
    return;
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const project = await updateProject(id, req.body ?? {});
      if (!project) {
        res.status(404).json({ error: 'Projeto não encontrado.' });
        return;
      }
      res.status(200).json({ project });
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar projeto.' });
    }
    return;
  }

  if (req.method === 'DELETE') {
    try {
      const deleted = await deleteProject(id);
      if (!deleted) {
        res.status(404).json({ error: 'Projeto não encontrado.' });
        return;
      }
      res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao remover projeto.' });
    }
    return;
  }

  res.status(405).json({ error: 'Método não permitido.' });
}
