import { Github, MessageSquare, Mail, Twitter, ChevronRight } from "lucide-react";

export function Contact() {
  const links = [
    { name: "GitHub", icon: <Github className="h-5 w-5" />, href: "#" },
    { name: "Discord", icon: <MessageSquare className="h-5 w-5" />, href: "#" },
    { name: "Email", icon: <Mail className="h-5 w-5" />, href: "#" },
    { name: "Redes Sociais", icon: <Twitter className="h-5 w-5" />, href: "#" }
  ];

  return (
    <footer id="contato" className="bg-secondary/30 pt-24 pb-12 border-t border-border">
      <div className="container px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para construir o futuro?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Estamos sempre abertos para novas ideias, colaborações e desafios tecnológicos.
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-border bg-card">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Disponível para novos projetos
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono text-primary mb-6 tracking-wider uppercase">Conecte-se conosco</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-3 font-medium text-foreground">
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                      {link.icon}
                    </div>
                    {link.name}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="NerdCode Studio"
              className="h-5 object-contain opacity-70 hover:opacity-100 transition-opacity"
              style={{ filter: "invert(1) brightness(2)" }}
            />
            <p>&copy; {new Date().getFullYear()} NerdCode Studio. Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary mx-1" />
            <span>foco em qualidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
