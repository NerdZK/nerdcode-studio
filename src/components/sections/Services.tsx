import { Bot, Globe, Database, Beaker } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function Services() {
  const services = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Bots & Automações",
      description: "Desenvolvimento de bots para Discord, sistemas de comunidades e automações inteligentes."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Desenvolvimento Web",
      description: "Criação de sites e aplicações web modernas, responsivas e de alta performance."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Sistemas Digitais",
      description: "Desenvolvimento de ferramentas e soluções personalizadas para necessidades específicas."
    },
    {
      icon: <Beaker className="h-8 w-8" />,
      title: "Projetos Experimentais",
      description: "Criação de protótipos e testes de novas ideias para explorar tecnologias emergentes."
    }
  ];

  return (
    <section id="servicos" className="py-24">
      <div className="container px-6 mx-auto">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">O Que Fazemos</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Serviços</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border border-border/50 bg-card/50 hover:bg-card transition-colors group">
              <CardHeader>
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
