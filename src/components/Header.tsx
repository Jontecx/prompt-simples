"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { CATEGORIES, SITE_CONFIG } from "@/lib/site-config";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-gray-900 transition hover:opacity-90"
          aria-label={`${SITE_CONFIG.name} - Página Inicial`}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Prompt <span className="text-brand-blue">Simples</span>
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-6 md:flex"
        >
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/?categoria=${category.slug}#artigos`}
              className="text-sm font-medium text-gray-600 transition hover:text-brand-blue"
            >
              {category.name}
            </Link>
          ))}
          <span className="h-4 w-px bg-gray-200" aria-hidden="true" />
          <Link
            href="/sobre"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="rounded-lg bg-gray-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-blue"
          >
            Contato
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 hover:bg-gray-50 md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Navegação móvel"
          className="border-t border-gray-100 bg-white px-4 py-4 md:hidden"
        >
          <div className="flex flex-col space-y-3">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/?categoria=${category.slug}#artigos`}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-blue"
              >
                {category.name}
              </Link>
            ))}
            <hr className="border-gray-100" />
            <Link
              href="/sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Sobre Nós
            </Link>
            <Link
              href="/contato"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Contato
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
