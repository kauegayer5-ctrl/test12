# Diretrizes do Projeto — Site Mayô (`MAYO`)

## 0. Contexto
- Cliente: **Mayô Bar & Restaurante**, Zona Sul de Porto Alegre (Av. Guaíba, 4127 – Vila Assunção), à beira do Guaíba. Instagram: @mayobarpoa.
- Slogan da casa: **"O seu lugar ao pôr do sol"**.
- Este projeto é uma **prévia comercial**: será apresentada ao dono antes de qualquer contrato. Ela precisa provar a utilidade do site (cardápio interativo, aniversários e reservas, presença no Google) e mostrar qualidade visual.
- O Instagram continua sendo o canal principal do bar. O site complementa, não substitui.

## 1. Soberania da Marca Mayô (Regra Principal)
- **A identidade da marca Mayô manda e vence qualquer escolha estética padrão de skills.**
- Qualquer restrição genérica de skill (proibição de tons de azul/violeta, paletas pré-sorteadas, fontes "proibidas" etc.) é **sobreposta pela identidade oficial da Mayô**.
- **Logo:** o ativo oficial é [`LOGO-MAYO.webp`](./LOGO-MAYO.webp) (azul cobalto/royal vibrante com tipografia orgânica branca `MAYÔ`). Use sempre o arquivo como imagem. Nunca redesenhe, redigite "MAYÔ" em outra fonte, recolora, distorça ou aplique efeitos sobre ele.
- **Paleta:** extraia os valores hexadecimais reais do logo e do PDF do cardápio antes de definir os tokens. Referência aproximada (confirmar pela extração):
  - Azul royal/cobalto do logo: marca, destaques, botões principais
  - Azul-marinho do cardápio: títulos e texto
  - Bege/creme do cardápio: fundo base do site
  - Amarelo/âmbar dos selos "Novidade" e "Mais pedido" e das palavras manuscritas dos posts: detalhes e chamadas
  - Branco
- **Pôr do sol:** laranjas e dourados aparecem como **atmosfera** (hero, transições, gradientes, fotos), nunca como cor de interface e nunca substituindo a paleta da marca.
- **Tipografia:**
  - Títulos: fonte condensada, bold, caixa-alta (o cardápio usa algo equivalente a **Bebas Neue**).
  - Texto corrido: sans geométrica (equivalente a **Poppins**).
  - Script/manuscrita: só em palavras de destaque, como nos posts do bar ("Bruschetta", "mule", "espaço"), em amarelo/âmbar. Use uma script elegante do Google Fonts.
  - Todas as fontes definidas em um único lugar (tokens), para troca fácil quando o bar enviar as fontes oficiais.
- **Grafismos da marca:** ilustrações de frutos do mar em traço azul (bordas do cardápio) e textura de mármore azul/branco. Podem ser usados como padrões decorativos sutis.
- **Tom de voz:** descontraído, praiano, caloroso. Português do Brasil.

## 2. Configuração do Taste Skill (`design-taste-frontend` / `design-taste-frontend-v2-experimental`)
As skills estão instaladas localmente em `.agents/skills/` e pré-configuradas no topo dos respectivos `SKILL.md` com os seguintes parâmetros para o projeto Mayô:
- **`DESIGN_VARIANCE: 4`** (variância baixa/controlada: layouts limpos, estruturados e alinhados à marca, sem assimetria caótica)
- **`MOTION_INTENSITY: 5`** (movimento médio: micro-interações fluidas e elegantes, sem exageros)
- **`VISUAL_DENSITY: 4`** (densidade equilibrada e arejada)

Se qualquer regra da skill conflitar com a seção 1, **a seção 1 vence**.

## 3. Componentes Externos (React Bits & 21st.dev)
- Quando eu indicar ou colar um comando de componente externo, **instale o componente real via CLI**. Nunca invente nem recrie manualmente um componente "no estilo de" React Bits ou 21st.dev.
  - **React Bits:** `npx shadcn@latest add @react-bits/<NomeDoComponente>-TS-TW` (ou a URL direta `https://reactbits.dev/r/<NomeDoComponente>-TS-TW.json`).
  - **21st.dev:** use exatamente o comando mostrado na página do componente.
- Se a instalação falhar, **pare e me avise** com o erro. Não substitua por uma versão feita do zero.
- Depois de instalar, adapte o componente às cores, fontes e tom da seção 1.
- Onde um componente externo ainda não foi escolhido, deixe um **SLOT** marcado no código: `{/* SLOT: descrição do que entra aqui */}`.
- O `components.json` deve conter o registry do React Bits:
  ```json
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
  ```

## 4. Materiais do Projeto
- Antes de criar ou alterar uma seção, consulte os materiais da pasta raiz.
- **Cardápio (PDF):** fonte única de verdade para nomes, descrições, preços, selos e adicionais. Ignore rabiscos e anotações à mão no PDF.
- **Fotos de pratos e drinks:** são artes do Instagram em 9:16, com título e descrição escritos na parte de cima da imagem e o prato/drink na parte de baixo.
  - Em cards e miniaturas: enquadre no prato/drink (ex.: `object-position` na parte inferior) para esconder o texto da arte.
  - No detalhe do item (modal ou bottom sheet): pode mostrar a arte inteira.
  - Nem todo prato tem foto. Item sem foto ganha um card tipográfico bonito, nunca imagem gerada ou de banco.
- **Pasta `/media`:** referências para entender o clima e a proposta do bar. **Não usar essas imagens no site**, a menos que eu peça.
- **Espaço do bar:** ainda não há fotos com qualidade. A seção existe, mas fica vazia, preparada para um carrossel do React Bits que eu vou indicar depois.
- Toda mídia atual é **provisória** (baixa resolução, tirada do Instagram). Qualquer imagem deve poder ser trocada mudando só o arquivo ou o dado.

## 5. Regras de Conteúdo
- **Nunca invente** pratos, preços, horários, eventos, avaliações, depoimentos, números (seguidores, clientes) ou prêmios.
- Dado que falta ou precisa de confirmação: placeholder visível `[CONFIRMAR]`.
- Dados do negócio centralizados em `src/data/` (ex.: `site.ts`, `menu.ts`, `aniversarios.ts`, `agenda.ts`), para edição sem mexer em componentes.
- Número de WhatsApp e links externos em uma constante única.

## 6. Forma de Trabalho
- O projeto é feito **em fases**. Faça somente o que o prompt atual pede; não antecipe fases futuras.
- Estrutura limpa e funcional vem antes de efeitos. Animações elaboradas entram em fases posteriores.
- **Stack:** Vite + React + TypeScript + Tailwind + shadcn/ui. Animações com Motion e/ou GSAP ScrollTrigger; smooth scroll com Lenis se fizer sentido.
- **Mobile-first:** a maior parte do público chega pelo Instagram, no celular.
- Respeitar `prefers-reduced-motion`. Imagens em webp com lazy loading.
- Ao final de cada etapa, entregue um resumo curto: o que foi feito, o que ficou como SLOT ou `[CONFIRMAR]`, e dúvidas.
