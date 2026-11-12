import { useEffect, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MENU_CATEGORIES, type MenuItem } from '@/data/menu';
import { formatBRL } from '@/lib/utils';

interface MenuItemDetailProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function MenuItemDetail({ item, onClose }: MenuItemDetailProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  useEffect(() => {
    setSelectedVariantIdx(0);
  }, [item?.id]);

  if (!item) return null;

  const category = MENU_CATEGORIES.find((c) => c.id === item.categoria);
  const activeArt = item.fotosVariantes?.[selectedVariantIdx]?.art ?? item.art;

  const body = (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
      {activeArt ? (
        <div className="md:col-span-6 flex flex-col gap-2.5">
          <div className="relative mx-auto w-full max-w-[300px] md:max-w-none aspect-9/16 overflow-hidden rounded-2xl bg-navy shadow-md ring-1 ring-navy/15">
            <img
              src={activeArt}
              alt={item.nome}
              className="size-full object-cover object-center"
            />
          </div>

          {item.fotosVariantes && item.fotosVariantes.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {item.fotosVariantes.map((v, idx) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    idx === selectedVariantIdx
                      ? 'bg-royal text-white'
                      : 'bg-cream-deep text-navy hover:bg-sand'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}

      <div className={`${activeArt ? 'md:col-span-6' : 'md:col-span-12'} flex flex-col gap-4`}>
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className="rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-royal">
              {category.nome}
            </span>
          )}
          {item.subgrupo && (
            <span className="rounded-full bg-cream-deep px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              {item.subgrupo}
            </span>
          )}
          {item.selo && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
              {item.selo === 'Mais pedido' ? (
                <Star className="size-3.5 fill-navy" />
              ) : (
                <Sparkles className="size-3.5" />
              )}
              {item.selo}
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-4 border-b border-navy/12 pb-3">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl uppercase text-navy leading-none">
              {item.nome}
            </h3>
            {item.subtitulo && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-royal">
                {item.subtitulo}
              </p>
            )}
          </div>
          <span className="font-display text-3xl sm:text-4xl text-royal shrink-0">
            {formatBRL(item.preco)}
          </span>
        </div>

        {item.notasSabor && item.notasSabor.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.notasSabor.map((nota) => (
              <span
                key={nota}
                className="rounded-full bg-sand/75 px-3 py-1 text-xs font-medium italic text-navy"
              >
                {nota}
              </span>
            ))}
          </div>
        )}

        {item.destaque && (
          <div className="rounded-xl bg-sand/85 px-3.5 py-2 text-xs font-semibold text-navy">
            {item.destaque}
          </div>
        )}

        {item.descricao && (
          <p className="text-sm sm:text-base text-navy-soft leading-relaxed">{item.descricao}</p>
        )}

        {item.precosVariantes && item.precosVariantes.length > 0 && (
          <div className="rounded-xl border border-navy/12 bg-cream/70 p-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-navy mb-2">
              Opções de escolha
            </p>
            <ul className="space-y-1.5">
              {item.precosVariantes.map((v) => (
                <li
                  key={v.label}
                  className="flex items-center justify-between text-sm text-navy-soft"
                >
                  <span>{v.label}</span>
                  <span className="font-semibold text-navy">{formatBRL(v.preco)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.opcoesProteina && item.opcoesProteina.length > 0 && (
          <div className="rounded-xl bg-sand/65 p-3.5">
            <p className="text-xs font-bold italic text-navy mb-2">Opções de proteína</p>
            <ul className="space-y-1.5">
              {item.opcoesProteina.map((op) => (
                <li
                  key={op.nome}
                  className="flex items-center justify-between text-sm text-navy"
                >
                  <span>{op.nome}</span>
                  <span className="font-semibold">+ {formatBRL(op.preco)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.adicionais && item.adicionais.length > 0 && (
          <div className="rounded-xl bg-sand/65 p-3.5">
            <p className="text-xs font-bold italic text-navy mb-2">Adicionais</p>
            <ul className="space-y-1.5">
              {item.adicionais.map((ad) => (
                <li
                  key={ad.nome}
                  className="flex items-center justify-between text-sm text-navy"
                >
                  <span>{ad.nome}</span>
                  <span className="font-semibold">+ {formatBRL(ad.preco)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-2xl bg-paper border-navy/15 p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>{item.nome}</DialogTitle>
            <DialogDescription>{item.descricao ?? item.nome}</DialogDescription>
          </DialogHeader>
          {body}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-paper border-navy/15 max-h-[90dvh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{item.nome}</DrawerTitle>
          <DrawerDescription>{item.descricao ?? item.nome}</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-5 pt-3 pb-7">{body}</div>
      </DrawerContent>
    </Drawer>
  );
}

