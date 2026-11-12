import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Star, X } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuBadge,
  type MenuCategoryId,
  type MenuItem,
} from '@/data/menu';
import { formatBRL } from '@/lib/utils';
import { MenuItemDetail } from './MenuItemDetail';

interface MenuSectionProps {
  onSelectItem?: (item: MenuItem) => void;
}

export function MenuSection({ onSelectItem }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | 'todos'>(
    'entradas-petiscos'
  );
  const [badgeFilter, setBadgeFilter] = useState<MenuBadge | null>(null);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const openDetail = (item: MenuItem) => {
    setSelectedItem(item);
    onSelectItem?.(item);
  };

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (badgeFilter && item.selo !== badgeFilter) return false;
      if (q) {
        const hay = `${item.nome} ${item.descricao ?? ''} ${item.subtitulo ?? ''} ${(
          item.notasSabor ?? []
        ).join(' ')}`.toLowerCase();
        return hay.includes(q);
      }
      if (activeCategory !== 'todos' && item.categoria !== activeCategory) return false;
      return true;
    });
  }, [activeCategory, badgeFilter, search]);

  const currentCategoryMeta = MENU_CATEGORIES.find((c) => c.id === activeCategory);

  const toggleBadge = (badge: MenuBadge) => {
    setBadgeFilter((prev) => {
      const next = prev === badge ? null : badge;
      if (next) setActiveCategory('todos');
      return next;
    });
  };

  return (
    <section
      id="cardapio"
      className="relative py-16 md:py-24 border-y border-navy/12 bg-cream"
    >
      {/* Faixa decorativa do grafismo de frutos do mar do cardápio */}
      <div
        aria-hidden="true"
        className="w-full h-10 sm:h-14 bg-repeat-x bg-top opacity-85 mb-8"
        style={{
          backgroundImage: 'url(/brand/grafismo-frutos-do-mar.webp)',
          backgroundSize: 'auto 100%',
        }}
      />

      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-block rounded-full bg-royal/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-royal">
              Cardápio Interativo · 07/26
            </span>
            <h2 className="mt-2 font-display text-5xl sm:text-6xl uppercase text-navy">
              Sabores do{' '}
              <span className="font-script normal-case text-royal text-6xl sm:text-7xl leading-[1.1] pb-1 inline-block">
                Mayô
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-navy-soft">
              Toque em qualquer prato ou drink para ver a arte completa, ingredientes, opções de
              proteína e adicionais.
            </p>
          </div>

          {/* Busca + filtros rápidos ("Mais pedidos" e "Novidades") */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-navy/50" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar prato, drink ou ingrediente..."
                aria-label="Buscar no cardápio"
                className="h-10 w-full sm:w-64 rounded-full border border-navy/20 bg-paper pl-9 pr-8 text-sm text-navy placeholder:text-navy/45 focus:border-royal focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Limpar busca"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy/60 hover:text-navy cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleBadge('Mais pedido')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  badgeFilter === 'Mais pedido'
                    ? 'bg-amber text-navy ring-2 ring-navy shadow-xs'
                    : 'bg-paper text-navy border border-navy/15 hover:bg-amber/40'
                }`}
              >
                <Star className="size-3.5 fill-amber text-navy" />
                Mais pedidos
              </button>

              <button
                type="button"
                onClick={() => toggleBadge('Novidade')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  badgeFilter === 'Novidade'
                    ? 'bg-amber text-navy ring-2 ring-navy shadow-xs'
                    : 'bg-paper text-navy border border-navy/15 hover:bg-amber/40'
                }`}
              >
                <Sparkles className="size-3.5 text-navy" />
                Novidades
              </button>
            </div>
          </div>
        </div>

        {/* Abas / chips roláveis de categorias */}
        <div
          role="tablist"
          aria-label="Categorias do cardápio"
          className="mt-7 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap"
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id && !badgeFilter && !search;
            return (
              <button
                key={cat.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setBadgeFilter(null);
                  setSearch('');
                }}
                className={`shrink-0 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-royal text-white shadow-sm'
                    : 'bg-paper text-navy border border-navy/15 hover:border-royal/40 hover:bg-white'
                }`}
              >
                {cat.nome}
              </button>
            );
          })}
          <button
            role="tab"
            type="button"
            aria-selected={activeCategory === 'todos' && !badgeFilter}
            onClick={() => {
              setActiveCategory('todos');
              setBadgeFilter(null);
            }}
            className={`shrink-0 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === 'todos' && !badgeFilter
                ? 'bg-navy text-white shadow-sm'
                : 'bg-cream-deep text-navy hover:bg-sand/70'
            }`}
          >
            Ver tudo ({MENU_ITEMS.length})
          </button>
        </div>

        {/* Faixa de aviso da categoria (ex.: Adicional de batata frita / Kids) */}
        {currentCategoryMeta &&
          (currentCategoryMeta.adicionalCategoria || currentCategoryMeta.observacaoCategoria) &&
          !badgeFilter &&
          !search && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sand px-4 py-2 text-xs sm:text-sm font-semibold italic text-navy">
              <span>
                {currentCategoryMeta.observacaoCategoria ??
                  currentCategoryMeta.adicionalCategoria}
              </span>
            </div>
          )}

        {/* Grid de cards do cardápio */}
        {filteredItems.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-navy/15 bg-paper p-10 text-center">
            <p className="font-display text-2xl uppercase text-navy">Nenhum item encontrado</p>
            <p className="mt-1 text-sm text-navy-soft">
              Tente outro termo ou limpe os filtros ativos.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setBadgeFilter(null);
                setActiveCategory('entradas-petiscos');
              }}
              className="mt-4 rounded-full bg-royal px-5 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              Mostrar cardápio
            </button>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onSelect={() => openDetail(item)} />
            ))}
          </div>
        )}
      </div>

      {/* Faixa decorativa inferior */}
      <div
        aria-hidden="true"
        className="w-full h-10 sm:h-14 bg-repeat-x bg-bottom opacity-85 mt-12"
        style={{
          backgroundImage: 'url(/brand/grafismo-frutos-do-mar.webp)',
          backgroundSize: 'auto 100%',
        }}
      />

      <MenuItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}

function MenuCard({ item, onSelect }: { item: MenuItem; onSelect: () => void }) {
  const hasPhoto = Boolean(item.thumb);

  if (hasPhoto) {
    return (
      <motion.button
        type="button"
        onClick={onSelect}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="group text-left flex flex-row sm:flex-col overflow-hidden rounded-2xl border border-navy/12 bg-paper shadow-(--shadow-card) hover:shadow-(--shadow-card-hover) transition-shadow cursor-pointer"
      >
        <div className="relative w-32 sm:w-full aspect-4/5 shrink-0 overflow-hidden bg-navy/10">
          <img
            src={item.thumb}
            alt={item.nome}
            loading="lazy"
            className="size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {item.selo && (
            <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-amber px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-navy shadow-xs">
              {item.selo === 'Mais pedido' && <Star className="size-3 fill-navy" />}
              {item.selo}
            </span>
          )}
          {item.fotosVariantes && item.fotosVariantes.length > 1 && (
            <span className="absolute bottom-2 right-2 rounded-full bg-navy/85 px-2.5 py-0.5 text-[10px] font-medium text-cream backdrop-blur-xs">
              {item.fotosVariantes.length} sabores
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-2xl uppercase text-navy group-hover:text-royal transition-colors">
                {item.nome}
              </h3>
              <span className="font-display text-2xl text-royal shrink-0">
                {formatBRL(item.preco)}
              </span>
            </div>

            {item.subtitulo && (
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-royal">
                {item.subtitulo}
              </p>
            )}

            {item.notasSabor && (
              <p className="mt-1 text-xs italic text-navy/80">
                {item.notasSabor.join(' · ')}
              </p>
            )}

            {item.destaque && (
              <span className="mt-1.5 inline-block rounded-md bg-sand/85 px-2 py-0.5 text-[11px] font-semibold italic text-navy">
                {item.destaque}
              </span>
            )}

            {item.descricao && (
              <p className="mt-2 text-xs sm:text-sm text-navy-soft line-clamp-2 leading-relaxed">
                {item.descricao}
              </p>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-navy/10 flex items-center justify-between text-xs font-medium text-royal">
            <span>
              {item.opcoesProteina
                ? `+ ${item.opcoesProteina.length} opções de proteína`
                : item.adicionais
                ? `+ ${item.adicionais.length} ${
                    item.adicionais.length > 1 ? 'adicionais' : 'adicional'
                  }`
                : 'Ver detalhe'}
            </span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </div>
        </div>
      </motion.button>
    );
  }

  // Card tipográfico para itens sem foto (nunca usa imagem de banco ou gerada)
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative text-left flex flex-col justify-between overflow-hidden rounded-2xl border border-navy/15 bg-paper p-5 shadow-(--shadow-card) hover:border-royal/40 hover:shadow-(--shadow-card-hover) transition-all cursor-pointer"
    >
      {/* Detalhe náutico sutil no canto */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-5 font-display text-7xl uppercase text-navy/4 select-none"
      >
        MAYÔ
      </span>

      <div>
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {item.subgrupo && (
            <span className="rounded-md bg-royal/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-royal">
              {item.subgrupo}
            </span>
          )}
          {item.selo && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy">
              {item.selo === 'Mais pedido' && <Star className="size-3 fill-navy" />}
              {item.selo}
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl uppercase text-navy group-hover:text-royal transition-colors">
            {item.nome}
          </h3>
          <span className="font-display text-2xl text-royal shrink-0">
            {formatBRL(item.preco)}
          </span>
        </div>

        {item.notasSabor && (
          <p className="mt-1 text-xs italic text-navy/80">{item.notasSabor.join(' · ')}</p>
        )}

        {item.destaque && (
          <span className="mt-1.5 inline-block rounded-md bg-sand/85 px-2 py-0.5 text-[11px] font-semibold italic text-navy">
            {item.destaque}
          </span>
        )}

        {item.descricao && (
          <p className="mt-2 text-xs sm:text-sm text-navy-soft leading-relaxed">
            {item.descricao}
          </p>
        )}
      </div>

      {(item.adicionais || item.opcoesProteina || item.descricao) && (
        <div className="mt-4 pt-2.5 border-t border-dashed border-navy/15 flex items-center justify-between text-xs font-medium text-royal">
          <span>
            {item.opcoesProteina
              ? 'Ver opções de proteína'
              : item.adicionais
              ? 'Ver adicionais'
              : 'Ver detalhes'}
          </span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      )}
    </motion.button>
  );
}

