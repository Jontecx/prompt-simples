"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Settings, ShieldCheck, X } from "lucide-react";

interface CookieConsentState {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  updatedAt: string;
}

const STORAGE_KEY = "prompt_simples_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [advertising, setAdvertising] = useState(true);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const savePreferences = (consent: CookieConsentState) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // Ignora erro de storage em modo privado restritivo
    }
    setVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      advertising: true,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    savePreferences({
      essential: true,
      analytics,
      advertising,
      updatedAt: new Date().toISOString(),
    });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de Cookies e Privacidade"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:p-5"
    >
      {!showSettings ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
              <Cookie className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              Utilizamos cookies essenciais, de análise e de publicidade (incluindo
              cookies DART do Google AdSense) para melhorar sua leitura e manter o{" "}
              <strong className="font-semibold text-gray-900">
                Prompt Simples
              </strong>{" "}
              gratuito. Ao continuar, você concorda com nossa{" "}
              <Link
                href="/privacidade"
                className="font-medium text-brand-blue underline underline-offset-2 hover:text-brand-blueDark"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-nowrap">
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              <Settings className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Configurar</span>
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-blueDark"
            >
              Aceitar todos
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-emerald" aria-hidden="true" />
              <h2 className="text-sm font-bold text-gray-900">
                Preferências de Cookies (LGPD)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              aria-label="Voltar ao aviso resumido"
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-900">
                  Essenciais
                </span>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  Sempre ativo
                </span>
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600">
                Necessários para segurança, navegação e armazenamento da sua escolha de consentimento.
              </p>
            </div>

            <label
              htmlFor="cookie-analytics"
              className="cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-blue-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-900">
                  Analíticos (GA4)
                </span>
                <input
                  id="cookie-analytics"
                  name="cookie-analytics"
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600">
                Ajudam a entender quais guias e prompts são mais úteis de forma agregada.
              </p>
            </label>

            <label
              htmlFor="cookie-advertising"
              className="cursor-pointer rounded-xl border border-gray-200 bg-white p-3 transition hover:border-blue-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-900">
                  Publicidade (AdSense)
                </span>
                <input
                  id="cookie-advertising"
                  name="cookie-advertising"
                  type="checkbox"
                  checked={advertising}
                  onChange={(e) => setAdvertising(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600">
                Permitem anúncios relevantes via cookies DART do Google para sustentar o portal.
              </p>
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleSaveCustom}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Salvar preferências
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="rounded-lg bg-brand-blue px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-blueDark"
            >
              Aceitar todos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
