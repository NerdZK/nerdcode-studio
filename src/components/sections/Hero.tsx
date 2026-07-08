import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <div className="container px-6 relative z-10 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          System Online
        </div>

        <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm animate-in fade-in zoom-in duration-700 delay-100 ease-out fill-mode-both">
          <img 
            src="/logo.png" 
            alt="NerdCode Studio Logo" 
            className="h-12 md:h-16 object-contain invert"
            style={{ filter: "invert(1) brightness(2)" }} 
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 ease-out fill-mode-both">
          Desenvolvendo softwares, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            bots e soluções digitais.
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 ease-out fill-mode-both">
          Um estúdio de desenvolvimento focado em criar experiências digitais, automações e ferramentas modernas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 ease-out fill-mode-both">
          <Button size="lg" className="group" asChild>
            <a href="#projetos">
              Conhecer projetos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#sobre">Sobre a NerdCode Studio</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#sobre" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}
