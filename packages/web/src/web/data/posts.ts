import type { L } from "../lib/i18n";

export type Block = { type: "h"; text: L } | { type: "p"; text: L } | { type: "ul"; items: L[] } | { type: "quote"; text: L };

export type Post = {
  slug: string;
  date: string; // ISO
  read: number; // minutes
  tag: L;
  title: L;
  excerpt: L;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "landing-page-que-converte",
    date: "2026-09-22",
    read: 5,
    tag: { pt: "Conversão", en: "Conversion" },
    title: {
      pt: "5 sinais de que sua landing page está perdendo clientes",
      en: "5 signs your landing page is losing customers",
    },
    excerpt: {
      pt: "A maioria das páginas não falha por ser feia. Falha por não deixar claro o que fazer em seguida.",
      en: "Most pages don't fail because they're ugly. They fail because the next step isn't obvious.",
    },
    body: [
      {
        type: "p",
        text: {
          pt: "Depois de dezenas de landing pages, o padrão se repete: o visitante chega, olha por poucos segundos e vai embora. Quase nunca o problema é estético. É clareza.",
          en: "After dozens of landing pages the pattern repeats: a visitor arrives, glances for a few seconds and leaves. It's rarely about aesthetics. It's about clarity.",
        },
      },
      { type: "h", text: { pt: "1. A promessa não cabe em uma frase", en: "1. The promise doesn't fit in one sentence" } },
      {
        type: "p",
        text: {
          pt: "Se o título precisa de duas linhas para explicar o que você faz, o visitante já foi. Teste: leia só o título e o subtítulo. Um estranho entenderia o que você vende, para quem e qual o próximo passo?",
          en: "If the headline needs two lines to explain what you do, the visitor is gone. Test it: read only the headline and subheadline. Would a stranger understand what you sell, for whom, and the next step?",
        },
      },
      { type: "h", text: { pt: "2. Há mais de uma ação principal", en: "2. There's more than one main action" } },
      {
        type: "p",
        text: {
          pt: "Botão de WhatsApp, formulário, Instagram, e-mail, telefone — tudo com o mesmo peso. Escolha uma ação principal e repita ela ao longo da página. As demais viram links secundários.",
          en: "WhatsApp button, form, Instagram, email, phone — all with the same weight. Choose one primary action and repeat it down the page. The rest become secondary links.",
        },
      },
      { type: "h", text: { pt: "3. A prova social é genérica", en: "3. Social proof is generic" } },
      {
        type: "p",
        text: {
          pt: "“Ótimo serviço!” não convence ninguém. Depoimentos com nome, empresa e um resultado concreto (“5x mais leads”) pesam muito mais — e logos de clientes reais pesam mais ainda.",
          en: "“Great service!” convinces no one. Testimonials with a name, a company and a concrete result (“5x more leads”) weigh far more — and real client logos weigh even more.",
        },
      },
      { type: "h", text: { pt: "4. A página é lenta no celular", en: "4. The page is slow on mobile" } },
      {
        type: "p",
        text: {
          pt: "Mais de 70% do tráfego brasileiro vem do celular, muitas vezes em 4G instável. Imagens sem otimização, animações pesadas e fontes demais derrubam a conversão antes de a página aparecer.",
          en: "Most Brazilian traffic comes from phones, often on unstable 4G. Unoptimised images, heavy animation and too many fonts kill conversion before the page even appears.",
        },
      },
      { type: "h", text: { pt: "5. Ninguém mede nada", en: "5. Nobody measures anything" } },
      {
        type: "p",
        text: {
          pt: "Sem analytics e sem eventos de clique no botão principal, toda decisão é palpite. Instale o básico no dia da publicação: visitas, cliques no CTA e origem do tráfego.",
          en: "Without analytics and click events on the main button, every decision is a guess. Install the basics on launch day: visits, CTA clicks and traffic source.",
        },
      },
      {
        type: "quote",
        text: {
          pt: "Design bonito atrai. Clareza converte.",
          en: "Beautiful design attracts. Clarity converts.",
        },
      },
    ],
  },
  {
    slug: "quanto-custa-um-site",
    date: "2026-09-08",
    read: 6,
    tag: { pt: "Preço", en: "Pricing" },
    title: {
      pt: "Quanto custa um site profissional no Brasil em 2026?",
      en: "How much does a professional website cost in Brazil in 2026?",
    },
    excerpt: {
      pt: "O que faz um orçamento ir de R$ 900 a R$ 4.500 — e como não pagar por coisa que você não precisa.",
      en: "What moves a quote from R$ 900 to R$ 4,500 — and how to avoid paying for what you don't need.",
    },
    body: [
      {
        type: "p",
        text: {
          pt: "“Quanto custa um site?” é a pergunta mais comum e a pior de responder sem contexto. Mas existe uma lógica por trás dos valores, e entendê-la evita tanto pagar demais quanto contratar barato demais.",
          en: "“How much is a website?” is the most common question and the hardest to answer without context. Still, there's logic behind the numbers, and understanding it keeps you from overpaying or buying too cheap.",
        },
      },
      { type: "h", text: { pt: "O que muda o preço", en: "What changes the price" } },
      {
        type: "ul",
        items: [
          { pt: "Número de páginas e seções", en: "Number of pages and sections" },
          { pt: "Quem escreve os textos (você ou o designer)", en: "Who writes the copy (you or the designer)" },
          { pt: "Integrações: agendamento, pagamento, CRM, painel", en: "Integrations: booking, payments, CRM, admin panel" },
          { pt: "Identidade visual pronta ou a criar", en: "Existing or new brand identity" },
          { pt: "Prazo: urgência custa mais", en: "Deadline: rush costs more" },
        ],
      },
      { type: "h", text: { pt: "Faixas realistas", en: "Realistic ranges" } },
      {
        type: "p",
        text: {
          pt: "Uma landing page bem feita, com texto revisado e SEO inicial, costuma ficar entre R$ 900 e R$ 2.800. Um site institucional de várias páginas, entre R$ 1.800 e R$ 4.500. Acima disso entram painel administrativo, loja virtual e sistemas.",
          en: "A well-made landing page with reviewed copy and initial SEO usually lands between R$ 900 and R$ 2,800. A multi-page institutional site, R$ 1,800 to R$ 4,500. Above that you're into admin panels, e-commerce and systems.",
        },
      },
      { type: "h", text: { pt: "Como economizar sem perder qualidade", en: "How to save without losing quality" } },
      {
        type: "p",
        text: {
          pt: "Comece por uma landing page, valide a oferta e só depois expanda para um site completo. Leve os textos prontos e as fotos reais do seu negócio. E peça sempre escopo fechado por escrito.",
          en: "Start with a landing page, validate the offer and only then expand to a full site. Bring ready copy and real photos of your business. And always ask for a written, fixed scope.",
        },
      },
    ],
  },
  {
    slug: "convite-digital-vs-impresso",
    date: "2026-08-25",
    read: 4,
    tag: { pt: "Eventos", en: "Events" },
    title: {
      pt: "Convite digital interativo: o que colocar para ele não parecer “só uma imagem”",
      en: "Interactive digital invitations: what to include so it's not “just an image”",
    },
    excerpt: {
      pt: "Confirmação com um toque, mapa e contagem regressiva: os detalhes que reduzem o vai-e-vem no WhatsApp.",
      en: "One-tap RSVP, map and countdown: the details that cut the back-and-forth on WhatsApp.",
    },
    body: [
      {
        type: "p",
        text: {
          pt: "Um convite digital bom resolve três problemas do organizador: quem vem, como chega e o que precisa levar. Quando é só uma imagem no grupo da família, você acaba respondendo as mesmas perguntas 50 vezes.",
          en: "A good digital invitation solves three organiser problems: who's coming, how they get there and what to bring. When it's just an image in the family group chat, you end up answering the same questions 50 times.",
        },
      },
      { type: "h", text: { pt: "Checklist do convite que funciona", en: "Checklist for an invitation that works" } },
      {
        type: "ul",
        items: [
          { pt: "Data, hora e local logo na primeira tela", en: "Date, time and place on the very first screen" },
          { pt: "Botão de confirmação que abre o WhatsApp com mensagem pronta", en: "RSVP button that opens WhatsApp with a ready message" },
          { pt: "Link do mapa (Google Maps ou Waze)", en: "Map link (Google Maps or Waze)" },
          { pt: "Dress code e lista de presentes, se houver", en: "Dress code and gift list, if any" },
          { pt: "Arte pensada para tela de celular, não para papel", en: "Artwork designed for phone screens, not paper" },
        ],
      },
      { type: "h", text: { pt: "Prazo e custo", en: "Timing and cost" } },
      {
        type: "p",
        text: {
          pt: "Um convite digital assim fica pronto em 2 a 4 dias. E como é um link, você corrige um erro de horário em segundos — algo impossível com 100 convites impressos.",
          en: "An invitation like this is ready in 2–4 days. And because it's a link, you can fix a wrong time in seconds — impossible with 100 printed invitations.",
        },
      },
    ],
  },
];

export function formatDate(iso: string, lang: "pt" | "en") {
  return new Date(iso + "T12:00:00").toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
