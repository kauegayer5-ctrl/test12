import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';
import { DRINKS_AUTORAIS, type MenuItem } from '@/data/menu';
import { formatBRL } from '@/lib/utils';
import { MenuItemDetail } from './MenuItemDetail';

export function DrinksAutoraisSection() {
  const [selectedDrink, setSelectedDrink] = useState<MenuItem | null>(null);

  return (
    <section id="drinks" className="relative py-16 md:py-24 overflow-hidden">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-sand/75 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              Carta Autoral Mayô
            </span>
            <h2 className="mt-2 font-display text-5xl sm:text-6xl uppercase text-navy">
              Drinks{' '}
              <span className="font-script normal-case text-royal text-6xl sm:text-7xl leading-[1.1] pb-1 inline-block">
                autorais
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-navy-soft">
            Cinco receitas criadas na casa para acompanhar o pôr do sol no Guaíba — do clássico
            Gasômetro à novidade Pura Berga.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DRINKS_AUTORAIS.map((drink, idx) => (
            <motion.button
              key={drink.id}
              type="button"
              onClick={() => setSelectedDrink(drink)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="group text-left flex flex-col justify-between overflow-hidden rounded-2xl border border-navy/12 bg-paper shadow-(--shadow-card) hover:shadow-(--shadow-card-hover) transition-shadow cursor-pointer"
            >
              {drink.thumb ? (
                <div className="relative aspect-4/5 w-full overflow-hidden bg-navy">
                  <img
                    src={drink.thumb}
                    alt={drink.nome}
                    loading="lazy"
                    className="size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {drink.selo && (
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-amber px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-navy shadow-xs">
                      {drink.selo === 'Mais pedido' && <Star className="size-3 fill-navy" />}
                      {drink.selo}
                    </span>
                  )}
                </div>
              ) : (
                <div className="relative aspect-4/5 w-full overflow-hidden bg-royal p-5 flex flex-col justify-between text-cream">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/brand/marmore.webp)' }}
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    {drink.selo && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
                        <Sparkles className="size-3" />
                        {drink.selo}
                      </span>
                    )}
                  </div>
                  <div className="relative z-10 my-auto">
                    <p className="font-script text-4xl text-amber leading-[1.1] pb-1">Autoral</p>
                    <p className="font-display text-4xl uppercase text-white tracking-wide">
                      {drink.nome}
                    </p>
                  </div>
                  <p className="relative z-10 text-[11px] uppercase tracking-widest text-cream/75">
                    Cachaça &amp; Bergamota fresca
                  </p>
                </div>
              )}

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl uppercase text-navy group-hover:text-royal transition-colors">
                      {drink.nome}
                    </h3>
                    <span className="font-display text-2xl text-royal shrink-0">
                      {formatBRL(drink.preco)}
                    </span>
                  </div>

                  {drink.subtitulo && (
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-royal">
                      {drink.subtitulo}
                    </p>
                  )}

                  {drink.notasSabor && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {drink.notasSabor.map((nota) => (
                        <span
                          key={nota}
                          className="rounded-full bg-sand/75 px-2.5 py-0.5 text-[11px] font-medium italic text-navy"
                        >
                          {nota}
                        </span>
                      ))}
                    </div>
                  )}

                  {drink.descricao && (
                    <p className="mt-2.5 text-xs text-navy-soft leading-relaxed">
                      {drink.descricao}
                    </p>
                  )}
                </div>

                <span className="mt-3 pt-2 border-t border-navy/10 text-xs font-semibold text-royal inline-flex items-center justify-between">
                  <span>Ver drink</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <MenuItemDetail item={selectedDrink} onClose={() => setSelectedDrink(null)} />
    </section>
  );
}

