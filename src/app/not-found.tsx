import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
        Erro 404
      </span>
      <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Página não encontrada
      </h1>
      <p className="mt-3 text-base text-gray-600">
        O artigo ou página que você tentou acessar não existe ou foi movido para um novo endereço.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-blueDark"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>Voltar para a página inicial</span>
      </Link>
    </div>
  );
}
