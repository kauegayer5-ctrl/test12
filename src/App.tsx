import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { LugarSection } from '@/components/LugarSection';
import { MenuSection } from '@/components/MenuSection';
import { DrinksAutoraisSection } from '@/components/DrinksAutoraisSection';
import { EspacoSection } from '@/components/EspacoSection';
import { AniversariosSection } from '@/components/AniversariosSection';
import { AgendaSection } from '@/components/AgendaSection';
import { ComoChegarSection } from '@/components/ComoChegarSection';
import { Footer } from '@/components/Footer';

export function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-cream text-navy-soft">
      <a
        href="#cardapio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-navy"
      >
        Pular para o cardápio
      </a>

      <Header />

      <main className="flex-1">
        <Hero />
        <LugarSection />
        <MenuSection />
        <DrinksAutoraisSection />
        <EspacoSection />
        <AniversariosSection />
        <AgendaSection />
        <ComoChegarSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;

