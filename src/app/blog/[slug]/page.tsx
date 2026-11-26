import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  ListTree,
  RefreshCw,
  User,
} from "lucide-react";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import {
  formatDateBR,
  getCategoryBySlug,
  SITE_CONFIG,
} from "@/lib/site-config";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { AdSlot } from "@/components/AdSlot";

interface PageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Artigo não encontrado",
    };
  }

  const canonicalUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      locale: SITE_CONFIG.locale,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.categorySlug, 3);
  const categoryConfig = getCategoryBySlug(post.categorySlug);
  const canonicalUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt,
    inLanguage: "pt-BR",
    wordCount: post.wordCount,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.category,
        item: `${SITE_CONFIG.url}/?categoria=${post.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Breadcrumbs */}
        <nav
          aria-label="Caminho estrutural"
          className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
        >
          <Link href="/" className="hover:text-brand-blue">
            Início
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link
            href={`/?categoria=${post.categorySlug}#artigos`}
            className="hover:text-brand-blue"
          >
            {post.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="line-clamp-1 font-medium text-gray-800">
            {post.title}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Coluna Principal do Artigo */}
          <article className="lg:col-span-8">
            <header className="border-b border-gray-200 pb-7">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/?categoria=${post.categorySlug}#artigos`}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition hover:opacity-85 ${
                    categoryConfig?.badgeClass ||
                    "border-blue-200 bg-blue-50 text-blue-700"
                  }`}
                >
                  {post.category}
                </Link>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.readingTime} min de leitura ({post.wordCount} palavras)
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-[1.15]">
                {post.title}
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  <span>
                    Por{" "}
                    <strong className="font-semibold text-gray-900">
                      {post.author.name}
                    </strong>{" "}
                    <span className="text-gray-400">• {post.author.role}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar
                    className="h-3.5 w-3.5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>
                    Publicado em{" "}
                    <time dateTime={post.date}>{formatDateBR(post.date)}</time>
                  </span>
                </div>

                {post.updatedAt && post.updatedAt !== post.date && (
                  <div className="flex items-center gap-1.5">
                    <RefreshCw
                      className="h-3.5 w-3.5 text-brand-emerald"
                      aria-hidden="true"
                    />
                    <span>
                      Atualizado em{" "}
                      <time dateTime={post.updatedAt}>
                        {formatDateBR(post.updatedAt)}
                      </time>
                    </span>
                  </div>
                )}
              </div>
            </header>

            {/* Sumário Automático (Índice) */}
            {post.headings.length > 0 && (
              <nav
                aria-label="Sumário do artigo"
                className="my-7 rounded-2xl border border-gray-200 bg-slate-50/80 p-5"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
                  <ListTree className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                  <span>Neste guia você vai ver</span>
                </div>
                <ol className="mt-3 space-y-2 text-sm">
                  {post.headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={heading.level === 3 ? "pl-4" : ""}
                    >
                      <a
                        href={`#${heading.id}`}
                        className="text-gray-700 transition hover:text-brand-blue hover:underline"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Corpo do Artigo + Prompts Copiáveis + AdSlot In-Article após 2º parágrafo */}
            <div className="mt-6">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Tópicos:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Box do Autor */}
            <section
              aria-label="Sobre o autor"
              className="mt-8 rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-base font-bold text-brand-blue">
                  {post.author.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {post.author.name}
                  </p>
                  <p className="text-xs font-medium text-brand-blue">
                    {post.author.role}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </section>

            {/* Artigos Relacionados */}
            {relatedPosts.length > 0 && (
              <section
                aria-label="Artigos relacionados"
                className="mt-12 border-t border-gray-200 pt-8"
              >
                <h2 className="text-xl font-bold text-gray-900">
                  Continue aprendendo na prática
                </h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue">
                        {related.category}
                      </span>
                      <h3 className="mt-1.5 line-clamp-3 text-sm font-bold leading-snug text-gray-900 group-hover:text-brand-blue">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-xs text-gray-500">
                        {related.readingTime} min de leitura
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-brand-blue"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Voltar para todos os artigos</span>
              </Link>
            </div>
          </article>

          {/* Barra Lateral Sticky */}
          <aside
            aria-label="Barra lateral do artigo"
            className="space-y-6 lg:col-span-4"
          >
            <div className="space-y-6 lg:sticky lg:top-24">
              {post.headings.length > 0 && (
                <div className="hidden rounded-2xl border border-gray-200 bg-white p-5 lg:block">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    Sumário Rápido
                  </h2>
                  <ul className="mt-3 space-y-2 text-xs">
                    {post.headings
                      .filter((h) => h.level === 2)
                      .map((heading) => (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            className="block leading-relaxed text-gray-600 transition hover:text-brand-blue"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <AdSlot position="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
