import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, MessageSquare, Globe, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api, statusLabel, type Project } from '@/lib/api';

const STATUS_STYLES: Record<string, { dot: string; text: string; ping: boolean }> = {
  planejamento: { dot: 'bg-blue-500', text: 'text-blue-500/90', ping: false },
  em_desenvolvimento: { dot: 'bg-amber-500', text: 'text-amber-500/90', ping: true },
  disponivel: { dot: 'bg-green-500', text: 'text-green-500/90', ping: false },
  arquivado: { dot: 'bg-zinc-400', text: 'text-zinc-400/90', ping: false },
};

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.planejamento;
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        {style.ping && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.dot} opacity-75`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${style.dot}`}></span>
      </span>
      <span className={`text-xs font-medium ${style.text}`}>{statusLabel(status)}</span>
    </div>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listProjects()
      .then((res) => setProjects(res.projects))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projetos" className="py-24 bg-secondary/30">
      <div className="container px-6 mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">Nosso Portfólio</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Projetos</h3>
          </div>
          <p className="text-muted-foreground max-w-md">
            Softwares, bots e ferramentas construídas com foco em qualidade e experiência do usuário.
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-sm">Carregando projetos...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.code} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-colors flex flex-col h-full bg-card/80 backdrop-blur">
                {project.image_url && (
                  <div className="aspect-video w-full overflow-hidden bg-secondary/40 border-b border-border/50">
                    <img src={project.image_url} alt={project.name} className="h-full w-full object-cover" />
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {project.code}
                    </span>
                    <StatusBadge status={project.status} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center justify-between">
                    {project.name}
                    <ArrowUpRight className="h-5 w-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground mr-auto">{project.category}</span>
                    {project.site_url && (
                      <a href={project.site_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Site">
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary" aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.discord_url && (
                      <a href={project.discord_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Discord">
                        <MessageSquare className="h-4 w-4" />
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Demonstração">
                        <PlayCircle className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Placeholder for future projects */}
            <div className="border border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center text-center text-muted-foreground bg-secondary/10">
              <div className="h-10 w-10 rounded-full border border-dashed border-muted-foreground flex items-center justify-center mb-4">
                <span className="text-xl">+</span>
              </div>
              <p className="font-medium text-sm">Novos projetos em breve</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
