import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de Uso do portal Prompt Simples, incluindo regras de utilização de prompts, propriedade intelectual e isenção de responsabilidade sobre ferramentas de IA.",
  alternates: {
    canonical: "/termos",
  },
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="border-b border-gray-200 pb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-blue">
          Regras de Utilização
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Termos de Uso
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Última atualização: 25 de novembro de 2026
        </p>
      </header>

      <div className="mt-8 space-y-8 text-[15.5px] leading-[1.8] text-gray-700">
        <section>
          <p>
            Bem-vindo ao <strong>{SITE_CONFIG.name}</strong>. Ao acessar e
            utilizar este site ({SITE_CONFIG.url}), você concorda integralmente com
            os termos e condições descritos abaixo. Caso não concorde com alguma
            cláusula, recomendamos que interrompa a navegação.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            1. Natureza Educacional do Conteúdo
          </h2>
          <p className="mt-2">
            Todo o material publicado no <strong>{SITE_CONFIG.name}</strong> —
            incluindo artigos, comparativos, guias passo a passo e modelos de
            prompts — possui caráter exclusivamente informativo e educacional.
            Nosso objetivo é ensinar boas práticas no uso de ferramentas de
            Inteligência Artificial generativa para produtividade, carreira,
            negócios e criação de conteúdo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            2. Licença de Uso dos Prompts e Propriedade Intelectual
          </h2>
          <p className="mt-2">
            Os modelos de prompts disponibilizados nos quadros &ldquo;Copiar com 1
            Clique&rdquo; podem ser livremente copiados, adaptados e utilizados em
            seus projetos pessoais, acadêmicos ou comerciais no dia a dia.
          </p>
          <p className="mt-3">
            Por outro lado, a reprodução integral, raspagem automatizada
            (scraping) em massa ou republicação dos textos editoriais completos,
            identidade visual, marcas e estrutura do código do site em outros
            domínios sem autorização prévia por escrito é expressamente proibida,
            nos termos da Lei de Direitos Autorais (Lei nº 9.610/1998).
          </p>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            3. Isenção de Responsabilidade sobre Resultados de Ferramentas de IA
          </h2>
          <p className="mt-2">
            Modelos de linguagem e ferramentas de Inteligência Artificial de
            terceiros (como ChatGPT, Claude, Gemini, Perplexity e similares) são
            sistemas probabilísticos sujeitos a erros factuais, omissões ou
            &ldquo;alucinações&rdquo;. Portanto:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Revisão humana obrigatória:</strong> O usuário é o único
              responsável por revisar, validar e editar qualquer resposta gerada
              por IA antes de publicá-la, enviá-la a clientes ou utilizá-la em
              decisões empresariais.
            </li>
            <li>
              <strong>Não substitui orientação profissional:</strong> Nenhum
              conteúdo ou prompt publicado neste site constitui aconselhamento
              jurídico, médico, contábil, financeiro ou de investimentos.
            </li>
            <li>
              <strong>Proteção de dados confidenciais:</strong> Nunca insira dados
              sigilosos de terceiros, senhas, dados bancários ou informações
              sensíveis protegidas pela LGPD em ferramentas públicas de IA sem
              observar as políticas de privacidade do respectivo fornecedor.
            </li>
            <li>
              <strong>Resultados não garantidos:</strong> O{" "}
              {SITE_CONFIG.name} não garante ganhos financeiros específicos,
              aprovação em processos seletivos ou desempenho comercial decorrente
              da aplicação dos prompts sugeridos.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            4. Links Externos e Serviços de Terceiros
          </h2>
          <p className="mt-2">
            Nossos artigos podem mencionar ou conter links para plataformas
            externas de IA, documentações oficiais ou anúncios veiculados via
            Google AdSense. Não temos controle sobre a disponibilidade, preços,
            políticas de privacidade ou alterações de planos gratuitos/pagos
            dessas plataformas terceiras.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            5. Privacidade e Cookies
          </h2>
          <p className="mt-2">
            O tratamento de dados pessoais e o uso de cookies seguem rigorosamente
            o disposto em nossa{" "}
            <Link
              href="/privacidade"
              className="font-medium text-brand-blue underline underline-offset-2"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            6. Alterações e Foro Aplicável
          </h2>
          <p className="mt-2">
            Estes Termos de Uso podem ser atualizados a qualquer tempo para
            manter a adequação legal e operacional do portal. Estes termos são
            regidos pelas leis da República Federativa do Brasil. Em caso de
            dúvidas, entre em contato através da nossa{" "}
            <Link
              href="/contato"
              className="font-medium text-brand-blue underline underline-offset-2"
            >
              página de contato
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
