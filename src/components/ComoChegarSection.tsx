import { motion } from 'motion/react';
import { Clock, ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { HORARIOS, HORARIOS_NOTA, LINKS, SITE } from '@/data/site';
import { buildWhatsAppUrl } from '@/lib/utils';

export function ComoChegarSection() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá! Gostaria de tirar uma dúvida sobre horários e reservas no Mayô.'
  );

  return (
    <section
      id="como-chegar"
      className="relative py-16 md:py-24 border-t border-navy/12 bg-cream"
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-navy/15 bg-paper p-6 sm:p-8 shadow-(--shadow-card)">
            <div>
              <span className="inline-block rounded-full bg-royal/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-royal">
                Zona Sul · Porto Alegre
              </span>
              <h2 className="mt-2 font-display text-5xl uppercase text-navy">
                Como chegar &amp;{' '}
                <span className="font-script normal-case text-royal text-6xl leading-[1.1] pb-1 inline-block">
                  horários
                </span>
              </h2>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-cream/80 p-4 border border-navy/10">
                <MapPin className="size-5 text-royal shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-navy">
                    {SITE.endereco.rua} – {SITE.endereco.bairro}
                  </p>
                  <p className="text-xs text-navy-soft">
                    {SITE.endereco.cidade} · {SITE.endereco.regiao}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy mb-3">
                  <Clock className="size-4 text-royal" />
                  <span>Horários de funcionamento</span>
                </div>

                <ul className="divide-y divide-navy/10 rounded-xl border border-navy/12 bg-cream/55 px-4">
                  {HORARIOS.map((h) => (
                    <li
                      key={h.dias}
                      className="flex items-center justify-between py-3 text-sm"
                    >
                      <span className="font-medium text-navy">{h.dias}</span>
                      <span className="font-semibold text-royal">{h.horas}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-2 text-xs text-navy-soft italic">{HORARIOS_NOTA}</p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={LINKS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-royal px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-royal-700 transition-all"
              >
                <ExternalLink className="size-4" />
                <span>Abrir no Maps</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/25 bg-cream px-5 py-3 text-sm font-semibold text-navy hover:border-royal hover:bg-white transition-all"
              >
                <MessageCircle className="size-4 text-royal" />
                <span>Chamar no WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-navy/15 bg-paper shadow-(--shadow-card) min-h-[340px] sm:min-h-[420px]">
            <iframe
              title="Mapa Mayô Bar & Restaurante — Av. Guaíba, 4127"
              src={LINKS.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[340px] sm:min-h-[420px] border-0"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

