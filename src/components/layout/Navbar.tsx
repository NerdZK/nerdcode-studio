export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 transition-opacity hover:opacity-80" aria-label="NerdCode Studio">
          <span className="font-bold text-lg tracking-tight">
            Nerd<span className="text-primary">Code</span>
          </span>
          <span className="hidden sm:inline text-xs font-mono text-muted-foreground tracking-wider uppercase">
            Studio
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#sobre" className="hover:text-foreground transition-colors">Sobre</a>
          <a href="#servicos" className="hover:text-foreground transition-colors">Serviços</a>
          <a href="#projetos" className="hover:text-foreground transition-colors">Projetos</a>
          <a href="#equipe" className="hover:text-foreground transition-colors">Equipe</a>
          <a href="#contato" className="text-primary hover:text-primary/80 transition-colors">Contato</a>
        </nav>
      </div>
    </header>
  );
}
