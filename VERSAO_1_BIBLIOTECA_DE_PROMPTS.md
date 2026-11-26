# Snapshot Aprovado — Portal Prompt Simples (Formato Editorial Original)

**Data do Snapshot:** 25/11/2026  
**Modelo:** Editorial Minimalista (estilo Medium / Substack / TechCrunch)  
**Stack:** Next.js 14.2.35 (App Router + SSG), TypeScript, Tailwind CSS, Markdown/MDX (`gray-matter`), `lucide-react`

---

## 1. Características da Versão Aprovada

- **Hero Editorial Limpo (`src/app/page.tsx`):**
  - Título `H1`: *"Prompts práticos e atalhos de Inteligência Artificial para trabalhar melhor."* (sem badge promocional no topo).
  - Subtítulo objetivo + 3 destaques com check verde (`Prompts copiáveis com 1 clique`, `Exemplos adaptados ao Brasil`, `100% gratuito e sem cadastro obrigatório`).
  - 2 botões de CTA: `"Explorar guias e prompts →"` e `"Como testamos os prompts"`.
- **Layout 2 Colunas (`lg:grid-cols-12`):**
  - **Esquerda (`lg:col-span-8`):** Cabeçalho *"Artigos e Guias Recentes"* + `<HomeExplorer />` com busca em tempo real, abas de categorias (`Todas`, `Produtividade`, `Carreira e Negócios`, `Criação de Conteúdo`, `Ferramentas de IA`) e grid de 2 colunas com cards editoriais limpos (badge de categoria, tempo de leitura, título, resumo de 3 linhas, autor, data e link `"Ler →"`).
  - **Direita (`lg:col-span-4`):** Card `"TRILHAS POR OBJETIVO"` + `<AdSlot position="sidebar" />` (colapsado se inativo).
- **Sem Newsletter e Sem E-mail Público:** Removidos da Home, das páginas de artigos, do rodapé e da barra lateral de `/contato`.
- **Páginas Obrigatórias AdSense & LGPD:** `/sobre`, `/contato` (formulário funcional), `/privacidade` (LGPD/GDPR/CCPA + Google Analytics + cookies DART do AdSense), `/termos`, `/sitemap.xml`, `/robots.txt`, `/public/ads.txt` e `<CookieBanner />`.

---

## 2. Código-Fonte Principal (`src/app/page.tsx` e `src/components/HomeExplorer.tsx`)

### `src/app/page.tsx`

```tsx
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, SITE_CONFIG } from "@/lib/site-config";
import { HomeExplorer } from "@/components/HomeExplorer";
import { AdSlot } from "@/components/AdSlot";

export default function HomePage() {
  const posts = getAllPosts();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: "pt-BR",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="border-b border-gray-100 bg-gradient-to-b from-slate-50/70 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-[1.12]">
              Prompts práticos e atalhos de{" "}
              <span className="text-brand-blue">Inteligência Artificial</span>{" "}
              para trabalhar melhor.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              Sem jargão técnico nem teoria vazia. Guias testados na prática para iniciantes, empreendedores e profissionais brasileiros economizarem horas por semana com ChatGPT, Claude e Gemini.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-emerald" aria-hidden="true" />
                Prompts copiáveis com 1 clique
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-emerald" aria-hidden="true" />
                Exemplos adaptados ao Brasil
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-emerald" aria-hidden="true" />
                100% gratuito e sem cadastro obrigatório
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#artigos"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blueDark"
              >
                <span>Explorar guias e prompts</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/sobre"
                className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                Como testamos os prompts
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Artigos e Guias Recentes
              </h2>
              <span className="text-xs font-medium text-gray-500">
                {posts.length} publicações disponíveis
              </span>
            </div>

            <HomeExplorer posts={posts} />
          </div>

          <aside
            aria-label="Barra lateral da página inicial"
            className="space-y-6 lg:col-span-4"
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Trilhas por Objetivo
              </h3>
              <ul className="mt-3.5 space-y-3">
                {CATEGORIES.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/?categoria=${category.slug}#artigos`}
                      className="block rounded-xl border border-gray-100 bg-gray-50/60 p-3 transition hover:border-blue-200 hover:bg-blue-50/40"
                    >
                      <span className="text-sm font-semibold text-gray-900">
                        {category.name}
                      </span>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                        {category.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <AdSlot position="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
```
