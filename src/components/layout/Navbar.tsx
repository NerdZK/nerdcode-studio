export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img
            src="/logo.png"
            alt="NerdCode Studio"
            className="h-7 object-contain"
            style={{ filter: "invert(1) brightness(2)" }}
          />
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
