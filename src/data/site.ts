/**
 * DADOS DO NEGÓCIO — edite aqui sem mexer nos componentes.
 * Tudo marcado com [CONFIRMAR] precisa ser validado com o Mayô.
 */

export const CONFIRMAR = '[CONFIRMAR]';

/**
 * Número de WhatsApp do bar no formato internacional, só dígitos
 * (ex.: '5551999999999'). Enquanto estiver vazio, o link abre o WhatsApp
 * com a mensagem pronta e a pessoa escolhe o contato.
 */
export const WHATSAPP_NUMBER = ''; // [CONFIRMAR] número oficial

export const LINKS = {
  instagram: 'https://www.instagram.com/mayobarpoa/',
  instagramHandle: '@mayobarpoa',
  maps: 'https://www.google.com/maps/search/?api=1&query=May%C3%B4+Bar+%26+Restaurante%2C+Av.+Gua%C3%ADba%2C+4127+-+Vila+Assun%C3%A7%C3%A3o%2C+Porto+Alegre+-+RS',
  mapsEmbed:
    'https://www.google.com/maps?q=Av.+Gua%C3%ADba,+4127+-+Vila+Assun%C3%A7%C3%A3o,+Porto+Alegre+-+RS&output=embed',
} as const;

export const SITE = {
  nome: 'Mayô Bar & Restaurante',
  slogan: 'O seu lugar ao pôr do sol',
  endereco: {
    rua: 'Av. Guaíba, 4127',
    bairro: 'Vila Assunção',
    cidade: 'Porto Alegre – RS',
    regiao: 'Zona Sul, à beira do Guaíba',
  },
  logo: '/brand/logo-mayo.webp',
} as const;

export type Horario = { dias: string; horas: string };

export const HORARIOS: Horario[] = [
  { dias: 'Quarta e quinta', horas: '17h às 23h30' },
  { dias: 'Sexta e sábado', horas: '11h30 às 00h' },
  { dias: 'Domingo', horas: '11h30 às 22h' },
];

export const HORARIOS_NOTA = 'Segunda e terça: fechado ' + CONFIRMAR;

export const NAV = [
  { id: 'cardapio', label: 'Cardápio' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'espaco', label: 'Espaço' },
  { id: 'aniversarios', label: 'Aniversários' },
  { id: 'como-chegar', label: 'Como chegar' },
] as const;

/** Seção "O lugar": só fatos presentes no material do bar. */
export const LUGAR = {
  titulo: 'Na beira do Guaíba',
  texto:
    'O Mayô fica na Vila Assunção, Zona Sul de Porto Alegre, de frente para o Guaíba. É aqui que a tarde vira pôr do sol, com drinks autorais, petiscos para dividir e música ao vivo ou DJ no fim do dia.',
  destaques: [
    { titulo: 'Pôr do sol', texto: 'De frente para o Guaíba, todo fim de tarde.' },
    { titulo: 'Música ao vivo e DJ', texto: 'Samba, pagode e festas. Confira a agenda da semana.' },
    { titulo: 'Drinks autorais', texto: 'O Gasômetro é o queridinho da casa desde 2022.' },
    { titulo: 'Petiscos e pratos', texto: 'Da bruschetta de carne de panela ao filé à parmegiana.' },
  ],
  extras: [
    'Estacionamento: ' + CONFIRMAR,
    'Acessibilidade: ' + CONFIRMAR,
    'Pet friendly: ' + CONFIRMAR,
  ],
} as const;

