import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { api, CATEGORIES, STATUS_OPTIONS, statusLabel, type Project, type ProjectInput } from '@/lib/api';
import { Pencil, Trash2, Plus, LogOut, ExternalLink } from 'lucide-react';

const EMPTY_FORM: ProjectInput = {
  code: '',
  name: '',
  description: '',
  image_url: '',
  category: 'Site',
  status: 'planejamento',
  site_url: '',
  github_url: '',
  discord_url: '',
  demo_url: '',
  sort_order: 0,
};

export function AdminDashboard({ email, onLogout }: { email?: string; onLogout: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  async function loadProjects() {
    setLoading(true);
    try {
      const { projects } = await api.listProjects();
      setProjects(projects);
    } catch (err) {
      toast({ title: 'Erro ao carregar projetos', description: String(err), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setForm({
      code: project.code,
      name: project.name,
      description: project.description ?? '',
      image_url: project.image_url ?? '',
      category: project.category,
      status: project.status,
      site_url: project.site_url ?? '',
      github_url: project.github_url ?? '',
      discord_url: project.discord_url ?? '',
      demo_url: project.demo_url ?? '',
      sort_order: project.sort_order,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editing) {
        await api.updateProject(editing.id, form);
        toast({ title: 'Projeto atualizado.' });
      } else {
        await api.createProject(form);
        toast({ title: 'Projeto criado.' });
      }
      setDialogOpen(false);
      await loadProjects();
    } catch (err) {
      toast({ title: 'Erro ao salvar', description: err instanceof Error ? err.message : String(err), variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project: Project) {
    if (!confirm(`Remover o projeto "${project.name}"?`)) return;
    try {
      await api.deleteProject(project.id);
      toast({ title: 'Projeto removido.' });
      await loadProjects();
    } catch (err) {
      toast({ title: 'Erro ao remover', description: String(err), variant: 'destructive' });
    }
  }

  async function handleLogout() {
    await api.logout().catch(() => {});
    onLogout();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-primary tracking-wider uppercase">NerdCode Studio</p>
            <h1 className="text-lg font-bold">Painel Administrativo</h1>
          </div>
          <div className="flex items-center gap-4">
            {email && <span className="text-sm text-muted-foreground hidden sm:block">{email}</span>}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Projetos</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Novo projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editing ? 'Editar projeto' : 'Novo projeto'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Código</Label>
                    <Input
                      placeholder="NCS-002"
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ordem</Label>
                    <Input
                      type="number"
                      value={form.sort_order}
                      onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nome do projeto</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea
                    rows={3}
                    value={form.description ?? ''}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL da imagem/logo</Label>
                  <Input
                    placeholder="https://..."
                    value={form.image_url ?? ''}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as ProjectInput['category'] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as ProjectInput['status'] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Link do site</Label>
                    <Input value={form.site_url ?? ''} onChange={(e) => setForm({ ...form, site_url: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Link do GitHub</Label>
                    <Input value={form.github_url ?? ''} onChange={(e) => setForm({ ...form, github_url: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Link do Discord</Label>
                    <Input value={form.discord_url ?? ''} onChange={(e) => setForm({ ...form, discord_url: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Link de demonstração</Label>
                    <Input value={form.demo_url ?? ''} onChange={(e) => setForm({ ...form, demo_url: e.target.value })} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSave} disabled={saving || !form.code || !form.name}>
                  {saving ? 'Salvando...' : 'Salvar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregando projetos...</p>
        ) : projects.length === 0 ? (
          <p className="text-muted-foreground">Nenhum projeto cadastrado ainda.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {project.code}
                    </span>
                    <Badge variant="outline">{statusLabel(project.status)}</Badge>
                  </div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                    <div className="flex items-center gap-1">
                      {project.site_url && (
                        <a href={project.site_url} target="_blank" rel="noreferrer" className="p-1.5 hover:text-primary">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <button className="p-1.5 hover:text-primary" onClick={() => openEdit(project)}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 hover:text-destructive" onClick={() => handleDelete(project)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
