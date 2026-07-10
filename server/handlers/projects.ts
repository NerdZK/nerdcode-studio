import { getPool } from '../db';

export const CATEGORIES = ['Site', 'Bot Discord', 'Sistema', 'Aplicativo', 'Ferramenta', 'Outro'] as const;
export const STATUSES = ['planejamento', 'em_desenvolvimento', 'disponivel', 'arquivado'] as const;

export type Category = (typeof CATEGORIES)[number];
export type Status = (typeof STATUSES)[number];

export interface ProjectInput {
  code: string;
  name: string;
  description?: string;
  image_url?: string;
  category: Category;
  status: Status;
  site_url?: string;
  github_url?: string;
  discord_url?: string;
  demo_url?: string;
  sort_order?: number;
}

export interface Project extends ProjectInput {
  id: number;
  created_at: string;
  updated_at: string;
}

const URL_FIELDS: (keyof ProjectInput)[] = ['image_url', 'site_url', 'github_url', 'discord_url', 'demo_url'];

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateInput(input: Partial<ProjectInput>, requireAll: boolean): string | null {
  if (requireAll || input.code !== undefined) {
    if (!input.code || typeof input.code !== 'string' || !input.code.trim()) return 'Código do projeto é obrigatório.';
    if (input.code.trim().length > 50) return 'Código do projeto muito longo (máx. 50 caracteres).';
  }
  if (requireAll || input.name !== undefined) {
    if (!input.name || typeof input.name !== 'string' || !input.name.trim()) return 'Nome do projeto é obrigatório.';
    if (input.name.trim().length > 255) return 'Nome do projeto muito longo (máx. 255 caracteres).';
  }
  if (requireAll || input.category !== undefined) {
    if (!input.category || !CATEGORIES.includes(input.category as Category)) return 'Categoria inválida.';
  }
  if (requireAll || input.status !== undefined) {
    if (!input.status || !STATUSES.includes(input.status as Status)) return 'Status inválido.';
  }
  if (input.description !== undefined && input.description !== null && typeof input.description !== 'string') {
    return 'Descrição inválida.';
  }
  if (input.sort_order !== undefined && input.sort_order !== null) {
    if (typeof input.sort_order !== 'number' || !Number.isFinite(input.sort_order) || !Number.isInteger(input.sort_order)) {
      return 'Ordem deve ser um número inteiro.';
    }
  }
  for (const field of URL_FIELDS) {
    const value = input[field];
    if (value !== undefined && value !== null && value !== '' && typeof value === 'string') {
      if (!isValidUrl(value)) return `Link inválido no campo "${field}". Use uma URL completa (https://...).`;
    } else if (value !== undefined && value !== null && value !== '' && typeof value !== 'string') {
      return `Campo "${field}" deve ser texto.`;
    }
  }
  return null;
}

export async function listProjects(): Promise<Project[]> {
  const pool = getPool();
  const result = await pool.query(
    'SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC',
  );
  return result.rows;
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const error = validateInput(input, true);
  if (error) throw new ValidationError(error);

  const pool = getPool();
  const result = await pool.query(
    `INSERT INTO projects (code, name, description, image_url, category, status, site_url, github_url, discord_url, demo_url, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [
      input.code.trim(),
      input.name.trim(),
      input.description ?? null,
      input.image_url ?? null,
      input.category,
      input.status,
      input.site_url ?? null,
      input.github_url ?? null,
      input.discord_url ?? null,
      input.demo_url ?? null,
      input.sort_order ?? 0,
    ],
  );
  return result.rows[0];
}

export async function updateProject(id: number, input: Partial<ProjectInput>): Promise<Project | null> {
  const error = validateInput(input, false);
  if (error) throw new ValidationError(error);

  const pool = getPool();
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  const settable: (keyof ProjectInput)[] = [
    'code', 'name', 'description', 'image_url', 'category', 'status',
    'site_url', 'github_url', 'discord_url', 'demo_url', 'sort_order',
  ];

  for (const key of settable) {
    if (input[key] !== undefined) {
      fields.push(`${key} = $${idx}`);
      values.push(input[key]);
      idx++;
    }
  }

  if (fields.length === 0) {
    const existing = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    return existing.rows[0] ?? null;
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await pool.query(
    `UPDATE projects SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values,
  );
  return result.rows[0] ?? null;
}

export async function deleteProject(id: number): Promise<boolean> {
  const pool = getPool();
  const result = await pool.query('DELETE FROM projects WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
}

export class ValidationError extends Error {}
