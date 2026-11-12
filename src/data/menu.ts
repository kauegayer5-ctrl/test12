/**
 * CARDÁPIO OFICIAL MAYÔ (07/26) — transcrito integralmente do PDF.
 * Fonte única de verdade para categorias, itens, preços, selos,
 * adicionais, opções de proteína e fotos.
 */

export type MenuCategoryId =
  | 'entradas-petiscos'
  | 'burguers-sandubas'
  | 'pratos'
  | 'kids'
  | 'sobremesas'
  | 'coqueteis-autorais'
  | 'coqueteis-classicos'
  | 'sem-alcool'
  | 'cervejas'
  | 'soft-drinks';

export type MenuBadge = 'Novidade' | 'Mais pedido';

export interface MenuExtra {
  nome: string;
  preco: number;
}

export interface MenuPhotoVariant {
  label: string;
  thumb: string;
  art: string;
}

export interface MenuItem {
  id: string;
  categoria: MenuCategoryId;
  nome: string;
  subtitulo?: string;
  descricao?: string;
  notasSabor?: string[];
  preco: number;
  precosVariantes?: { label: string; preco: number }[];
  selo?: MenuBadge;
  destaque?: string;
  subgrupo?: string;
  adicionais?: MenuExtra[];
  opcoesProteina?: MenuExtra[];
  thumb?: string;
  art?: string;
  fotosVariantes?: MenuPhotoVariant[];
}

export interface MenuCategory {
  id: MenuCategoryId;
  nome: string;
  nomeCurto: string;
  observacaoCategoria?: string;
  adicionalCategoria?: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'entradas-petiscos',
    nome: 'Entradas & Petiscos',
    nomeCurto: 'Entradas & Petiscos',
  },
  {
    id: 'burguers-sandubas',
    nome: 'Burguers & Sandubas',
    nomeCurto: 'Burguers & Sandubas',
    adicionalCategoria: 'Adicional de batata frita – R$ 9',
  },
  {
    id: 'pratos',
    nome: 'Pratos',
    nomeCurto: 'Pratos',
  },
  {
    id: 'kids',
    nome: 'Kids',
    nomeCurto: 'Kids',
    observacaoCategoria: 'Para crianças menores de 12 anos',
  },
  {
    id: 'sobremesas',
    nome: 'Sobremesas',
    nomeCurto: 'Sobremesas',
  },
  {
    id: 'coqueteis-autorais',
    nome: 'Coquetéis Autorais',
    nomeCurto: 'Autorais',
  },
  {
    id: 'coqueteis-classicos',
    nome: 'Coquetéis Clássicos',
    nomeCurto: 'Clássicos',
  },
  {
    id: 'sem-alcool',
    nome: 'Coquetéis Sem Álcool',
    nomeCurto: 'Sem Álcool',
  },
  {
    id: 'cervejas',
    nome: 'Cervejas',
    nomeCurto: 'Cervejas',
  },
  {
    id: 'soft-drinks',
    nome: 'Soft Drinks',
    nomeCurto: 'Soft Drinks',
  },
];

const img = (slug: string) => ({
  thumb: `/media/menu/${slug}-thumb.webp`,
  art: `/media/menu/${slug}.webp`,
});

export const MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // 1. ENTRADAS & PETISCOS
  // ==========================================
  {
    id: 'bruschetta-carne-de-panela',
    categoria: 'entradas-petiscos',
    nome: 'Bruschetta Carne de Panela (6un)',
    descricao: 'Pão italiano levain, carne de panela, queijo gorgonzola e cebola caramelizada.',
    preco: 48,
    ...img('bruschetta-carne-de-panela'),
  },
  {
    id: 'bruschetta-cogumelos-gorgonzola',
    categoria: 'entradas-petiscos',
    nome: 'Bruschetta Cogumelos & Gorgonzola (6un)',
    descricao:
      'Pão italiano levain, cogumelos salteados na manteiga de ervas, creme de gorgonzola, cebola crocante e gremolata.',
    preco: 48,
  },
  {
    id: 'iscas-de-file-do-mayo',
    categoria: 'entradas-petiscos',
    nome: 'Iscas de Filé do Mayô',
    descricao:
      '300g de filé mignon em iscas, molho cremoso de gorgonzola, batatas fritas crocantes e aioli da casa.',
    preco: 89,
    selo: 'Novidade',
  },
  {
    id: 'camarao-empanado',
    categoria: 'entradas-petiscos',
    nome: 'Camarão Empanado',
    descricao: 'Camarões empanados (250g) com aioli cítrico e geleia de pimenta.',
    preco: 89,
    selo: 'Novidade',
  },
  {
    id: 'salada-mayo',
    categoria: 'entradas-petiscos',
    nome: 'Salada Mayô',
    descricao:
      'Mix de folhas, tomate cereja, cebola roxa, lascas de parmesão, croutons artesanais e molho de mostarda e mel.',
    preco: 42,
    adicionais: [
      { nome: 'Iscas de frango (120g)', preco: 16 },
      { nome: 'Camarões (100g)', preco: 28 },
      { nome: 'Cogumelos Castanho (120g)', preco: 22 },
    ],
    ...img('salada-mayo'),
  },
  {
    id: 'fritas-do-mayo',
    categoria: 'entradas-petiscos',
    nome: 'Fritas do Mayô',
    descricao: 'Acompanha maionese da casa.',
    preco: 34,
    ...img('fritas-do-mayo'),
  },
  {
    id: 'fritas-carne-de-panela',
    categoria: 'entradas-petiscos',
    nome: 'Fritas & Carne de Panela do Mayô',
    descricao: 'Batata frita, sour cream e carne de panela desfiada da casa.',
    preco: 48,
    selo: 'Mais pedido',
    ...img('fritas-carne-de-panela'),
  },
  {
    id: 'bolinho-de-aipim',
    categoria: 'entradas-petiscos',
    nome: 'Bolinho de Aipim',
    descricao: 'Acompanha maionese da casa.',
    preco: 36,
    ...img('bolinho-de-aipim'),
  },
  {
    id: 'pasteis',
    categoria: 'entradas-petiscos',
    nome: 'Pastéis (4un)',
    descricao: '2 und carne de panela e 2 und queijo mussarela. Acompanha maionese da casa.',
    preco: 39,
    ...img('pasteis'),
  },
  {
    id: 'chicken-fingers',
    categoria: 'entradas-petiscos',
    nome: 'Chicken Fingers',
    descricao: 'Iscas de frango empanadas. Acompanha maionese aioli e geleia de pimenta.',
    preco: 59,
    ...img('chicken-fingers'),
  },
  {
    id: 'bolinho-de-bacalhau',
    categoria: 'entradas-petiscos',
    nome: 'Bolinho de Bacalhau (6un)',
    descricao: 'Acompanha geleia de pimenta.',
    preco: 59,
    ...img('bolinho-de-bacalhau'),
  },
  {
    id: 'croqueta-carne-de-panela-provolone',
    categoria: 'entradas-petiscos',
    nome: 'Croqueta Carne de Panela com Provolone (6 un)',
    descricao: 'Croqueta crocante recheada com provolone. Acompanha aioli da casa.',
    preco: 65,
    selo: 'Novidade',
  },
  {
    id: 'espetinho-de-file',
    categoria: 'entradas-petiscos',
    nome: 'Espetinho de Filé',
    descricao: 'Cubos de filé mignon com farofa da casa.',
    preco: 42,
    selo: 'Novidade',
  },

  // ==========================================
  // 2. BURGUERS & SANDUBAS
  // ==========================================
  {
    id: 'burguer-do-mayo',
    categoria: 'burguers-sandubas',
    nome: 'Burguer do Mayô',
    descricao:
      'Pão brioche, blend de costela (150g), maionese aioli, bacon artesanal, queijo gorgonzola, geleia de abacaxi, crispy de cebola e folhas de rúcula.',
    preco: 59,
    adicionais: [{ nome: 'Batata frita', preco: 9 }],
    ...img('burguer-do-mayo'),
  },
  {
    id: 'burguer-cheddar-bacon',
    categoria: 'burguers-sandubas',
    nome: 'Burguer Cheddar & Bacon',
    descricao:
      'Pão brioche, blend de costela (150g), maionese defumada, bacon artesanal, queijo cheddar.',
    preco: 56,
    adicionais: [{ nome: 'Batata frita', preco: 9 }],
    ...img('burguer-cheddar-bacon'),
  },
  {
    id: 'burguer-de-frango',
    categoria: 'burguers-sandubas',
    nome: 'Burguer de Frango',
    descricao:
      'Pão brioche, peito de frango empanado, alface americana, maionese de aioli e queijo mussarela.',
    preco: 49,
    adicionais: [{ nome: 'Batata frita', preco: 9 }],
    ...img('burguer-de-frango'),
  },
  {
    id: 'trio-burguer',
    categoria: 'burguers-sandubas',
    nome: 'Trio Burguer',
    descricao:
      'A versão mini dos nossos burgers mais pedidos: 1 hambúrguer do Mayô, 1 hambúrguer cheddar & bacon e 1 hambúrguer de frango empanado.',
    preco: 89,
    selo: 'Novidade',
    adicionais: [{ nome: 'Batata frita', preco: 9 }],
  },
  {
    id: 'sanduba-carne-de-panela',
    categoria: 'burguers-sandubas',
    nome: 'Sanduba Carne de Panela',
    descricao:
      'Pão ciabata, carne de panela desfiada, maionese aioli, queijo gorgonzola, cebola caramelizada e rúcula.',
    preco: 52,
    adicionais: [{ nome: 'Batata frita', preco: 9 }],
    ...img('sanduba-carne-de-panela'),
  },
  {
    id: 'sanduba-cogu',
    categoria: 'burguers-sandubas',
    nome: 'Sanduba Cogu',
    descricao:
      'Pão ciabata, cogumelo shimeji grelhado com manteiga de ervas, creme de mussarela de búfala, gremolata de salsa, picles de cebola roxa, rúcula e crispy de alho poró.',
    preco: 48,
    adicionais: [{ nome: 'Batata frita', preco: 9 }],
    ...img('sanduba-cogu'),
  },

  // ==========================================
  // 3. PRATOS
  // ==========================================
  {
    id: 'file-a-parmegiana',
    categoria: 'pratos',
    nome: 'Filé à Parmegiana',
    destaque: 'Opção a xadrez para compartilhar',
    descricao:
      'Filé Mignon (200g), molho de tomate pelati, queijo mussarela, gorgonzola e provolone defumado. Acompanha batata frita ou mini porção de salada.',
    preco: 79,
    selo: 'Mais pedido',
    ...img('file-a-parmegiana'),
  },
  {
    id: 'entrecot',
    categoria: 'pratos',
    nome: 'Entrecot',
    destaque: 'Opção a xadrez para compartilhar',
    descricao: 'Entrecot grelhado, molho de cogumelos e batata frita.',
    preco: 89,
    ...img('entrecot'),
  },
  {
    id: 'salmao-belle-meuniere',
    categoria: 'pratos',
    nome: 'Salmão à Belle Meunière',
    descricao:
      'Lombo de salmão (150g) grelhado, molho Belle meunière à base de manteiga noisette, alcaparras e suco de limão. Acompanha confit de batata baby com ervas, legumes grelhados e farofa de pão.',
    preco: 89,
    ...img('salmao-belle-meuniere'),
  },
  {
    id: 'levissimo-do-mayo',
    categoria: 'pratos',
    nome: 'Levíssimo do Mayô',
    descricao:
      'Tilápia grelhada (180g), legumes grelhados, purê de batata e gremolata de salsa.',
    destaque: 'Opção com peito de frango grelhado – R$ 55',
    preco: 65,
    precosVariantes: [
      { label: 'Tilápia grelhada (180g)', preco: 65 },
      { label: 'Peito de frango grelhado', preco: 55 },
    ],
    ...img('levissimo-do-mayo'),
  },
  {
    id: 'nasi-goreng',
    categoria: 'pratos',
    nome: 'Nasi Goreng (Arroz Frito)',
    descricao:
      'Arroz branco frito com óleo de gergelim, molho oriental à base de shoyu e suco de laranja, legumes salteados, cebolinha, coentro, ovo frito com gema mole e amendoim.',
    preco: 56,
    opcoesProteina: [
      { nome: 'Isca de frango (120g)', preco: 16 },
      { nome: 'Iscas de filé (120g)', preco: 22 },
      { nome: 'Camarões (100g)', preco: 28 },
    ],
    ...img('nasi-goreng'),
  },
  {
    id: 'nhoque-ragu-carne-de-panela',
    categoria: 'pratos',
    nome: 'Nhoque Artesanal com Ragu de Carne de Panela',
    descricao:
      'Nhoque artesanal de batata com ragu de carne de panela cozida lentamente, finalizado com parmesão ralado.',
    preco: 69,
    selo: 'Novidade',
  },
  {
    id: 'fettuccine-file-mignon-milanesa',
    categoria: 'pratos',
    nome: 'Fettuccine com Filé Mignon à Milanesa',
    descricao:
      'Massa fettuccine ao molho de três queijos, acompanhada de filé mignon empanado, finalizado com parmesão ralado.',
    preco: 75,
    selo: 'Novidade',
  },
  {
    id: 'fettuccine-pomodoro-burrata',
    categoria: 'pratos',
    nome: 'Fettuccine Pomodoro com Burrata',
    descricao:
      'Massa fettuccine ao molho pomodoro artesanal, tomates assados, burrata cremosa e pesto de manjericão, finalizado com queijo parmesão ralado.',
    preco: 69,
    selo: 'Novidade',
    opcoesProteina: [
      { nome: 'Iscas de frango (120g)', preco: 16 },
      { nome: 'Iscas de filé mignon (120g)', preco: 22 },
      { nome: 'Camarões (100g)', preco: 28 },
    ],
    ...img('fettuccine-pomodoro'),
  },

  // ==========================================
  // 4. KIDS
  // ==========================================
  {
    id: 'massinha-com-iscas',
    categoria: 'kids',
    nome: 'Massinha com Iscas',
    descricao: 'Massinha na manteiga, acompanha fritas ou legumes grelhados.',
    preco: 39,
    precosVariantes: [
      { label: 'Iscas Filé de frango', preco: 39 },
      { label: 'Iscas Filé mignon', preco: 49 },
    ],
    ...img('massinha-com-iscas'),
  },
  {
    id: 'burger-kids',
    categoria: 'kids',
    nome: 'Burger Kids',
    descricao: 'Pão brioche, blend de costela e queijo mussarela.',
    preco: 39,
  },

  // ==========================================
  // 5. SOBREMESAS
  // ==========================================
  {
    id: 'brownie-petit-gateau',
    categoria: 'sobremesas',
    nome: 'Brownie de Chocolate / Pétit Gateau',
    descricao: 'Brownie/Pétit Gateau com calda de chocolate e sorvete de creme.',
    preco: 28,
  },
  {
    id: 'churros-do-mayo',
    categoria: 'sobremesas',
    nome: 'Churros do Mayô',
    descricao: '4 unidades de churros palito, açúcar, canela e doce de leite.',
    preco: 25,
  },
  {
    id: 'cheesecake',
    categoria: 'sobremesas',
    nome: 'Cheesecake',
    descricao: 'Com calda de frutas vermelhas ou doce de leite.',
    preco: 30,
  },

  // ==========================================
  // 6. COQUETÉIS AUTORAIS
  // ==========================================
  {
    id: 'gasometro',
    categoria: 'coqueteis-autorais',
    nome: 'Gasômetro',
    subtitulo: 'O queridinho desde 2022',
    notasSabor: ['Cítrico', 'Levemente amargo', 'Refrescante'],
    descricao: 'Rum, suco de limão, Aperol, xarope de bergamota e espumante moscatel.',
    preco: 44,
    selo: 'Mais pedido',
    ...img('gasometro'),
  },
  {
    id: 'coconut',
    categoria: 'coqueteis-autorais',
    nome: 'Coconut',
    notasSabor: ['Tropical', 'Doce equilibrado', 'Cremoso'],
    descricao:
      'Rum, xarope de abacaxi, baunilha, mix cítricos, clarificado com Ballena de coco.',
    preco: 43,
    ...img('coconut'),
  },
  {
    id: 'rose-mayo',
    categoria: 'coqueteis-autorais',
    nome: 'Rosé Mayô',
    notasSabor: ['Frutado', 'Floral', 'Refrescante'],
    descricao: 'Gin, framboesa e vinho chardonnay gaseificado artesanalmente.',
    preco: 42,
    ...img('rose-mayo'),
  },
  {
    id: 'pinacuja',
    categoria: 'coqueteis-autorais',
    nome: 'Pinacujá',
    notasSabor: ['Tropical', 'Cítrico', 'Refrescante'],
    descricao: 'Vodka, xarope de abacaxi, maracujá e mix cítricos.',
    preco: 44,
    ...img('pinacuja'),
  },
  {
    id: 'pura-berga',
    categoria: 'coqueteis-autorais',
    nome: 'Pura Berga',
    notasSabor: ['Cítrico', 'Aromático', 'Refrescante'],
    descricao:
      'Licor de cachaça infusionada na bergamota, suco fresco de bergamota e toque de limão.',
    preco: 38,
    selo: 'Novidade',
  },

  // ==========================================
  // 7. COQUETÉIS CLÁSSICOS
  // ==========================================
  {
    id: 'aperol-spritz',
    categoria: 'coqueteis-classicos',
    nome: 'Aperol Spritz',
    descricao: 'Aperol, prosecco, água gaseificada e bitter de laranja.',
    preco: 39,
    ...img('aperol-spritz'),
  },
  {
    id: 'limoncello-spritz',
    categoria: 'coqueteis-classicos',
    nome: 'Limoncello Spritz',
    descricao: 'Vinho Chardonnay, limoncello e bitter de laranja.',
    preco: 39,
  },
  {
    id: 'whiskey-sour',
    categoria: 'coqueteis-classicos',
    nome: 'Whiskey Sour',
    descricao: 'Whiskey bourbon, xarope de açúcar, suco de limão, albumina e bitter aromático.',
    preco: 42,
    ...img('whiskey-sour'),
  },
  {
    id: 'penicillin',
    categoria: 'coqueteis-classicos',
    nome: 'Penicillin',
    descricao: 'Whiskey Jameson, suco de limão, xarope de gengibre e mel.',
    preco: 42,
    ...img('penicillin'),
  },
  {
    id: 'negroni',
    categoria: 'coqueteis-classicos',
    nome: 'Negroni',
    descricao: 'Gin, vermute rosso, Campari e zest de laranja.',
    preco: 39,
    ...img('negroni'),
  },
  {
    id: 'moscow-mule',
    categoria: 'coqueteis-classicos',
    nome: 'Moscow Mule',
    descricao:
      'Vodka Smirnoff, suco de limão, xarope de gengibre, bitter aromático e espuma de gengibre artesanal.',
    preco: 38,
    ...img('moscow-mule'),
  },
  {
    id: 'caipirinha-caipiroska',
    categoria: 'coqueteis-classicos',
    nome: 'Caipirinha / Caipiroska',
    descricao: 'Cachaça ou vodka Smirnoff, xarope de açúcar e fruta (consultar opções).',
    preco: 32,
    adicionais: [{ nome: 'Upgrade Vodka Absolut', preco: 8 }],
    ...img('caipirinha'),
    fotosVariantes: [
      { label: 'Limão', ...img('caipirinha') },
      { label: 'Maracujá', ...img('caipirinha-maracuja') },
      { label: 'Morango', ...img('caipirinha-morango') },
      { label: 'Abacaxi', ...img('caipirinha-abacaxi') },
      { label: 'Jabuticaba', ...img('caipirinha-jabuticaba') },
    ],
  },
  {
    id: 'gt-classico',
    categoria: 'coqueteis-classicos',
    nome: 'GT Clássico',
    descricao: 'Gin, tônica e bitter de laranja.',
    preco: 40,
    adicionais: [{ nome: 'Upgrade Gin Tanqueray', preco: 8 }],
  },
  {
    id: 'mojito',
    categoria: 'coqueteis-classicos',
    nome: 'Mojito',
    descricao: 'Rum, hortelã, limão, açúcar e água com gás.',
    preco: 38,
  },
  {
    id: 'tinto-de-verano',
    categoria: 'coqueteis-classicos',
    nome: 'Tinto de Verano',
    descricao: 'Vinho tinto, soda cítrica e frutas vermelhas.',
    preco: 39,
    ...img('tinto-de-verano'),
  },
  {
    id: 'espresso-martini',
    categoria: 'coqueteis-classicos',
    nome: 'Espresso Martini',
    descricao: 'Vodka, licor de café e espresso.',
    preco: 42,
    selo: 'Novidade',
  },
  {
    id: 'margarita',
    categoria: 'coqueteis-classicos',
    nome: 'Margarita',
    descricao: 'Tequila, triple sec e suco de limão.',
    preco: 39,
    selo: 'Novidade',
  },
  {
    id: 'carajillo',
    categoria: 'coqueteis-classicos',
    nome: 'Carajillo',
    descricao: 'Licor 43, espresso e gelo.',
    preco: 39,
    selo: 'Novidade',
  },
  {
    id: 'jarra-de-clericot',
    categoria: 'coqueteis-classicos',
    nome: 'Jarra de Clericot',
    descricao: 'Vinho branco ou espumante, frutas da estação e xarope de açúcar.',
    preco: 139,
    ...img('jarra-de-clericot'),
  },

  // ==========================================
  // 8. COQUETÉIS SEM ÁLCOOL
  // ==========================================
  {
    id: 'citrus-sparkle',
    categoria: 'sem-alcool',
    nome: 'Citrus Sparkle',
    descricao: 'Suco de limão, xarope de bergamota e água carbonatada.',
    preco: 26,
  },
  {
    id: 'strawberry-fizz',
    categoria: 'sem-alcool',
    nome: 'Strawberry Fizz',
    descricao: 'Suco de limão, xarope de morango e água carbonatada.',
    preco: 26,
    ...img('strawberry-fizz'),
  },
  {
    id: 'ginger-fresh',
    categoria: 'sem-alcool',
    nome: 'Ginger Fresh',
    descricao: 'Suco de limão, mel, xarope de gengibre e água.',
    preco: 26,
  },
  {
    id: 'pura-berga-zero',
    categoria: 'sem-alcool',
    nome: 'Pura Berga Zero',
    descricao: 'Suco fresco de bergamota, limão e água gaseificada.',
    preco: 26,
    selo: 'Novidade',
  },

  // ==========================================
  // 9. CERVEJAS
  // ==========================================
  {
    id: 'chopp-brahma',
    categoria: 'cervejas',
    nome: 'Chopp Brahma',
    preco: 16,
  },
  {
    id: 'corona-long-neck',
    categoria: 'cervejas',
    nome: 'Corona',
    subgrupo: 'Long Neck',
    preco: 17,
  },
  {
    id: 'corona-cero-long-neck',
    categoria: 'cervejas',
    nome: 'Corona Cero',
    subgrupo: 'Long Neck',
    preco: 17,
  },
  {
    id: 'stella-artois-pure-gold',
    categoria: 'cervejas',
    nome: 'Stella Artois Pure Gold',
    subgrupo: 'Long Neck',
    preco: 17,
  },
  {
    id: 'spaten-long-neck',
    categoria: 'cervejas',
    nome: 'Spaten',
    subgrupo: 'Long Neck',
    preco: 16,
  },
  {
    id: 'original-600ml',
    categoria: 'cervejas',
    nome: 'Original',
    subgrupo: '600ml',
    preco: 23,
  },
  {
    id: 'corona-600ml',
    categoria: 'cervejas',
    nome: 'Corona 600ml',
    subgrupo: '600ml',
    preco: 25,
  },

  // ==========================================
  // 10. SOFT DRINKS
  // ==========================================
  {
    id: 'agua',
    categoria: 'soft-drinks',
    nome: 'Água com Gás / Sem Gás',
    preco: 7,
  },
  {
    id: 'pepsi',
    categoria: 'soft-drinks',
    nome: 'Pepsi / Pepsi Black',
    preco: 9,
  },
  {
    id: 'guarana-antarctica',
    categoria: 'soft-drinks',
    nome: 'Guaraná Antarctica (Normal / Zero)',
    preco: 9,
  },
  {
    id: 'tonica-antarctica',
    categoria: 'soft-drinks',
    nome: 'Tônica Antarctica (Normal / Zero)',
    preco: 9,
  },
  {
    id: 'h2o-limoneto',
    categoria: 'soft-drinks',
    nome: 'H2O / Limoneto',
    preco: 9,
  },
  {
    id: 'suco-natural',
    categoria: 'soft-drinks',
    nome: 'Suco Natural',
    preco: 15,
  },
  {
    id: 'redbull',
    categoria: 'soft-drinks',
    nome: 'Red Bull',
    preco: 22,
  },
];

export const DRINKS_AUTORAIS = MENU_ITEMS.filter((item) => item.categoria === 'coqueteis-autorais');

