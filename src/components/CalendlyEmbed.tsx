"use client";

import { useEffect, useId, useRef } from "react";

type CalendlyEmbedProps = {
  url: string;
  title?: string;
  className?: string;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve) => {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Impossible de charger Calendly."));
    document.body.appendChild(script);
  });
}

export function CalendlyEmbed({
  url,
  title = "Choisir un créneau de visite",
  className = "",
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();

  useEffect(() => {
    const parent = containerRef.current;
    if (!parent || !url) return;

    let cancelled = false;
    parent.innerHTML = "";

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) return;
        window.Calendly.initInlineWidget({
          url,
          parentElement: containerRef.current,
          resize: true,
        });
      })
      .catch(() => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = `
          <p class="calendly-fallback">
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-link">
              Ouvrir Calendly pour choisir un créneau →
            </a>
          </p>
        `;
      });

    return () => {
      cancelled = true;
      if (parent) parent.innerHTML = "";
    };
  }, [url, reactId]);

  if (!url) return null;

  return (
    <div className={`calendly-embed ${className}`.trim()}>
      <div
        ref={containerRef}
        className="calendly-embed-frame"
        title={title}
        role="region"
        aria-label={title}
      />
    </div>
  );
}
