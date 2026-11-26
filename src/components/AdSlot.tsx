"use client";

import { useEffect, useRef } from "react";

export type AdPosition = "header" | "in-article" | "sidebar";

interface AdSlotProps {
  position: AdPosition;
  slotId?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

const POSITION_CONFIG: Record<
  AdPosition,
  {
    minHeightClass: string;
    containerClass: string;
    format: string;
    envSlot?: string;
  }
> = {
  header: {
    minHeightClass: "min-h-[90px]",
    containerClass: "w-full max-w-[728px] mx-auto my-4",
    format: "horizontal",
    envSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER,
  },
  "in-article": {
    minHeightClass: "min-h-[250px]",
    containerClass: "w-full my-8",
    format: "fluid",
    envSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE,
  },
  sidebar: {
    minHeightClass: "min-h-[600px]",
    containerClass: "w-full",
    format: "vertical",
    envSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  },
};

export function AdSlot({ position, slotId, className = "" }: AdSlotProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || "";
  const config = POSITION_CONFIG[position];
  const resolvedSlot = (slotId || config.envSlot || "").trim();
  const isActive = Boolean(adClient && resolvedSlot);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!isActive || pushedRef.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // Silencia erros de bloqueadores de anúncio ou script ainda carregando
    }
  }, [isActive]);

  // Regra crítica AdSense: sem código ativo, não renderizar caixas cinzas vazias
  if (!isActive) {
    return (
      <div
        className="hidden h-0 w-0 overflow-hidden"
        aria-hidden="true"
        data-ad-position={position}
        data-ad-status="collapsed"
      />
    );
  }

  return (
    <aside
      aria-label="Espaço publicitário"
      data-ad-position={position}
      data-ad-status="active"
      className={`${config.containerClass} ${config.minHeightClass} flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gray-400">
        Publicidade
      </span>
      <ins
        className="adsbygoogle block w-full"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={resolvedSlot}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
