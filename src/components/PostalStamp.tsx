import { motion, useReducedMotion } from 'motion/react';
import type { AgendaIconeSelo } from '@/data/agenda';

interface PostalStampProps {
  icone: AgendaIconeSelo;
  imagem?: string;
  alt: string;
  index?: number;
}

/**
 * Selo postal reutilizável com borda serrilhada (perfuração filatélica),
 * listras azul royal e bege/creme quando não há foto, e ícone em traço.
 */
export function PostalStamp({ icone, imagem, alt, index = 0 }: PostalStampProps) {
  const reducedMotion = useReducedMotion();
  const baseRotation = index % 2 === 0 ? 5.5 : -5;

  return (
    <motion.div
      style={{ rotate: reducedMotion ? 0 : baseRotation }}
      initial={
        reducedMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 1.38 }
      }
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.42,
        delay: reducedMotion ? 0 : 0.28 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-label={alt}
      className="relative w-24 h-20 sm:w-28 sm:h-22 select-none drop-shadow-[0_6px_12px_rgba(16,59,116,0.28)]"
    >
      {/* Fundo de papel com perfuração serrilhada em máscara radial */}
      <div
        className="size-full p-2 bg-paper"
        style={{
          backgroundImage:
            'radial-gradient(circle at 4px 4px, transparent 3.2px, var(--color-paper) 3.6px)',
          backgroundSize: '10px 10px',
          backgroundPosition: '-5px -5px',
          border: '2px dashed var(--color-royal)',
          borderRadius: '4px',
        }}
      >
        {/* Interior do selo: foto do artista/evento ou listras azul & bege com ícone */}
        <div
          className="relative size-full overflow-hidden rounded-[2px] border border-royal/40 flex items-center justify-center"
          style={
            imagem
              ? undefined
              : {
                  backgroundImage:
                    'repeating-linear-gradient(0deg, var(--color-royal) 0px, var(--color-royal) 9px, var(--color-paper) 9px, var(--color-paper) 18px)',
                }
          }
        >
          {imagem ? (
            <img src={imagem} alt={alt} loading="lazy" className="size-full object-cover" />
          ) : (
            <div className="size-11 sm:size-12 rounded-full bg-paper/95 border-2 border-royal flex items-center justify-center shadow-xs text-royal">
              <StampIcon icone={icone} />
            </div>
          )}

          {/* Carimbo circular sutil no canto */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1.5 -left-1.5 rounded-full border border-navy/35 bg-paper/85 px-1.5 py-0.5 font-display text-[9px] tracking-widest text-navy uppercase"
          >
            POA · RS
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function StampIcon({ icone }: { icone: AgendaIconeSelo }) {
  switch (icone) {
    case 'pandeiro':
      return (
        <svg viewBox="0 0 32 32" className="size-6 stroke-current fill-none" strokeWidth="1.9">
          <ellipse cx="16" cy="15" rx="10" ry="6.5" />
          <path d="M6 15v4c0 3.6 4.5 6.5 10 6.5s10-2.9 10-6.5v-4" />
          <line x1="9" y1="21" x2="9" y2="23.5" />
          <line x1="16" y1="22.5" x2="16" y2="25" />
          <line x1="23" y1="21" x2="23" y2="23.5" />
          <path d="M11 13.5c2-1.2 6-1.2 8 0" strokeLinecap="round" />
        </svg>
      );
    case 'disco':
      return (
        <svg viewBox="0 0 32 32" className="size-6 stroke-current fill-none" strokeWidth="1.9">
          <circle cx="16" cy="16" r="11" />
          <circle cx="16" cy="16" r="3.2" />
          <path d="M10.5 11.5a7.5 7.5 0 0 1 5-2" strokeLinecap="round" />
          <path d="M21.5 20.5a7.5 7.5 0 0 1-5 2" strokeLinecap="round" />
        </svg>
      );
    case 'microfone':
      return (
        <svg viewBox="0 0 32 32" className="size-6 stroke-current fill-none" strokeWidth="1.9">
          <rect x="12" y="5" width="8" height="13" rx="4" />
          <path d="M8.5 14a7.5 7.5 0 0 0 15 0" strokeLinecap="round" />
          <line x1="16" y1="21.5" x2="16" y2="27" strokeLinecap="round" />
          <line x1="11.5" y1="27" x2="20.5" y2="27" strokeLinecap="round" />
        </svg>
      );
    case 'sol':
    default:
      return (
        <svg viewBox="0 0 32 32" className="size-6 stroke-current fill-none" strokeWidth="1.9">
          <path d="M8 20a8 8 0 0 1 16 0" />
          <line x1="4" y1="20" x2="28" y2="20" strokeLinecap="round" />
          <line x1="7" y1="24" x2="25" y2="24" strokeLinecap="round" />
          <line x1="16" y1="7" x2="16" y2="9.5" strokeLinecap="round" />
          <line x1="8" y1="10.5" x2="9.8" y2="12.3" strokeLinecap="round" />
          <line x1="24" y1="10.5" x2="22.2" y2="12.3" strokeLinecap="round" />
        </svg>
      );
  }
}

