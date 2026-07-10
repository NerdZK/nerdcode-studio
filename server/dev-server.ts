import express from 'express';
import { readSessionCookie, verifySessionToken, verifyCredentials, signSessionToken, buildSessionCookie, buildClearCookie } from './auth';
import { listProjects, createProject, updateProject, deleteProject, ValidationError } from './handlers/projects';

const app = express();
app.use(express.json());

function requireAdmin(req: express.Request, res: express.Response): boolean {
  const session = verifySessionToken(readSessionCookie(req.headers.cookie));
  if (!session) {
    res.status(401).json({ error: 'Não autorizado.' });
    return false;
  }
  return true;
}

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body ?? {};
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
});

app.post('/api/auth/logout', (_req, res) => {
  res.setHeader('Set-Cookie', buildClearCookie());
  res.status(200).json({ ok: true });
});

app.get('/api/auth/me', (req, res) => {
  const session = verifySessionToken(readSessionCookie(req.headers.cookie));
  if (!session) {
    res.status(401).json({ authenticated: false });
    return;
  }
  res.status(200).json({ authenticated: true, email: session.email });
});

app.all('/api/projects', (req, res, next) => {
  if (req.method === 'GET' || req.method === 'POST') return next();
  res.status(405).json({ error: 'Método não permitido.' });
});

app.all('/api/projects/:id', (req, res, next) => {
  if (req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') return next();
  res.status(405).json({ error: 'Método não permitido.' });
});

app.get('/api/projects', async (_req, res) => {
  try {
    const projects = await listProjects();
    res.status(200).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao carregar projetos.' });
  }
});

app.post('/api/projects', async (req, res) => {
  if (!requireAdmin(req, res)) return;
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
});

app.put('/api/projects/:id', handleProjectUpdate);
app.patch('/api/projects/:id', handleProjectUpdate);

async function handleProjectUpdate(req: express.Request, res: express.Response) {
  if (!requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'ID inválido.' });
    return;
  }
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
}

app.delete('/api/projects/:id', async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'ID inválido.' });
    return;
  }
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
});

const PORT = Number(process.env.API_PORT) || 8787;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[api-dev] Servidor de API local rodando na porta ${PORT}`);
});
