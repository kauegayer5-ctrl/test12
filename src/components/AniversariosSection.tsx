import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Cake, CalendarCheck, Gift, MessageCircle, Users } from 'lucide-react';
import { ANIVERSARIOS_GRUPOS, ANIVERSARIOS_NOTA } from '@/data/aniversarios';
import { CONFIRMAR } from '@/data/site';
import { buildWhatsAppUrl } from '@/lib/utils';

type ReservaTipo = 'Aniversário' | 'Reserva de mesa';

export function AniversariosSection() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('18:00');
  const [pessoas, setPessoas] = useState('8');
  const [tipo, setTipo] = useState<ReservaTipo>('Aniversário');
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nome.trim() || !data.trim() || !pessoas.trim()) {
      setErro('Por favor, preencha seu nome, a data e o número de pessoas.');
      return;
    }
    setErro('');

    const dataFormatada = data.includes('-') ? data.split('-').reverse().join('/') : data;

    const linhas = [
      `Olá! Gostaria de fazer uma solicitação de *${tipo}* no Mayô:`,
      `• Nome: ${nome.trim()}`,
      `• Data: ${dataFormatada}`,
      `• Horário: ${horario}`,
      `• Nº de pessoas: ${pessoas}`,
    ];
    if (observacoes.trim()) {
      linhas.push(`• Observações: ${observacoes.trim()}`);
    }

    const url = buildWhatsAppUrl(linhas.join('\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="aniversarios" className="relative py-16 md:py-24 overflow-hidden">
      <div className="container-site">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-amber/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy">
            Comemore no Mayô · {CONFIRMAR}
          </span>
          <h2 className="mt-2 font-display text-5xl sm:text-6xl uppercase text-navy">
            Aniversários &amp;{' '}
            <span className="font-script normal-case text-royal text-6xl sm:text-7xl leading-[1.1] pb-1 inline-block">
              reservas
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-navy-soft leading-relaxed">
            Confira as vantagens para aniversariantes por dia da semana e envie sua reserva direto
            para o WhatsApp do bar.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cards de vantagens por dia */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {ANIVERSARIOS_GRUPOS.map((grupo) => (
              <motion.div
                key={grupo.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-navy/15 bg-paper p-6 shadow-(--shadow-card)"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex size-11 items-center justify-center rounded-xl bg-royal text-white shrink-0">
                      <Cake className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-3xl uppercase text-navy">{grupo.dias}</h3>
                      <p className="text-xs text-navy-soft">{grupo.subtitulo}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-bold text-navy">
                    {grupo.statusConfirmacao}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {grupo.faixas.map((faixa) => (
                    <div
                      key={faixa.convidados}
                      className="rounded-xl border border-navy/12 bg-cream/70 p-4"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-royal">
                        <Users className="size-3.5" />
                        <span>{faixa.convidados}</span>
                      </div>
                      <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-navy leading-snug">
                        <Gift className="size-4 text-amber shrink-0 mt-0.5" />
                        <span>{faixa.beneficio}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <p className="text-xs text-navy-soft bg-cream-deep/60 rounded-xl px-4 py-3 border border-navy/10">
              {ANIVERSARIOS_NOTA}
            </p>
          </div>

          {/* Formulário de reserva para WhatsApp */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-6 rounded-2xl border border-navy/15 bg-paper p-6 sm:p-8 shadow-(--shadow-card)"
          >
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-navy/12">
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="size-5 text-royal" />
                <h3 className="font-display text-3xl uppercase text-navy">
                  Montar pedido de reserva
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-navy/70">
                WhatsApp {CONFIRMAR}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="res-tipo" className="text-xs font-semibold text-navy">
                  Tipo de reserva
                </label>
                <div id="res-tipo" className="grid grid-cols-2 gap-2">
                  {(['Aniversário', 'Reserva de mesa'] as const).map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setTipo(op)}
                      className={`h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        tipo === op
                          ? 'bg-royal text-white shadow-xs'
                          : 'bg-cream text-navy border border-navy/15 hover:border-royal/40'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="res-nome" className="text-xs font-semibold text-navy">
                  Seu nome completo *
                </label>
                <input
                  id="res-nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex.: Mariana Silva"
                  className="h-11 rounded-xl border border-navy/20 bg-cream/60 px-3.5 text-sm text-navy placeholder:text-navy/45 focus:border-royal focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="res-data" className="text-xs font-semibold text-navy">
                  Data desejada *
                </label>
                <input
                  id="res-data"
                  type="date"
                  required
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="h-11 rounded-xl border border-navy/20 bg-cream/60 px-3.5 text-sm text-navy focus:border-royal focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="res-horario" className="text-xs font-semibold text-navy">
                  Horário *
                </label>
                <input
                  id="res-horario"
                  type="time"
                  required
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="h-11 rounded-xl border border-navy/20 bg-cream/60 px-3.5 text-sm text-navy focus:border-royal focus:bg-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="res-pessoas" className="text-xs font-semibold text-navy">
                  Número de pessoas *
                </label>
                <input
                  id="res-pessoas"
                  type="number"
                  min={1}
                  max={120}
                  required
                  value={pessoas}
                  onChange={(e) => setPessoas(e.target.value)}
                  placeholder="Ex.: 15"
                  className="h-11 rounded-xl border border-navy/20 bg-cream/60 px-3.5 text-sm text-navy focus:border-royal focus:bg-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="res-obs" className="text-xs font-semibold text-navy">
                  Observações (preferência de área, lista de convidados etc.)
                </label>
                <textarea
                  id="res-obs"
                  rows={3}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Ex.: Preferência pelo deck ao pôr do sol."
                  className="rounded-xl border border-navy/20 bg-cream/60 p-3.5 text-sm text-navy placeholder:text-navy/45 focus:border-royal focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {erro && (
              <p role="alert" className="mt-3 text-xs font-semibold text-red-700">
                {erro}
              </p>
            )}

            <button
              type="submit"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-royal px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-royal-700 active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageCircle className="size-5" />
              <span>Enviar reserva pelo WhatsApp</span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

