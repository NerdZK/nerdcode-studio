import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Team } from '@/components/sections/Team';
import { Manifesto } from '@/components/sections/Manifesto';
import { Contact } from '@/components/sections/Contact';
import { Admin } from '@/pages/admin';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Team />
        <Manifesto />
      </main>
      <Contact />
    </div>
  );
}

function App() {
  const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  return (
    <TooltipProvider>
      {isAdmin ? <Admin /> : <Home />}
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
