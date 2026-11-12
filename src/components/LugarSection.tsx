import { motion } from 'motion/react';
import { Sun, Music, Martini, UtensilsCrossed } from 'lucide-react';
import { LUGAR, SITE } from '@/data/site';

const ICONS = [Sun, Music, Martini, UtensilsCrossed];

export function LugarSection() {
  return (
    <section id="o-lugar" className="relative py-16 md:py-24 overflow-hidden">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-5">
            <span className="inline-block rounded-full bg-sand/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              {SITE.endereco.bairro} · Zona Sul
            </span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl uppercase text-navy">
              {LUGAR.titulo}{' '}
              <span className="font-script normal-case text-royal text-5xl sm:text-6xl leading-[1.1] pb-1 inline-block">
                Guaíba
              </span>
            </h2>
            <p className="mt-4 text-base text-navy-soft leading-relaxed">{LUGAR.texto}</p>

            <div className="mt-6 rounded-2xl border border-navy/15 bg-cream-deep/55 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy">
                Informações complementares da casa
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {LUGAR.extras.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-navy border border-navy/15"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LUGAR.destaques.map((d, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              return (
                <div
                  key={d.titulo}
                  className="rounded-2xl border border-navy/12 bg-paper p-6 shadow-(--shadow-card) transition-all duration-200 hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)"
                >
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-royal text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl uppercase text-navy">{d.titulo}</h3>
                  <p className="mt-1.5 text-sm text-navy-soft leading-relaxed">{d.texto}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

