import { UserCircle, Code2, Cpu, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function Team() {
  const team = [
    {
      name: "NerdZK",
      fullName: "Ygor Gabriel",
      role: "CEO & Developer",
      description: "Fundador da NerdCode Studio. Responsável pela visão da marca, decisões dos projetos, desenvolvimento e evolução dos produtos.",
      icon: <UserCircle className="h-12 w-12 text-primary" />
    },
    {
      name: "ChatGPT",
      role: "Arquiteto",
      description: "Responsável pelo planejamento, arquitetura de software, organização dos projetos, criação de estratégias e documentação.",
      icon: <Code2 className="h-12 w-12 text-primary" />
    },
    {
      name: "Replit AI",
      role: "Desenvolvedor",
      description: "Responsável pela implementação, criação de funcionalidades e desenvolvimento dos sistemas.",
      icon: <Cpu className="h-12 w-12 text-primary" />
    },
    {
      name: "Claude",
      role: "Revisor",
      description: "Responsável pela análise de qualidade, revisão de código, identificação de problemas, segurança e sugestões de melhorias.",
      icon: <FileCheck className="h-12 w-12 text-primary" />
    }
  ];

  return (
    <section id="equipe" className="py-24">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">Quem Constrói</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Equipe VibeNerd</h3>
          <p className="text-muted-foreground">
            Um time diverso focado em produtividade, criatividade e desenvolvimento de alta qualidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="bg-card border-border/50 hover:border-border transition-colors">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-secondary/50 h-24 w-24 rounded-full flex items-center justify-center mb-4 border border-border/50">
                  {member.icon}
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                {member.fullName && (
                  <p className="text-sm text-muted-foreground font-medium mb-1">{member.fullName}</p>
                )}
                <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full">
                  {member.role}
                </span>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
