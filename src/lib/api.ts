export interface Project {
  id: number;
  code: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string;
  status: string;
  site_url: string | null;
  github_url: string | null;
  discord_url: string | null;
  demo_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Erro na requisição.');
  }
  return data as T;
}

export const api = {
  login: (email: string, password: string) =>
    request<{ ok: boolean; email: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<{ ok: boolean }>('/api/auth/logout', { method: 'POST' }),
  me: () => request<{ authenticated: boolean; email?: string }>('/api/auth/me'),
  listProjects: () => request<{ projects: Project[] }>('/api/projects'),
  createProject: (input: ProjectInput) =>
    request<{ project: Project }>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  updateProject: (id: number, input: Partial<ProjectInput>) =>
    request<{ project: Project }>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    }),
  deleteProject: (id: number) =>
    request<{ ok: boolean }>(`/api/projects/${id}`, { method: 'DELETE' }),
};

export const CATEGORIES = ['Site', 'Bot Discord', 'Sistema', 'Aplicativo', 'Ferramenta', 'Outro'] as const;

export const STATUS_OPTIONS = [
  { value: 'planejamento', label: 'Planejamento', color: 'bg-blue-500', dot: 'bg-blue-500' },
  { value: 'em_desenvolvimento', label: 'Em desenvolvimento', color: 'bg-amber-500', dot: 'bg-amber-500' },
  { value: 'disponivel', label: 'Disponível', color: 'bg-green-500', dot: 'bg-green-500' },
  { value: 'arquivado', label: 'Arquivado', color: 'bg-zinc-400', dot: 'bg-zinc-400' },
] as const;

export function statusLabel(value: string): string {
  return STATUS_OPTIONS.find((s) => s.value === value)?.label ?? value;
}
