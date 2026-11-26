export interface CategoryConfig {
  name: string;
  slug: string;
  description: string;
  badgeClass: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    name: "Produtividade",
    slug: "produtividade",
    description:
      "Atalhos práticos com IA para automatizar tarefas repetitivas, resumir reuniões e ganhar horas na semana.",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Carreira e Negócios",
    slug: "carreira-e-negocios",
    description:
      "Prompts para melhorar currículo, LinkedIn, atendimento no WhatsApp, propostas comerciais e vendas.",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "Criação de Conteúdo",
    slug: "criacao-de-conteudo",
    description:
      "Estruturas para criar calendários editoriais, roteiros de Reels, posts e textos naturais sem soar robótico.",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    name: "Ferramentas de IA",
    slug: "ferramentas-de-ia",
    description:
      "Guias comparativos e tutoriais práticos sobre ChatGPT, Claude, Gemini, Perplexity e automações.",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
  },
];

export const SITE_CONFIG = {
  name: "Prompt Simples",
  tagline: "Inteligência Artificial prática, sem complicação.",
  description:
    "Tutoriais objetivos, guias comparativos e prompts prontos para copiar e usar no ChatGPT, Claude e Gemini no dia a dia de trabalho e negócios.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://promptsimples.com.br").replace(
    /\/+$/,
    ""
  ),
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@promptsimples.com.br",
  locale: "pt_BR",
  language: "pt-BR",
  twitterHandle: "@promptsimples",
};

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

export function getCategoryByName(name: string): CategoryConfig | undefined {
  const normalized = slugify(name);
  return CATEGORIES.find(
    (cat) => cat.slug === normalized || slugify(cat.name) === normalized
  );
}

export function formatDateBR(isoDate: string): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("T")[0].split("-");
  if (!year || !month || !day) return isoDate;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
