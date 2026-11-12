/**
 * AGENDA DA SEMANA — transcrita fielmente dos stories em /AGENDA-SEMANAL.
 * Para atualizar a programação da semana, basta editar a lista abaixo.
 */

export type AgendaTipo =
  | 'SAMBA'
  | 'PAGODE'
  | 'DJ'
  | 'MÚSICA AO VIVO'
  | 'ALMOÇO'
  | 'ESPECIAL';

export type AgendaIconeSelo = 'pandeiro' | 'disco' | 'microfone' | 'sol';

export interface AgendaProgramacaoItem {
  horario: string;
  atividade: string;
  detalhe?: string;
}

export interface AgendaEvento {
  id: string;
  /** Data no formato dd/mm */
  data: string;
  /** Data ISO (YYYY-MM-DD) usada para calcular automaticamente o próximo evento */
  dataIso: string;
  diaNumero: string;
  mesExtenso: string;
  diaDaSemana: string;
  tipo: AgendaTipo;
  horario: string;
  aberturaCasa: string;
  titulo: string;
  localApoio: string;
  descricao: string;
  programacaoDia: AgendaProgramacaoItem[];
  iconeSelo: AgendaIconeSelo;
  imagem?: string;
  destaque?: string;
}

export const AGENDA_SEMANAL: AgendaEvento[] = [
  {
    id: 'domingo-08-11',
    data: '08/11',
    dataIso: '2026-11-08',
    diaNumero: '08',
    mesExtenso: 'NOVEMBRO',
    diaDaSemana: 'DOMINGO',
    tipo: 'SAMBA',
    horario: '18h',
    aberturaCasa: 'Aberto a partir das 11h30',
    titulo: 'Samba e Pôr com Balanço Bom',
    localApoio: 'BEIRA DO GUAÍBA · A PARTIR DAS 11H30',
    descricao:
      'Domingo completo à beira do Guaíba: Buffet à la minuta e encontro de marcas com bingo do Mayô a partir das 11h30, Chopp Brahma e caipirinha em dose dupla das 11h30 às 15h e Samba e Pôr com Balanço Bom a partir das 18h.',
    programacaoDia: [
      { horario: '11h30 às 15h', atividade: 'Buffet à la minuta' },
      { horario: 'A partir das 11h30', atividade: 'Encontro de marcas e bingo do Mayô' },
      { horario: '11h30 às 15h', atividade: 'Chopp Brahma e caipirinha em DOSE DUPLA' },
      { horario: 'A partir das 18h', atividade: 'Samba e Pôr com Balanço Bom' },
    ],
    iconeSelo: 'pandeiro',
    destaque: 'Chopp Brahma e caipirinha em dose dupla das 11h30 às 15h',
  },
  {
    id: 'sexta-13-11',
    data: '13/11',
    dataIso: '2026-11-13',
    diaNumero: '13',
    mesExtenso: 'NOVEMBRO',
    diaDaSemana: 'SEXTA',
    tipo: 'MÚSICA AO VIVO',
    horario: '20h',
    aberturaCasa: 'Aberto a partir das 11h30',
    titulo: 'Pagode do Ronaldo',
    localApoio: 'SEMANA DO MAYÔ 5 ANOS · ESTACIONAMENTO GRATUITO NO ALMOÇO',
    descricao:
      'Sexta da Semana do Mayô (5 anos): casa aberta a partir das 11h30 com Buffet à la minuta das 11h30 às 15h (estacionamento gratuito), Chopp Brahma e caipirinha em dose dupla das 11h30 às 19h e Pagode do Ronaldo a partir das 20h.',
    programacaoDia: [
      {
        horario: '11h30 às 15h',
        atividade: 'Buffet à la minuta',
        detalhe: 'Estacionamento gratuito',
      },
      { horario: '11h30 às 19h', atividade: 'Chopp Brahma e Caipirinha em DOSE DUPLA' },
      { horario: 'A partir das 20h', atividade: 'Pagode do Ronaldo' },
    ],
    iconeSelo: 'pandeiro',
    destaque: 'Dose dupla das 11h30 às 19h · Estacionamento gratuito no almoço',
  },
  {
    id: 'sabado-14-11',
    data: '14/11',
    dataIso: '2026-11-14',
    diaNumero: '14',
    mesExtenso: 'NOVEMBRO',
    diaDaSemana: 'SÁBADO',
    tipo: 'DJ',
    horario: '18h',
    aberturaCasa: 'Aberto a partir das 11h30',
    titulo: 'Festa Disco Club',
    localApoio: 'SEMANA DO MAYÔ 5 ANOS · PÔR DO SOL & PISTA',
    descricao:
      'Sábado da Semana do Mayô (5 anos): abertos a partir das 11h30 com Buffet à la minuta das 11h30 às 15h, Chopp Brahma e caipirinha em dose dupla das 11h30 às 15h e Festa Disco Club a partir das 18h.',
    programacaoDia: [
      { horario: '11h30 às 15h', atividade: 'Buffet à la minuta' },
      { horario: '11h30 às 15h', atividade: 'Chopp Brahma e Caipirinha em DOSE DUPLA' },
      { horario: 'A partir das 18h', atividade: 'Festa Disco Club' },
    ],
    iconeSelo: 'disco',
    destaque: 'Semana do Mayô · 5 anos',
  },
];

export const AGENDA_OBSERVACOES_CONFIRMAR = [
  'Programação de quarta (11/11) e quinta (12/11): [CONFIRMAR] (não havia story na pasta AGENDA-SEMANAL)',
  'Fotos individuais dos artistas/atrações para os selos postais: [CONFIRMAR] (usando selo listrado com ícone da atração)',
  'Valores de couvert/ingresso para os eventos de 08/11, 13/11 e 14/11: [CONFIRMAR]',
];

