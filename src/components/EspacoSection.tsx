import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function EspacoSection() {
  return (
    <section
      id="espaco"
      className="relative py-16 md:py-24 border-t border-navy/12 bg-cream-deep/45"
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-royal/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-royal">
              Varanda · Interno · Deck
            </span>
            <h2 className="mt-2 font-display text-5xl sm:text-6xl uppercase text-navy">
              Conheça o nosso{' '}
              <span className="font-script normal-case text-royal text-6xl sm:text-7xl leading-[1.1] pb-1 inline-block">
                espaço
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-navy-soft leading-relaxed">
              Ambientes pensados para o fim de tarde de frente para o Guaíba, almoços de fim de
              semana em família e comemorações com os amigos.
            </p>
          </div>

          {/* SLOT: carrossel React Bits com fotos do espaço (varanda, interno, deck) */}
          <div className="mt-8 rounded-2xl border-2 border-dashed border-royal/30 bg-paper/75 p-10 sm:p-14 text-center">
            <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-royal/10 text-royal">
              <Sparkles className="size-6" />
            </div>
            <p className="mt-3 font-display text-2xl uppercase text-navy tracking-wide">
              SLOT: carrossel React Bits com fotos do espaço (varanda, interno, deck)
            </p>
            <p className="mt-1.5 mx-auto max-w-lg text-xs sm:text-sm text-navy-soft">
              Área reservada para o componente de galeria/carrossel do React Bits que será
              instalado na próxima fase com as fotos oficiais da varanda, área interna e deck.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

