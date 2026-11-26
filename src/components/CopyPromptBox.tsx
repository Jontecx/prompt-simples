"use client";

import { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

interface CopyPromptBoxProps {
  prompt: string;
  title?: string;
}

export function CopyPromptBox({
  prompt,
  title = "Prompt pronto para usar",
}: CopyPromptBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(prompt);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = prompt;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="my-7 overflow-hidden rounded-xl border border-blue-200 bg-slate-50/80 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-brand-blue">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-800">
            {title}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Prompt copiado" : "Copiar prompt com 1 clique"}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
            copied
              ? "bg-brand-emerald text-white shadow-sm"
              : "bg-brand-blue text-white hover:bg-brand-blueDark focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copiar com 1 Clique</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <pre className="whitespace-pre-wrap break-words font-sans text-[15px] leading-relaxed text-gray-900">
          {prompt}
        </pre>
      </div>
    </div>
  );
}
