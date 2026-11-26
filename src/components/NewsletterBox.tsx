"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Mail } from "lucide-react";

interface NewsletterBoxProps {
  compact?: boolean;
  source?: string;
}

export function NewsletterBox({
  compact = false,
  source = "article",
}: NewsletterBoxProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL?.trim() || "";
  const inputId = `newsletter-email-${source}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMessage("Informe um e-mail válido.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "newsletter",
            email: trimmed,
            source,
            timestamp: new Date().toISOString(),
          }),
        });
        if (!res.ok) {
          throw new Error("Falha ao registrar inscrição.");
        }
      }
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMessage(
        "Não foi possível concluir agora. Tente novamente em instantes."
      );
      setStatus("error");
    }
  };

  return (
    <section
      aria-label="Newsletter Prompt Simples"
      className={`rounded-2xl border border-gray-200 bg-slate-50 ${
        compact ? "p-5" : "p-6 sm:p-8"
      }`}
    >
      <div className="flex items-center gap-2 text-brand-blue">
        <Mail className="h-4 w-4" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Newsletter Semanal
        </span>
      </div>

      <h3
        className={`mt-2 font-bold text-gray-900 ${
          compact ? "text-lg" : "text-xl sm:text-2xl"
        }`}
      >
        Receba 3 prompts testados toda semana
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
        Sem spam. Apenas atalhos práticos de Inteligência Artificial prontos para copiar e economizar horas no trabalho.
      </p>

      {status === "success" ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm font-medium text-emerald-800">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-emerald" aria-hidden="true" />
          <span>
            Inscrição confirmada! Fique de olho na sua caixa de entrada.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2.5" noValidate>
          <div className={compact ? "space-y-2.5" : "flex flex-col gap-2.5 sm:flex-row"}>
            <div className="flex-1">
              <label htmlFor={inputId} className="sr-only">
                Seu melhor e-mail
              </label>
              <input
                id={inputId}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seuemail@empresa.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={`inline-flex items-center justify-center rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blueDark disabled:opacity-60 ${
                compact ? "w-full" : "shrink-0"
              }`}
            >
              {status === "loading" ? "Enviando..." : "Quero receber"}
            </button>
          </div>
          {status === "error" && errorMessage && (
            <p className="text-xs font-medium text-red-600">{errorMessage}</p>
          )}
          <p className="text-[11px] text-gray-500">
            Respeitamos sua privacidade conforme a LGPD. Cancele quando quiser.
          </p>
        </form>
      )}
    </section>
  );
}
