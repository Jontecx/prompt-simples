import type { Metadata } from "next";
import { Clock, MessageSquare, Shield } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a equipe editorial do Prompt Simples para dúvidas, sugestões de pautas, parcerias comerciais ou solicitações de privacidade (LGPD).",
  alternates: {
    canonical: "/contato",
  },
};

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="border-b border-gray-200 pb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">
          <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
          Fale Conosco
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Contato — {SITE_CONFIG.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
          Tem alguma dúvida sobre um prompt, sugestão de ferramenta para analisarmos, interesse em publicidade ou solicitação referente à LGPD? Envie sua mensagem abaixo.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Envie uma mensagem direta
            </h2>
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-5 lg:col-span-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2.5 text-brand-emerald">
              <Clock className="h-5 w-5" aria-hidden="true" />
              <h3 className="text-base font-bold text-gray-900">
                Prazo de Atendimento
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Nossa equipe editorial responde mensagens em horário comercial (segunda a sexta-feira, das 9h às 18h, horário de Brasília), com retorno médio em até <strong>2 dias úteis</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-2.5 text-gray-800">
              <Shield className="h-5 w-5 text-brand-blue" aria-hidden="true" />
              <h3 className="text-base font-bold text-gray-900">
                Privacidade e Dados (LGPD)
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              As informações enviadas neste formulário são utilizadas exclusivamente para responder à sua solicitação, em total conformidade com a Lei nº 13.709/2018 (LGPD). Não compartilhamos nem vendemos seu e-mail para terceiros.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
