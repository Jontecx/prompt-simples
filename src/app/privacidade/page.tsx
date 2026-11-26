import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do portal Prompt Simples em conformidade com a LGPD, GDPR e CCPA, detalhando uso de cookies, Google Analytics e Google AdSense.",
  alternates: {
    canonical: "/privacidade",
  },
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="border-b border-gray-200 pb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-blue">
          Transparência e Conformidade Legal
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Última atualização: 25 de novembro de 2026
        </p>
      </header>

      <div className="mt-8 space-y-8 text-[15.5px] leading-[1.8] text-gray-700">
        <section>
          <p>
            A sua privacidade é uma prioridade para o portal{" "}
            <strong>{SITE_CONFIG.name}</strong> (acessível em{" "}
            <span className="font-medium text-gray-900">{SITE_CONFIG.url}</span>).
            Esta Política de Privacidade descreve de maneira transparente como
            coletamos, utilizamos, armazenamos e protegemos informações quando
            você visita nosso site, em conformidade com a{" "}
            <strong>
              Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº
              13.709/2018)
            </strong>{" "}
            do Brasil, bem como com os princípios do{" "}
            <strong>GDPR</strong> (União Europeia) e da <strong>CCPA</strong>{" "}
            (Califórnia, EUA), quando aplicáveis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            1. Quais dados coletamos e para que servem
          </h2>
          <p className="mt-2">
            Você pode ler todos os artigos e copiar todos os prompts do{" "}
            {SITE_CONFIG.name} sem precisar criar conta ou informar dados
            pessoais. Coletamos informações apenas nas seguintes hipóteses:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Dados fornecidos voluntariamente:</strong> Quando você
              preenche nosso formulário de{" "}
              <Link
                href="/contato"
                className="text-brand-blue underline underline-offset-2"
              >
                Contato
              </Link>{" "}
              (nome, e-mail, assunto e mensagem). Esses dados são usados
              exclusivamente para responder ao seu atendimento.
            </li>
            <li>
              <strong>Dados técnicos e de navegação:</strong> Informações
              anônimas ou pseudonimizadas coletadas automaticamente pelos
              navegadores e servidores, tais como endereço IP abreviado, tipo de
              dispositivo, navegador, sistema operacional, páginas visitadas,
              tempo de permanência e origem de tráfego, com finalidade estritamente
              estatística e de segurança.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            2. Uso de Cookies e Tecnologias Semelhantes
          </h2>
          <p className="mt-2">
            Cookies são pequenos arquivos de texto armazenados no seu navegador
            para lembrar preferências e viabilizar recursos técnicos do site.
            Utilizamos:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Cookies essenciais:</strong> Necessários para o
              funcionamento básico da interface e para salvar sua escolha no aviso
              de consentimento de cookies (armazenado localmente no seu navegador).
            </li>
            <li>
              <strong>Cookies de desempenho e análise (Google Analytics):</strong>{" "}
              Utilizamos o Google Analytics para compreender de forma agregada
              quais artigos têm maior relevância, taxa de leitura e eventuais
              erros técnicos de carregamento, sem identificar você pessoalmente.
            </li>
            <li>
              <strong>Cookies de publicidade (Google AdSense e terceiros):</strong>{" "}
              Para manter este portal gratuito, exibimos anúncios fornecidos pelo
              Google e parceiros certificados de publicidade programática.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-slate-50/80 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            3. Google AdSense e Cookies DART (DoubleClick)
          </h2>
          <p className="mt-2">
            O Google, como fornecedor terceirizado, utiliza cookies (incluindo o{" "}
            <strong>cookie DART</strong>) para veicular anúncios neste site com
            base nas visitas anteriores dos usuários ao{" "}
            <strong>{SITE_CONFIG.name}</strong> e a outros sites na internet.
          </p>
          <p className="mt-3">
            A utilização do cookie DART permite que o Google e seus parceiros
            exibam anúncios mais relevantes ao perfil de interesses do visitante.
            Fornecedores e redes de anúncios terceiros também podem usar cookies
            para medir a eficácia de campanhas publicitárias.
          </p>
          <p className="mt-3">
            <strong>Como desativar anúncios personalizados:</strong> Você pode
            desativar o uso do cookie DART e gerenciar suas preferências de
            publicidade personalizada diretamente nas{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-medium text-brand-blue underline underline-offset-2 hover:text-brand-blueDark"
            >
              Configurações de Anúncios do Google (adssettings.google.com)
            </a>{" "}
            ou consultando a página oficial sobre como o Google utiliza dados de
            sites parceiros em{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-medium text-brand-blue underline underline-offset-2 hover:text-brand-blueDark"
            >
              policies.google.com/technologies/ads
            </a>
            . Também é possível bloquear cookies diretamente nas configurações do
            seu navegador.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            4. Compartilhamento e Armazenamento de Dados
          </h2>
          <p className="mt-2">
            Não vendemos, alugamos ou comercializamos dados pessoais de leitores.
            O tratamento eventual de dados limita-se a provedores de
            infraestrutura indispensáveis para operação do site (hospedagem na
            Vercel, serviço de entrega de e-mails ou automação de atendimento, e
            ferramentas de análise/publicidade do Google), todos submetidos a
            padrões rigorosos de segurança e confidencialidade.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            5. Seus Direitos (LGPD, GDPR e CCPA)
          </h2>
          <p className="mt-2">
            Nos termos do artigo 18 da LGPD (e normas equivalentes no GDPR e na
            CCPA), você tem direito a:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>Confirmar a existência de tratamento de dados pessoais;</li>
            <li>Acessar, corrigir ou solicitar a atualização de dados incompletos;</li>
            <li>
              Solicitar a anonimização, bloqueio ou eliminação de dados pessoais
              fornecidos com base em consentimento;
            </li>
            <li>Revogar o consentimento a qualquer momento;</li>
            <li>
              Solicitar esclarecimentos sobre o uso de cookies e parceiros de
              publicidade.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            6. Encarregado de Proteção de Dados (DPO) e Contato
          </h2>
          <p className="mt-2">
            Para exercer qualquer um dos direitos acima ou esclarecer dúvidas sobre
            esta Política de Privacidade, entre em contato através da nossa{" "}
            <Link
              href="/contato"
              className="font-medium text-brand-blue underline underline-offset-2"
            >
              página de contato
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            7. Atualizações desta Política
          </h2>
          <p className="mt-2">
            Podemos atualizar esta Política de Privacidade periodicamente para
            refletir ajustes legais, regulatórios ou mudanças nos serviços
            utilizados. A data no topo desta página indicará sempre a versão mais
            recente em vigor.
          </p>
        </section>
      </div>
    </div>
  );
}
