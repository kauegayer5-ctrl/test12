import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE } from '@/data/site';

const HEADER_LINKS = [
  { id: 'cardapio', label: 'Cardápio' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'espaco', label: 'Espaço' },
  { id: 'aniversarios', label: 'Aniversários' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'como-chegar', label: 'Como chegar' },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-royal/95 text-cream shadow-md backdrop-blur-md py-2.5'
          : 'bg-transparent text-white py-4'
      }`}
    >
      <div className="container-site flex items-center justify-between gap-4">
        <a
          href="#topo"
          className="flex items-center gap-3 group"
          aria-label="Mayô Bar & Restaurante — voltar ao topo"
        >
          <img
            src={SITE.logo}
            alt="Logo Mayô"
            width={44}
            height={44}
            className="size-11 rounded-lg object-cover ring-1 ring-white/25 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg tracking-wider text-white">
              BAR &amp; RESTAURANTE
            </span>
            <span className="text-[11px] text-white/75">Vila Assunção · Beira do Guaíba</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
          {HEADER_LINKS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm font-medium text-white/90 hover:text-amber transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#aniversarios"
            className="inline-flex items-center justify-center rounded-full bg-amber px-5 py-2.5 text-xs sm:text-sm font-semibold text-navy shadow-sm transition-all duration-200 hover:brightness-95 active:scale-[0.98]"
          >
            Reservar
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="inline-flex md:hidden items-center justify-center size-10 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Menu mobile"
          className="md:hidden border-t border-white/15 bg-royal/98 px-5 pt-3 pb-5 mt-2.5"
        >
          <ul className="flex flex-col gap-1">
            {HEADER_LINKS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-base font-medium text-cream hover:bg-white/10 hover:text-amber transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-white/50">→</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

