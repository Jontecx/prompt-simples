"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Dúvida Editorial");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");

  const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL?.trim() || "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setFeedback("Por favor, preencha nome, e-mail e mensagem.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact",
            name: name.trim(),
            email: email.trim(),
            subject,
            message: message.trim(),
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao enviar para o servidor.");
        }
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback(
        "Não foi possível enviar sua mensagem automaticamente. Por favor, tente novamente em alguns instantes."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-center">
        <CheckCircle2
          className="mx-auto h-10 w-10 text-brand-emerald"
          aria-hidden="true"
        />
        <h3 className="mt-3 text-lg font-bold text-gray-900">
          Mensagem enviada com sucesso
        </h3>
        <p className="mt-1.5 text-sm text-gray-700">
          Obrigado pelo contato! Nossa equipe editorial responderá em até 2 dias úteis.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-semibold text-gray-900"
          >
            Nome completo
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ex.: Mariana Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-semibold text-gray-900"
          >
            E-mail
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="voce@exemplo.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-semibold text-gray-900"
        >
          Assunto
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="Dúvida Editorial">Dúvida Editorial ou Sugestão de Pauta</option>
          <option value="Correção Técnica">Correção Técnica em Artigo/Prompt</option>
          <option value="Parcerias e Publicidade">Parcerias e Publicidade</option>
          <option value="Privacidade e LGPD">Privacidade e Dados (LGPD)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-semibold text-gray-900"
        >
          Mensagem
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Escreva como podemos ajudar..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {status === "error" && feedback && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-blueDark disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span>{status === "loading" ? "Enviando..." : "Enviar mensagem"}</span>
      </button>
    </form>
  );
}
