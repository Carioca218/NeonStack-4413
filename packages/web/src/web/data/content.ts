import type { L } from "../lib/i18n";

export type ServiceId = "site" | "landing" | "redesign" | "brand" | "invite" | "pricing";

export type Service = {
  id: ServiceId;
  name: L;
  focus: L;
  min: number;
  max: number;
  days: [number, number];
  tag?: L;
  deliver: L;
  includes: L[];
  web: boolean; // supports web add-ons in the estimator
};

export const SERVICES: Service[] = [
  {
    id: "site",
    name: { pt: "Site de Marca", en: "Brand Website" },
    focus: { pt: "Presença institucional", en: "Institutional presence" },
    min: 1800,
    max: 4500,
    days: [10, 20],
    tag: { pt: "Popular", en: "Popular" },
    deliver: { pt: "Site responsivo publicado", en: "Responsive site, published" },
    includes: [
      { pt: "Múltiplas páginas", en: "Multiple pages" },
      { pt: "Design responsivo", en: "Responsive design" },
      { pt: "SEO on-page inicial", en: "Initial on-page SEO" },
      { pt: "Diagnóstico guiado", en: "Guided discovery" },
      { pt: "Analytics e painel (opcional)", en: "Analytics and admin panel (optional)" },
    ],
    web: true,
  },
  {
    id: "landing",
    name: { pt: "Landing Page", en: "Landing Page" },
    focus: { pt: "Conversão de vendas", en: "Sales conversion" },
    min: 900,
    max: 2800,
    days: [5, 12],
    tag: { pt: "Recomendado", en: "Recommended" },
    deliver: { pt: "Página de vendas publicada", en: "Sales page, published" },
    includes: [
      { pt: "1 página longa", en: "1 long-scroll page" },
      { pt: "Revisão textual (copy)", en: "Copy review" },
      { pt: "Design responsivo + SEO inicial", en: "Responsive design + initial SEO" },
      { pt: "Diagnóstico guiado", en: "Guided discovery" },
    ],
    web: true,
  },
  {
    id: "redesign",
    name: { pt: "Redesign", en: "Redesign" },
    focus: { pt: "Modernização e UX", en: "Modernisation and UX" },
    min: 1200,
    max: 3500,
    days: [7, 18],
    deliver: { pt: "Nova interface publicada", en: "New interface, published" },
    includes: [
      { pt: "Auditoria de UX e conversão", en: "UX and conversion audit" },
      { pt: "Nova interface responsiva", en: "New responsive interface" },
      { pt: "SEO on-page inicial", en: "Initial on-page SEO" },
      { pt: "Diagnóstico guiado", en: "Guided discovery" },
    ],
    web: true,
  },
  {
    id: "brand",
    name: { pt: "Identidade Visual", en: "Brand Identity" },
    focus: { pt: "Criação de marca", en: "Brand creation" },
    min: 450,
    max: 1800,
    days: [4, 8],
    deliver: { pt: "Vetores e PDF", en: "Vector files and PDF" },
    includes: [
      { pt: "Logotipo e variações", en: "Logo and variations" },
      { pt: "Paleta e tipografia", en: "Palette and typography" },
      { pt: "Kit de marca", en: "Brand kit" },
      { pt: "Diagnóstico guiado", en: "Guided discovery" },
    ],
    web: false,
  },
  {
    id: "invite",
    name: { pt: "Convite Digital", en: "Digital Invitation" },
    focus: { pt: "RSVP e eventos", en: "RSVP and events" },
    min: 80,
    max: 350,
    days: [2, 4],
    deliver: { pt: "Link interativo", en: "Interactive link" },
    includes: [
      { pt: "Arte exclusiva para celular", en: "Exclusive phone-first art" },
      { pt: "Confirmação via WhatsApp", en: "RSVP via WhatsApp" },
      { pt: "Mapa integrado", en: "Embedded map" },
    ],
    web: false,
  },
  {
    id: "pricing",
    name: { pt: "Tabela de Preços", en: "Price Board" },
    focus: { pt: "Precificação clara", en: "Clear pricing" },
    min: 70,
    max: 280,
    days: [1, 3],
    deliver: { pt: "PDF ou imagem", en: "PDF or image" },
    includes: [
      { pt: "Hierarquia visual de preços", en: "Visual price hierarchy" },
      { pt: "Padrão para redes sociais", en: "Social-media format set" },
      { pt: "Arquivos prontos para postar", en: "Files ready to post" },
    ],
    web: false,
  },
];

export const ADDONS: { id: string; label: L; price: number; days: number }[] = [
  { id: "pages", label: { pt: "Páginas extras (até 5)", en: "Extra pages (up to 5)" }, price: 600, days: 3 },
  { id: "copy", label: { pt: "Copywriting profissional", en: "Professional copywriting" }, price: 350, days: 2 },
  { id: "seo", label: { pt: "SEO avançado + Analytics", en: "Advanced SEO + Analytics" }, price: 300, days: 1 },
  { id: "booking", label: { pt: "Agendamento / formulário integrado", en: "Booking / integrated form" }, price: 400, days: 2 },
  { id: "bilingual", label: { pt: "Versão bilíngue PT/EN", en: "Bilingual PT/EN version" }, price: 450, days: 2 },
  { id: "admin", label: { pt: "Painel administrativo", en: "Admin panel" }, price: 1200, days: 5 },
];

export const PROCESS: { n: string; title: L; text: L; time: L }[] = [
  {
    n: "01",
    title: { pt: "Briefing", en: "Briefing" },
    text: {
      pt: "Conversa curta sobre objetivo, público, prazo e referências. Você sai com escopo e preço fechados, sem surpresa.",
      en: "A short conversation about goals, audience, deadline and references. You leave with a fixed scope and price — no surprises.",
    },
    time: { pt: "Dia 1", en: "Day 1" },
  },
  {
    n: "02",
    title: { pt: "Direção", en: "Direction" },
    text: {
      pt: "Estrutura da página, texto-base e direção visual em wireframe e moodboard. Aprovamos o caminho antes de desenhar.",
      en: "Page structure, base copy and visual direction as wireframe and moodboard. We approve the path before designing.",
    },
    time: { pt: "Dias 2–3", en: "Days 2–3" },
  },
  {
    n: "03",
    title: { pt: "Design", en: "Design" },
    text: {
      pt: "Interface completa em desktop e celular, com tipografia, cor e microinterações pensadas para converter.",
      en: "Full interface for desktop and mobile with typography, colour and micro-interactions built to convert.",
    },
    time: { pt: "Sprint 1", en: "Sprint 1" },
  },
  {
    n: "04",
    title: { pt: "Código", en: "Build" },
    text: {
      pt: "Desenvolvimento em React e TypeScript, rápido, acessível e pronto para SEO. Você acompanha por link de preview.",
      en: "Built in React and TypeScript — fast, accessible and SEO-ready. You follow along through a preview link.",
    },
    time: { pt: "Sprint 2", en: "Sprint 2" },
  },
  {
    n: "05",
    title: { pt: "Publicação", en: "Launch" },
    text: {
      pt: "Domínio, hospedagem, analytics e testes finais. Entrego os arquivos e te ensino a mexer no essencial.",
      en: "Domain, hosting, analytics and final tests. I hand over the files and teach you the essentials.",
    },
    time: { pt: "Entrega", en: "Delivery" },
  },
];

export const TESTIMONIALS: { quote: L; result: L; name: string; company: string }[] = [
  {
    quote: {
      pt: "O site ficou rápido, bonito e fácil de apresentar para cliente. A sensação foi de marca maior no mesmo dia da publicação.",
      en: "The site came out fast, beautiful and easy to present to clients. It felt like a bigger brand the same day it launched.",
    },
    result: { pt: "+300% em vendas no primeiro mês", en: "+300% sales in month one" },
    name: "Carlos Mendes",
    company: "TechVision",
  },
  {
    quote: {
      pt: "Minha identidade saiu do básico. Agora tudo combina: site, Instagram, card de preço e abordagem no WhatsApp.",
      en: "My identity went beyond the basics. Now everything matches: site, Instagram, price card and WhatsApp pitch.",
    },
    result: { pt: "Reposicionamento visual", en: "Visual repositioning" },
    name: "Ana Paula Rodrigues",
    company: "Bella Studio",
  },
  {
    quote: {
      pt: "O fluxo ficou muito mais objetivo. Antes o cliente se perdia; agora chega direto no contato certo.",
      en: "The flow is far more direct. Before, clients got lost; now they land straight on the right contact.",
    },
    result: { pt: "5x mais leads", en: "5x more leads" },
    name: "Ricardo Fernandes",
    company: "RF Imóveis",
  },
  {
    quote: {
      pt: "A loja passou confiança. As fotos apareceram melhor, os produtos ficaram fáceis de comparar e o checkout parece simples.",
      en: "The store feels trustworthy. Photos look better, products are easy to compare and checkout feels simple.",
    },
    result: { pt: "Loja com cara premium", en: "A premium-looking store" },
    name: "Mariana Costa",
    company: "Moda Plus",
  },
  {
    quote: {
      pt: "O convite ficou elegante, leve para enviar e com todas as informações no lugar certo. Recebi elogios antes mesmo do evento.",
      en: "The invitation is elegant, light to send and has every detail in the right place. I got compliments before the event.",
    },
    result: { pt: "Entrega em 48h", en: "Delivered in 48h" },
    name: "Camila Torres",
    company: "Lumina Convites",
  },
  {
    quote: {
      pt: "O logo, as cores e o site finalmente conversam. A marca ganhou presença e ficou pronta para campanha.",
      en: "Logo, colours and site finally talk to each other. The brand gained presence and is ready for campaigns.",
    },
    result: { pt: "Marca consistente", en: "Consistent brand" },
    name: "Bianca Almeida",
    company: "Studio Alva",
  },
];

export const FAQ: { q: L; a: L }[] = [
  {
    q: { pt: "Como começamos um projeto?", en: "How do we start a project?" },
    a: {
      pt: "Você preenche o briefing aqui no site (leva 2 minutos) ou me chama no WhatsApp. Eu respondo em até 24h com escopo, prazo e preço fechados, e só começo depois da sua aprovação.",
      en: "Fill in the briefing on this page (2 minutes) or message me on WhatsApp. I reply within 24h with a fixed scope, timeline and price, and only start after your approval.",
    },
  },
  {
    q: { pt: "Quanto custa um site ou landing page?", en: "How much does a website or landing page cost?" },
    a: {
      pt: "Landing pages ficam entre R$ 900 e R$ 2.800 e sites de marca entre R$ 1.800 e R$ 4.500, dependendo de páginas, textos e integrações. Use o orçamento interativo abaixo para uma estimativa na hora.",
      en: "Landing pages range from R$ 900 to R$ 2,800 and brand sites from R$ 1,800 to R$ 4,500, depending on pages, copy and integrations. Use the interactive estimator below for an instant estimate.",
    },
  },
  {
    q: { pt: "Convites e tabelas de preço também entram no fluxo?", en: "Do invitations and price boards follow the same flow?" },
    a: {
      pt: "Sim, em versão rápida: briefing por WhatsApp, primeira arte em 1 a 2 dias e ajustes até aprovar. Convites vão de R$ 80 a R$ 350 e tabelas de R$ 70 a R$ 280.",
      en: "Yes, in a fast version: WhatsApp briefing, first artwork in 1–2 days and tweaks until approved. Invitations run R$ 80–350 and price boards R$ 70–280.",
    },
  },
  {
    q: { pt: "O redesign muda só as cores?", en: "Does a redesign only change the colours?" },
    a: {
      pt: "Não. Começo com uma auditoria de UX e conversão: onde o visitante trava, o que a página promete e o que falta. Cor e tipografia entram depois da estrutura.",
      en: "No. I start with a UX and conversion audit: where visitors get stuck, what the page promises and what is missing. Colour and type come after structure.",
    },
  },
  {
    q: { pt: "Tem revisão incluída?", en: "Are revisions included?" },
    a: {
      pt: "Sim. Cada etapa tem rodadas de ajuste incluídas até você aprovar. Mudanças de escopo depois da aprovação são orçadas à parte, sempre antes de serem feitas.",
      en: "Yes. Each stage includes revision rounds until you approve. Scope changes after approval are quoted separately, always before work starts.",
    },
  },
  {
    q: { pt: "Você publica o projeto?", en: "Do you publish the project?" },
    a: {
      pt: "Publico e oriento domínio, hospedagem, analytics e links de contato. Em projetos gráficos entrego os arquivos finais em alta resolução e vetor.",
      en: "I publish it and guide you through domain, hosting, analytics and contact links. For graphic projects I deliver final high-resolution and vector files.",
    },
  },
  {
    q: { pt: "Como funciona o pagamento?", en: "How does payment work?" },
    a: {
      pt: "Geralmente 50% para começar e 50% na entrega, por Pix ou transferência. Projetos maiores podem ser divididos em marcos. Para clientes fora do Brasil, trabalho também via Fiverr e Contra.",
      en: "Usually 50% to start and 50% on delivery, by Pix or bank transfer. Larger projects can be split into milestones. For clients abroad I also work through Fiverr and Contra.",
    },
  },
];
