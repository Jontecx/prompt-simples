import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Compass, ShieldCheck, Sparkles, Users } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a missão editorial do Prompt Simples: democratizar o uso prático da Inteligência Artificial no Brasil com rigor, clareza e transparência.",
  alternates: {
    canonical: "/sobre",
  },
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="border-b border-gray-200 pb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Quem Somos
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Sobre o {SITE_CONFIG.name}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          Nossa missão é traduzir o poder da Inteligência Artificial em instruções simples, éticas e diretamente aplicáveis ao trabalho e aos negócios no Brasil.
        </p>
      </header>

      <div className="mt-10 space-y-10 text-[16px] leading-[1.8] text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-gray-900">
            Por que o Prompt Simples existe
          </h2>
          <p className="mt-3">
            A Inteligência Artificial deixou de ser um tema restrito a engenheiros e grandes corporações de tecnologia. Hoje, profissionais autônomos, pequenas empresas, criadores de conteúdo e equipes administrativas podem economizar horas semanais usando ferramentas como ChatGPT, Claude, Gemini e Perplexity. No entanto, grande parte do material disponível na internet é excessivamente técnico, traduzido de forma artificial ou cheio de promessas irreais.
          </p>
          <p className="mt-3">
            O <strong>{SITE_CONFIG.name}</strong> nasceu para preencher essa lacuna no ecossistema brasileiro. Nosso foco editorial é entregar guias objetivos, escritos em Português do Brasil natural, com contexto local (legislação, cultura de atendimento, mercado de trabalho e realidade das PMEs brasileiras) e blocos de comandos prontos para copiar e adaptar em segundos.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-slate-50/70 p-5">
            <Compass className="h-6 w-6 text-brand-blue" aria-hidden="true" />
            <h3 className="mt-3 text-base font-bold text-gray-900">
              Rigor Prático
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Cada prompt publicado em nossos artigos é testado em cenários reais antes de ir ao ar, evitando fórmulas genéricas que geram respostas robóticas.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-slate-50/70 p-5">
            <ShieldCheck className="h-6 w-6 text-brand-emerald" aria-hidden="true" />
            <h3 className="mt-3 text-base font-bold text-gray-900">
              Transparência Editorial
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Deixamos claro o que a IA faz bem e onde a revisão humana é indispensável. Não prometemos dinheiro fácil nem resultados automáticos sem critério.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-slate-50/70 p-5">
            <Users className="h-6 w-6 text-brand-blue" aria-hidden="true" />
            <h3 className="mt-3 text-base font-bold text-gray-900">
              Acesso Gratuito
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Mantemos nosso acervo 100% aberto ao público graças à veiculação responsável de publicidade programática e parcerias devidamente sinalizadas.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900">
            Nossa metodologia de criação de conteúdo
          </h2>
          <p className="mt-3">
            Todo guia publicado no portal passa por uma curadoria em quatro etapas antes da publicação:
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-emerald" aria-hidden="true" />
              <span>
                <strong>Identificação de problemas reais:</strong> Priorizamos gargalos cotidianos de produtividade, carreira, atendimento ao cliente e produção de conteúdo.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-emerald" aria-hidden="true" />
              <span>
                <strong>Engenharia e validação de prompts:</strong> Estruturamos instruções com papel definido, contexto, restrições claras e formato de saída previsível.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-emerald" aria-hidden="true" />
              <span>
                <strong>Revisão humana de linguagem e segurança:</strong> Verificamos clareza gramatical, riscos de viés, privacidade (LGPD) e precisão das recomendações.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-emerald" aria-hidden="true" />
              <span>
                <strong>Atualização contínua:</strong> Modelos de IA evoluem rapidamente. Revisamos artigos periodicamente para refletir novos recursos de mercado.
              </span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Quer sugerir uma pauta ou falar com nossa equipe?
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Estamos sempre abertos a sugestões de temas, correções técnicas e propostas de colaboração editorial.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contato"
              className="rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blueDark"
            >
              Entrar em contato
            </Link>
            <Link
              href="/privacidade"
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Ler Política de Privacidade
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
