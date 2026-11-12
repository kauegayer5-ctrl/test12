import { motion } from 'motion/react';
import { MapPin, Sparkles } from 'lucide-react';
import { SITE } from '@/data/site';

export function Hero() {
  return (
    <section
      id="topo"
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-24 pb-12 text-white"
      style={{
        background:
          'linear-gradient(180deg, var(--color-dusk-1) 0%, var(--color-dusk-2) 26%, var(--color-dusk-3) 54%, var(--color-dusk-4) 76%, var(--color-dusk-5) 91%, var(--color-dusk-6) 100%)',
      }}
    >
      {/* Brilho solar no horizonte do Guaíba */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 38% at 50% 88%, rgba(253, 210, 122, 0.58) 0%, rgba(246, 162, 58, 0.22) 45%, transparent 78%)',
        }}
      />

      {/* Reflexo sutil da água na base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-35"
        style={{
          background:
            'repeating-linear-gradient(180deg, rgba(16, 59, 116, 0.0) 0px, rgba(16, 59, 116, 0.0) 6px, rgba(16, 59, 116, 0.35) 7px, rgba(16, 59, 116, 0.0) 12px)',
        }}
      />

      {/* SLOT: animação de scroll do pôr do sol para dentro do bar */}
      <div className="container-site relative z-10 my-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center flex flex-col items-center"
        >
          {/* Logo oficial da marca */}
          <div className="mb-6 rounded-2xl bg-royal p-1.5 shadow-xl ring-2 ring-white/25">
            <img
              src={SITE.logo}
              alt="Mayô"
              width={112}
              height={112}
              className="size-24 sm:size-28 rounded-xl object-cover"
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-navy/45 px-4 py-1.5 text-xs font-medium tracking-wide text-cream ring-1 ring-white/20 backdrop-blur-sm mb-5">
            <MapPin className="size-3.5 text-amber" />
            <span>{SITE.endereco.rua} · {SITE.endereco.bairro}, Porto Alegre</span>
          </div>

          {/* SLOT: headline com o Y de MAYÔ como taça de martini (arte própria a ser enviada) */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase tracking-wide text-white drop-shadow-sm">
            O seu lugar ao{' '}
            <span className="font-script normal-case text-amber text-6xl sm:text-8xl md:text-[6.2rem] font-normal inline-block leading-[1.1] pb-1">
              pôr do sol
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base sm:text-lg text-white/92 leading-relaxed font-normal">
            Bar e restaurante à beira do Guaíba, na Zona Sul de Porto Alegre. Drinks autorais,
            petiscos para compartilhar, almoço de fim de semana e música no fim de tarde.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <a
              href="#cardapio"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-royal px-8 py-3.5 text-base font-semibold text-white shadow-lg ring-1 ring-white/25 transition-all duration-200 hover:bg-royal-700 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Ver cardápio
            </a>
            <a
              href="#aniversarios"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-cream px-8 py-3.5 text-base font-semibold text-navy shadow-lg transition-all duration-200 hover:bg-white hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Reservar mesa ou aniversário
            </a>
          </div>

          {/* Indicadores discretos dos SLOTs previstos para a Fase 2 */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-[11px] text-navy/85">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/85 px-3 py-1 font-medium shadow-xs">
              <Sparkles className="size-3 text-royal" />
              SLOT: animação de scroll do pôr do sol para dentro do bar
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/85 px-3 py-1 font-medium shadow-xs">
              <Sparkles className="size-3 text-royal" />
              SLOT: headline com o Y de MAYÔ como taça de martini
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

