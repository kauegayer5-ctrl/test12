import { Instagram, MapPin } from 'lucide-react';
import { HORARIOS, LINKS, NAV, SITE } from '@/data/site';

export function Footer() {
  return (
    <footer className="relative bg-navy text-cream overflow-hidden">
      {/* Faixa sutil com o grafismo de frutos do mar do cardápio */}
      <div
        aria-hidden="true"
        className="w-full h-11 bg-repeat-x bg-top opacity-25 invert"
        style={{
          backgroundImage: 'url(/brand/grafismo-frutos-do-mar.webp)',
          backgroundSize: 'auto 100%',
        }}
      />

      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={SITE.logo}
                alt="Logo Mayô"
                width={56}
                height={56}
                loading="lazy"
                className="size-14 rounded-xl object-cover ring-1 ring-white/25"
              />
              <div>
                <p className="font-display text-2xl tracking-wider uppercase text-white">
                  {SITE.nome}
                </p>
                <p className="font-script text-2xl text-amber leading-[1.1] pb-0.5">
                  {SITE.slogan}
                </p>
              </div>
            </div>

            <p className="text-sm text-cream/80 max-w-sm leading-relaxed">
              Drinks autorais, gastronomia, música ao vivo e pôr do sol na beira do Guaíba, em
              Porto Alegre.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-royal px-4 py-2 text-xs font-semibold text-white hover:bg-royal-700 transition-colors"
              >
                <Instagram className="size-4 text-amber" />
                <span>{LINKS.instagramHandle}</span>
              </a>

              <a
                href={LINKS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 px-4 py-2 text-xs font-medium text-cream hover:bg-white/10 transition-colors"
              >
                <MapPin className="size-3.5 text-amber" />
                <span>{SITE.endereco.rua}</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-display text-lg uppercase tracking-wider text-amber">Navegação</p>
            <ul className="mt-3 space-y-2 text-sm text-cream/85">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-amber transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#agenda" className="hover:text-amber transition-colors">
                  Agenda da semana
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-display text-lg uppercase tracking-wider text-amber">
              Endereço &amp; Horários
            </p>
            <p className="mt-3 text-sm text-cream/85">
              {SITE.endereco.rua} – {SITE.endereco.bairro}, {SITE.endereco.cidade}
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-cream/80">
              {HORARIOS.map((h) => (
                <li key={h.dias} className="flex items-center justify-between gap-2">
                  <span>{h.dias}</span>
                  <span className="font-semibold text-cream">{h.horas}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} {SITE.nome}. Todos os direitos reservados.</p>
          <p>Av. Guaíba, 4127 · Vila Assunção · Porto Alegre/RS</p>
        </div>
      </div>
    </footer>
  );
}

