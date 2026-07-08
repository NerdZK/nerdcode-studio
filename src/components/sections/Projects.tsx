import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Projects() {
  const projects = [
    {
      code: "NCS-001",
      name: "Site Oficial NerdCode Studio",
      status: "Em desenvolvimento",
      description: "Primeiro produto oficial da NerdCode Studio, responsável por apresentar a marca e seus projetos."
    }
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.code} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-colors flex flex-col h-full bg-card/80 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                    {project.code}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="text-xs font-medium text-amber-500/90">{project.status}</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center justify-between">
                  {project.name}
                  <ArrowUpRight className="h-5 w-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
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
      </div>
    </section>
  );
}
