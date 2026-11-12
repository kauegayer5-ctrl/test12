import { CONFIRMAR } from './site';

export interface BirthdayTier {
  convidados: string;
  beneficio: string;
}

export interface BirthdayRuleGroup {
  id: string;
  dias: string;
  subtitulo: string;
  statusConfirmacao: string;
  faixas: BirthdayTier[];
}

export const ANIVERSARIOS_GRUPOS: BirthdayRuleGroup[] = [
  {
    id: 'quarta-a-sexta',
    dias: 'Quarta a Sexta',
    subtitulo: 'Happy hour & pôr do sol na beira do Guaíba',
    statusConfirmacao: CONFIRMAR,
    faixas: [
      {
        convidados: '1 a 14 convidados',
        beneficio: '1 drink autoral Mayô ou 1 sobremesa',
      },
      {
        convidados: '15+ convidados',
        beneficio: '1 jarra de clericot + 1 sobremesa',
      },
    ],
  },
  {
    id: 'sabados-e-domingos',
    dias: 'Sábados e Domingos',
    subtitulo: 'Almoço, tarde de sol e fim de semana no deck',
    statusConfirmacao: CONFIRMAR,
    faixas: [
      {
        convidados: '1 a 14 convidados',
        beneficio: '1 drink autoral Mayô ou 1 sobremesa',
      },
      {
        convidados: '15+ convidados',
        beneficio: '1 jarra de clericot ou 1 espumante Mayô',
      },
    ],
  },
];

export const ANIVERSARIOS_NOTA = `Regras de cortesia conforme destaque "Aniversários" do Instagram (${CONFIRMAR} condições vigentes e horário limite de chegada).`;

