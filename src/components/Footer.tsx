import Link from "next/link";
import { Sparkles } from "lucide-react";
import { CATEGORIES, SITE_CONFIG } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-900"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-blue text-white">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-base font-bold tracking-tight">
                Prompt <span className="text-brand-blue">Simples</span>
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Categorias
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/?categoria=${cat.slug}#artigos`}
                    className="text-gray-600 transition hover:text-brand-blue"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Institucional e Legal
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-600 transition hover:text-brand-blue"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-600 transition hover:text-brand-blue"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-gray-600 transition hover:text-brand-blue"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-gray-600 transition hover:text-brand-blue"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-gray-600 transition hover:text-brand-blue"
                >
                  Mapa do Site (Sitemap)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center">
          <p>
            © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
          <p>
            Conteúdo educativo em Português do Brasil. Revise sempre respostas geradas por IA antes de decisões críticas.
          </p>
        </div>
      </div>
    </footer>
  );
}
