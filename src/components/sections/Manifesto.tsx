export function Manifesto() {
  const principles = [
    "A tecnologia é uma ferramenta.",
    "A criatividade transforma ideias em realidade.",
    "Todo projeto é uma oportunidade de aprender.",
    "Qualidade vem antes de velocidade."
  ];

  return (
    <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 skew-x-12 -translate-x-1/4 pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-mono text-primary-foreground/70 mb-8 tracking-wider uppercase">Manifesto da Marca</h2>
          
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-16 tracking-tight">
            "Transformamos ideias em software através de criatividade, aprendizado e evolução constante."
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {principles.map((principle, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="font-mono text-xl text-primary-foreground/40 mt-1">
                  0{index + 1}
                </div>
                <p className="text-lg md:text-xl font-medium">
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
