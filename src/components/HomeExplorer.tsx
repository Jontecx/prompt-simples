"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search, X } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { CATEGORIES, formatDateBR, getCategoryBySlug } from "@/lib/site-config";

interface HomeExplorerProps {
  posts: PostMeta[];
}

export function HomeExplorer({ posts }: HomeExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("categoria");
      if (cat && CATEGORIES.some((c) => c.slug === cat)) {
        setSelectedCategory(cat);
      } else {
        setSelectedCategory("todas");
      }
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const url = new URL(window.location.href);
    if (slug === "todas") {
      url.searchParams.delete("categoria");
    } else {
      url.searchParams.set("categoria", slug);
    }
    window.history.replaceState({}, "", url.toString());
  };

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "todas" || post.categorySlug === selectedCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      const searchable = [
        post.title,
        post.description,
        post.category,
        post.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <section id="artigos" aria-label="Explorar artigos" className="scroll-mt-20">
      {/* Barra de busca + Filtros */}
      <div className="mb-8 space-y-5">
        <div className="relative">
          <label htmlFor="search-articles" className="sr-only">
            Buscar artigos e prompts
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-articles"
            name="search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por ChatGPT, produtividade, WhatsApp, currículo, Reels..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Limpar busca"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          role="tablist"
          aria-label="Filtrar artigos por categoria"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === "todas"}
            onClick={() => handleCategoryChange("todas")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              selectedCategory === "todas"
                ? "bg-gray-900 text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            Todas ({posts.length})
          </button>

          {CATEGORIES.map((category) => {
            const count = posts.filter(
              (p) => p.categorySlug === category.slug
            ).length;
            const isSelected = selectedCategory === category.slug;
            return (
              <button
                key={category.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleCategoryChange(category.slug)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-brand-blue text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:bg-blue-50/40"
                }`}
              >
                {category.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Artigos */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 p-10 text-center">
          <p className="text-base font-semibold text-gray-900">
            Nenhum artigo encontrado para essa busca.
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Tente outro termo ou limpe os filtros para ver todos os guias publicados.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              handleCategoryChange("todas");
            }}
            className="mt-4 rounded-lg bg-brand-blue px-4 py-2 text-xs font-semibold text-white hover:bg-brand-blueDark"
          >
            Mostrar todos os artigos
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredPosts.map((post) => {
            const catConfig = getCategoryBySlug(post.categorySlug);
            const badgeClass =
              catConfig?.badgeClass ||
              "bg-gray-100 text-gray-700 border-gray-200";

            return (
              <article
                key={post.slug}
                className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 transition duration-150 hover:border-blue-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badgeClass}`}
                    >
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readingTime} min
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-brand-blue">
                    <Link href={`/blog/${post.slug}`} className="block">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {post.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                  <div>
                    <span className="font-medium text-gray-800">
                      {post.author.name}
                    </span>
                    <span className="mx-1.5">•</span>
                    <time dateTime={post.date}>{formatDateBR(post.date)}</time>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Ler artigo: ${post.title}`}
                    className="inline-flex items-center gap-1 font-semibold text-brand-blue transition group-hover:translate-x-0.5"
                  >
                    <span>Ler</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
