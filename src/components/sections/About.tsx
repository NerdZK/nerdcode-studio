import { Target, Lightbulb, ShieldCheck } from "lucide-react";

export function About() {
  return (
    <section id="sobre" className="py-24 bg-secondary/30">
      <div className="container px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-sm font-mono text-primary mb-3 tracking-wider uppercase">Sobre Nós</h2>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed">
            A NerdCode Studio é um estúdio de desenvolvimento dedicado à criação de softwares, bots, automações e soluções digitais.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-card border border-border flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Missão</h3>
            <p className="text-muted-foreground leading-relaxed">
              Criar produtos digitais utilizando tecnologia, criatividade e aprendizado constante.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Visão</h3>
            <p className="text-muted-foreground leading-relaxed">
              Evoluir como um estúdio capaz de desenvolver soluções cada vez melhores e mais inovadoras.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Valores</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Qualidade', 'Aprendizado', 'Criatividade', 'Organização', 'Evolução'].map(valor => (
                <span key={valor} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full border border-border">
                  {valor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
