import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { AGENDA_SEMANAL, type AgendaEvento } from '@/data/agenda';
import { SITE } from '@/data/site';
import { buildWhatsAppUrl } from '@/lib/utils';
import { PostalStamp } from './PostalStamp';

const CARD_TILTS = [-1.5, 1.3, -1.1, 1.4];

export function AgendaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  // Calcula qual evento é o próximo com base na data local atual
  const { nextEventIndex, pastFlags } = useMemo(() => {
    const now = new Date();
    const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')}`;

    const flags = AGENDA_SEMANAL.map((ev) => ev.dataIso < todayIso);
    const firstUpcoming = flags.findIndex((isPast) => !isPast);
    return {
      nextEventIndex: firstUpcoming === -1 ? AGENDA_SEMANAL.length - 1 : firstUpcoming,
      pastFlags: flags,
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState<number>(nextEventIndex);

  // Ícone de siri em traço que viaja pela linha ondulada conforme o scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 15%'],
  });
  const crabLeft = useTransform(scrollYProgress, [0, 0.5, 1], ['24%', '62%', '82%']);
  const crabY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-4, -12, -2, -10, -4]);

  // Sincroniza a pílula ativa no mobile conforme o carrossel rola
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollCenter = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(scrollCenter - cardCenter);
        if (d < minDist) {
          minDist = d;
          closest = idx;
        }
      });
      setActiveIndex(closest);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToCard = (idx: number) => {
    setActiveIndex(idx);
    const card = cardRefs.current[idx];
    const container = carouselRef.current;
    if (card && container) {
      const targetLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({ left: targetLeft, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="agenda"
      ref={sectionRef}
      className="grain relative w-full bg-royal py-20 md:py-28 text-cream overflow-hidden"
    >
      <div className="container-site relative z-10">
        {/* 1. Abertura centralizada */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-sm sm:text-base text-cream/90 leading-relaxed">
            Toda semana o Mayô reúne{' '}
            <span className="relative inline-block font-medium text-cream">
              música ao vivo
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-1 rounded-full bg-amber/75"
              />
            </span>
            , dose dupla no almoço e o melhor{' '}
            <span className="relative inline-block font-medium text-cream">
              pôr do sol
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-1 rounded-full bg-amber/75"
              />
            </span>{' '}
            da Zona Sul de Porto Alegre.
          </p>

          <h2 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl uppercase text-cream tracking-wide leading-[0.95]">
            O que rola no Mayô essa{' '}
            <span className="relative inline-block font-script normal-case text-amber text-6xl sm:text-7xl md:text-8xl font-normal leading-[1.1] pb-1">
              semana
              {/* Sublinhado desenhado à mão em SVG */}
              <svg
                aria-hidden="true"
                viewBox="0 0 220 18"
                className="pointer-events-none absolute -bottom-1 left-0 w-full h-3.5 text-amber"
                fill="none"
              >
                <path
                  d="M4 12.5C52 4.5 142 3.8 216 10.5M22 15.2C84 10.2 154 9.8 202 13.8"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* 2. Linha do tempo (Desktop: onda pontilhada SVG + pílulas + ícone de siri; Mobile: pílulas roláveis) */}
        <div className="mt-10 md:mt-14">
          {/* Desktop timeline */}
          <div className="hidden md:block relative h-20 max-w-5xl mx-auto">
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 90"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <path
                d="M 30 58 Q 190 14, 350 48 T 670 46 T 970 38"
                fill="none"
                stroke="rgba(234, 232, 223, 0.55)"
                strokeWidth="2"
                strokeDasharray="3 6"
                strokeLinecap="round"
              />
            </svg>

            {/* Ícone da marca (siri em traço do cardápio) que percorre a linha conforme o scroll */}
            <motion.div
              aria-hidden="true"
              style={
                reducedMotion
                  ? { left: '50%', top: '26px' }
                  : { left: crabLeft, y: crabY, top: '26px' }
              }
              className="pointer-events-none absolute -translate-x-1/2 z-20 text-amber drop-shadow-xs"
            >
              <CrabTimelineIcon />
            </motion.div>

            {/* Pílulas de data posicionadas sobre a onda e alinhadas aos 3 cards */}
            <div className="absolute inset-0 grid grid-cols-3 items-center">
              {AGENDA_SEMANAL.map((evento, idx) => {
                const isNext = idx === nextEventIndex;
                const isPast = pastFlags[idx];
                const yOffsets = ['-translate-y-2', 'translate-y-3', '-translate-y-3'];
                return (
                  <div
                    key={evento.id}
                    className={`flex justify-center ${yOffsets[idx % yOffsets.length]}`}
                  >
                    <button
                      type="button"
                      onClick={() => scrollToCard(idx)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                        isNext
                          ? 'bg-cream text-royal shadow-md ring-2 ring-amber scale-105'
                          : 'bg-royal text-cream border border-cream/75 hover:bg-cream/15'
                      } ${isPast ? 'opacity-60' : ''}`}
                    >
                      <span>{evento.data}</span>
                      {isNext && (
                        <span className="rounded-full bg-amber px-1.5 py-0.2 text-[9px] font-extrabold text-navy">
                          PRÓXIMO
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile timeline: faixa de pílulas roláveis sincronizada com o card ativo */}
          <div className="md:hidden flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
            <span aria-hidden="true" className="text-amber shrink-0">
              <CrabTimelineIcon />
            </span>
            {AGENDA_SEMANAL.map((evento, idx) => {
              const isNext = idx === nextEventIndex;
              const isSelected = idx === activeIndex;
              const isPast = pastFlags[idx];
              return (
                <button
                  key={evento.id}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isNext
                      ? 'bg-cream text-royal ring-2 ring-amber shadow-sm'
                      : isSelected
                      ? 'bg-cream/25 text-cream border border-cream'
                      : 'bg-transparent text-cream border border-cream/65'
                  } ${isPast && !isSelected ? 'opacity-60' : ''}`}
                >
                  <span>{evento.data}</span>
                  <span className="text-[10px] opacity-80">· {evento.diaDaSemana.slice(0, 3)}</span>
                  {isNext && (
                    <span className="rounded-full bg-amber px-1.5 text-[9px] font-extrabold text-navy">
                      PRÓXIMO
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Cards em formato de ingresso */}
        <div
          ref={carouselRef}
          className="mt-6 md:mt-8 flex md:grid md:grid-cols-3 gap-6 md:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 py-4 items-stretch"
        >
          {AGENDA_SEMANAL.map((evento, idx) => (
            <TicketCard
              key={evento.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              evento={evento}
              index={idx}
              isNext={idx === nextEventIndex}
              isPast={pastFlags[idx]}
              reducedMotion={Boolean(reducedMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TicketCardProps {
  evento: AgendaEvento;
  index: number;
  isNext: boolean;
  isPast: boolean;
  reducedMotion: boolean;
  ref?: React.Ref<HTMLElement>;
}

function TicketCard({
  evento,
  index,
  isNext,
  isPast,
  reducedMotion,
  ref,
}: TicketCardProps) {
  const [expanded, setExpanded] = useState(false);
  const tilt = reducedMotion ? 0 : CARD_TILTS[index % CARD_TILTS.length];

  const reservaMsg = `Olá! Quero reservar para ${evento.titulo} em ${evento.data} às ${evento.horario}.`;
  const reservaUrl = buildWhatsAppUrl(reservaMsg);

  return (
    <motion.article
      ref={ref}
      style={{ rotate: tilt }}
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: isPast ? 0.9 : 1, y: 0 }}
      whileHover={reducedMotion ? undefined : { rotate: 0, y: -6 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: reducedMotion ? 0 : index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative w-[85vw] max-w-[350px] sm:w-[330px] md:w-auto md:max-w-none shrink-0 snap-center flex flex-col justify-between rounded-md bg-paper text-navy shadow-(--shadow-ticket) hover:shadow-(--shadow-ticket-hover) transition-shadow ${
        isNext ? 'ring-2 ring-amber' : ''
      }`}
    >
      {/* Selo postal sobreposto no canto superior direito */}
      <div className="absolute -top-3.5 right-3 z-20">
        <PostalStamp
          icone={evento.iconeSelo}
          imagem={evento.imagem}
          alt={`Selo ${evento.titulo}`}
          index={index}
        />
      </div>

      {/* Parte superior do ingresso */}
      <div className="p-6 pb-5 pr-28 sm:pr-32">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-6xl sm:text-7xl leading-[0.82] text-royal">
            {evento.diaNumero}
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm tracking-[0.14em] uppercase text-royal">
              {evento.mesExtenso}
            </span>
            <span className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase text-navy/75">
              {evento.diaDaSemana}
            </span>
            {isNext && (
              <span className="mt-0.5 inline-block w-fit rounded-sm bg-amber px-1.5 py-0.2 text-[9px] font-extrabold uppercase tracking-wider text-navy">
                Próxima data
              </span>
            )}
          </div>
        </div>

        {/* Pílula de tipo azul com texto bege + horário grande */}
        <div className="mt-5 flex items-center gap-3">
          <span className="rounded-sm bg-royal px-2.5 py-1 font-display text-sm tracking-[0.12em] uppercase text-cream">
            {evento.tipo}
          </span>
          <span className="font-display text-4xl sm:text-[2.5rem] leading-none text-royal">
            {evento.horario}
          </span>
        </div>

        {/* Título da atração e linha de apoio em caixa-alta espaçada */}
        <h3 className="mt-3 font-display text-3xl sm:text-[2rem] uppercase text-navy leading-[0.98]">
          {evento.titulo}
        </h3>
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/65">
          {evento.localApoio}
        </p>
      </div>

      {/* Picote de ingresso: linha tracejada horizontal com dois recortes semicirculares nas laterais */}
      <div className="relative flex items-center my-1" aria-hidden="true">
        <span className=" -ml-3 size-6 rounded-full bg-royal shrink-0" />
        <div className="w-full border-t-2 border-dashed border-royal/30" />
        <span className="-mr-3 size-6 rounded-full bg-royal shrink-0" />
      </div>

      {/* Parte inferior do ingresso: programação do dia + descrição + rodapé */}
      <div className="flex-1 flex flex-col justify-between p-6 pt-4">
        <div>
          <ul className="space-y-2 border-b border-navy/10 pb-3.5 mb-3">
            {evento.programacaoDia.map((item) => (
              <li
                key={`${item.horario}-${item.atividade}`}
                className="flex items-baseline justify-between gap-2 text-xs"
              >
                <span className="font-semibold text-navy">{item.atividade}</span>
                <span className="text-[11px] font-medium text-royal shrink-0">{item.horario}</span>
              </li>
            ))}
          </ul>

          <p
            className={`text-xs text-navy-soft leading-relaxed ${
              expanded ? '' : 'line-clamp-3'
            }`}
          >
            {evento.descricao}
          </p>
          {evento.descricao.length > 120 && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-1 text-[11px] font-semibold text-royal hover:underline cursor-pointer"
            >
              {expanded ? 'ver menos' : 'ver mais'}
            </button>
          )}
        </div>

        {/* Rodapé do card: botão em pílula azul "Reservar →" + logo oficial pequeno */}
        <div className="mt-5 pt-3.5 border-t border-navy/10 flex items-center justify-between gap-3">
          <a
            href={reservaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-royal px-5 py-2 font-display text-sm tracking-widest uppercase text-cream shadow-xs transition-all hover:bg-royal-700 active:scale-[0.98]"
          >
            <span>Reservar</span>
            <span aria-hidden="true">→</span>
          </a>

          <img
            src={SITE.logo}
            alt="Mayô"
            width={32}
            height={32}
            loading="lazy"
            className="size-8 rounded-md object-cover ring-1 ring-royal/20"
          />
        </div>
      </div>
    </motion.article>
  );
}

/** Ícone de siri/caranguejo em traço simples, inspirado nas ilustrações das bordas do cardápio */
function CrabTimelineIcon() {
  return (
    <svg
      viewBox="0 0 48 32"
      className="w-9 h-6 stroke-current fill-none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Casco */}
      <ellipse cx="24" cy="18" rx="10" ry="6.5" />
      {/* Olhos */}
      <line x1="20" y1="11.5" x2="19" y2="8.5" />
      <line x1="28" y1="11.5" x2="29" y2="8.5" />
      <circle cx="19" cy="8" r="1" fill="currentColor" />
      <circle cx="29" cy="8" r="1" fill="currentColor" />
      {/* Pinças */}
      <path d="M14 15 C9 12, 8 7, 12 6 C14 7, 14 10, 12 11" />
      <path d="M34 15 C39 12, 40 7, 36 6 C34 7, 34 10, 36 11" />
      {/* Patas */}
      <path d="M14 18 L7 18 L5 21" />
      <path d="M15 21 L9 23 L7 26" />
      <path d="M34 18 L41 18 L43 21" />
      <path d="M33 21 L39 23 L41 26" />
    </svg>
  );
}

