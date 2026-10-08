import type { L } from "../lib/i18n";

// Contatos — vieram do site original. Troque aqui e atualiza em todo o site.
export const CONTACT = {
  name: "Breno Silva",
  brand: "NeonStack Studio",
  whatsapp: "5521974307662",
  whatsappLabel: "+55 21 97430-7662",
  instagram: "https://www.instagram.com/kn._.lz/",
  instagramHandle: "@kn._.lz",
  fiverr: "https://www.fiverr.com/",
  contra: "https://contra.com/",
  email: "", // preencha para exibir e-mail no rodapé
  city: "Rio de Janeiro, Brasil",
};

export function waLink(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Category = "site" | "app" | "landing" | "brand";

export type Project = {
  id: string;
  title: string;
  category: Category;
  image: string;
  /** tall/square artwork rather than a browser screenshot */
  art?: boolean;
  url?: string;
  desc: L;
  result: L;
  stack: string[];
  highlights: L[];
};

export const PROJECTS: Project[] = [
  {
    id: "barbearia-elite",
    title: "Barbearia Elite",
    category: "site",
    image: "/images/work/barber.webp",
    url: "https://inquisitive-entremet-89d461.netlify.app/",
    desc: {
      pt: "Site local premium com fluxo direto para agendamento no WhatsApp.",
      en: "Premium local-business site with a direct booking flow to WhatsApp.",
    },
    result: { pt: "Agendamento em 2 toques", en: "Booking in 2 taps" },
    stack: ["React", "TypeScript", "Tailwind"],
    highlights: [
      { pt: "Hero orientado a agendamento", en: "Booking-first hero" },
      { pt: "Serviços, mestres e prova social", en: "Services, barbers and social proof" },
      { pt: "Status aberto/fechado em tempo real", en: "Live open/closed status" },
    ],
  },
  {
    id: "rede-gigafibra",
    title: "Rede GigaFibra",
    category: "landing",
    image: "/images/work/fiber.webp",
    url: "https://giganet-connect-cylh.vercel.app/",
    desc: {
      pt: "Landing page de internet fibra com planos, velocidade e CTA local.",
      en: "Fiber-internet landing page with plans, speed and a local call to action.",
    },
    result: { pt: "Promessa clara em 3 segundos", en: "Clear promise in 3 seconds" },
    stack: ["React", "TypeScript", "Tailwind"],
    highlights: [
      { pt: "Hero com promessa e prova numérica", en: "Hero with promise and numeric proof" },
      { pt: "Planos fáceis de comparar", en: "Plans that are easy to compare" },
      { pt: "Assistente de contratação", en: "Sign-up assistant" },
    ],
  },
  {
    id: "headless-store",
    title: "Atelier — Headless Store",
    category: "app",
    image: "/images/work/store.webp",
    desc: {
      pt: "Loja virtual com filtros, variantes, carrinho, cupom e checkout navegável.",
      en: "Online store with filters, variants, cart, coupon and a clickable checkout.",
    },
    result: { pt: "Checkout completo navegável", en: "Full clickable checkout" },
    stack: ["React", "TypeScript", "Tailwind"],
    highlights: [
      { pt: "Filtros por categoria e preço", en: "Category and price filters" },
      { pt: "Modal de produto com variantes", en: "Product modal with variants" },
      { pt: "Carrinho com cupom", en: "Cart with coupon" },
    ],
  },
  {
    id: "nexus-ai",
    title: "Nexus AI Analytics",
    category: "app",
    image: "/images/work/nexus.webp",
    desc: {
      pt: "Painel executivo para métricas, clientes e recomendações de crescimento com IA.",
      en: "Executive dashboard for metrics, customers and AI growth recommendations.",
    },
    result: { pt: "KPIs e insights numa tela só", en: "KPIs and insights on one screen" },
    stack: ["React", "TypeScript", "Tailwind"],
    highlights: [
      { pt: "Insights de IA sobre os dados", en: "AI insights on your data" },
      { pt: "KPIs e gráficos de receita", en: "KPI cards and revenue charts" },
    ],
  },
  {
    id: "saas-forge",
    title: "SaaS Forge",
    category: "app",
    image: "/images/work/saas.webp",
    desc: {
      pt: "Plataforma SaaS com billing, API keys, time, docs e configurações de workspace.",
      en: "SaaS platform with billing, API keys, team, docs and workspace settings.",
    },
    result: { pt: "Base de SaaS pronta para evoluir", en: "SaaS foundation ready to grow" },
    stack: ["React", "Node.js", "TypeScript"],
    highlights: [
      { pt: "Billing e planos estruturados", en: "Structured billing and plans" },
      { pt: "Chave de API com ação de copiar", en: "API key with copy action" },
    ],
  },
  {
    id: "findash",
    title: "Ledgerly — FinDash",
    category: "app",
    image: "/images/work/findash.webp",
    desc: {
      pt: "Dashboard financeiro com saldo, transações, análise e envio seguro.",
      en: "Finance dashboard with balance, transactions, analytics and secure transfers.",
    },
    result: { pt: "Histórico filtrável e envio rápido", en: "Filterable history and quick transfers" },
    stack: ["React", "TypeScript", "Tailwind"],
    highlights: [
      { pt: "Resumo financeiro", en: "Financial summary" },
      { pt: "Histórico filtrável", en: "Filterable history" },
    ],
  },
  {
    id: "taskflow",
    title: "TaskFlow Kanban",
    category: "app",
    image: "/images/work/kanban.webp",
    desc: {
      pt: "Quadro de tarefas com colunas, cards, modal de detalhe e movimentação.",
      en: "Task board with columns, cards, detail modal and drag-and-drop.",
    },
    result: { pt: "Fluxo de trabalho visual", en: "Visual workflow" },
    stack: ["React", "TypeScript", "Tailwind"],
    highlights: [
      { pt: "Colunas dinâmicas", en: "Dynamic columns" },
      { pt: "Prioridade e responsável por card", en: "Priority and owner per card" },
    ],
  },
  {
    id: "imagine",
    title: "Prompt Loom — Imagine Studio",
    category: "app",
    image: "/images/work/imagine.webp",
    desc: {
      pt: "Interface de geração de imagem com prompt, estilos, proporção e galeria.",
      en: "Image-generation UI with prompt, styles, aspect ratio and gallery.",
    },
    result: { pt: "Geração por etapas com galeria", en: "Stepwise generation with gallery" },
    stack: ["React", "TypeScript", "Tailwind"],
    highlights: [
      { pt: "Campo de prompt interativo", en: "Interactive prompt field" },
      { pt: "Estilos e proporções", en: "Styles and aspect ratios" },
    ],
  },
  {
    id: "landing-infoproduto",
    title: "Curso Digital",
    category: "landing",
    image: "/images/work/landing.webp",
    art: true,
    desc: {
      pt: "Página de venda para infoproduto com narrativa, urgência e prova social.",
      en: "Sales page for a digital course with narrative, urgency and social proof.",
    },
    result: { pt: "Copy + design focados em conversão", en: "Conversion-focused copy and design" },
    stack: ["Figma", "React", "TypeScript"],
    highlights: [
      { pt: "Copywriting orientado à conversão", en: "Conversion-driven copywriting" },
      { pt: "Animações por scroll", en: "Scroll animations" },
    ],
  },
  {
    id: "convite-digital",
    title: "Convite Digital",
    category: "brand",
    image: "/images/work/convite.webp",
    art: true,
    desc: {
      pt: "Convite digital com visual premium, confirmação de presença e mapa integrados.",
      en: "Digital invitation with premium look, RSVP and map built in.",
    },
    result: { pt: "Entrega em 48h", en: "Delivered in 48h" },
    stack: ["Figma", "HTML5 & CSS3"],
    highlights: [
      { pt: "Arte pensada para o smartphone", en: "Art designed for the smartphone" },
      { pt: "Links de WhatsApp e Maps", en: "WhatsApp and Maps links" },
    ],
  },
  {
    id: "price-board",
    title: "Social Price Board",
    category: "brand",
    image: "/images/work/pricing.webp",
    art: true,
    desc: {
      pt: "Tabela de preços e artes sociais com leitura rápida e padrão visual.",
      en: "Price table and social artwork that reads fast and stays on-brand.",
    },
    result: { pt: "Hierarquia de preços clara", en: "Clear price hierarchy" },
    stack: ["Figma", "Design gráfico"],
    highlights: [
      { pt: "Hierarquia de preços", en: "Price hierarchy" },
      { pt: "Identidade visual padronizada", en: "Consistent visual identity" },
    ],
  },
];

export const BRANDS = [
  { name: "TechVision", img: "/images/brands/techvision.jpg" },
  { name: "Bella Studio", img: "/images/brands/bellastudio.jpg" },
  { name: "RF Imóveis", img: "/images/brands/rfimoveis.jpg" },
  { name: "Moda Plus", img: "/images/brands/modaplus.jpg" },
  { name: "NovaTech", img: "/images/brands/novatech.jpg" },
];
