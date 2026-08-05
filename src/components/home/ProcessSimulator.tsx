"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

const tabs = {
  Facturation: [
    { step: "Collecte des prestations", saved: "2h/sem" },
    { step: "Contrôle & consolidation", saved: "3h/sem" },
    { step: "Génération automatique", saved: "4h/sem" },
    { step: "Envoi & suivi", saved: "1h/sem" },
  ],
  Relances: [
    { step: "Détection des retards", saved: "1h/sem" },
    { step: "Templates personnalisés", saved: "2h/sem" },
    { step: "Envoi automatisé", saved: "3h/sem" },
    { step: "Reporting live", saved: "1h/sem" },
  ],
  Onboarding: [
    { step: "Brief structuré", saved: "1j" },
    { step: "Cartographie process", saved: "2j" },
    { step: "Mise en place", saved: "1 sem" },
    { step: "Formation équipes", saved: "1j" },
  ],
  Reporting: [
    { step: "Sources connectées", saved: "2h" },
    { step: "Indicateurs utiles", saved: "3h" },
    { step: "Dashboard partagé", saved: "2h" },
    { step: "Revue mensuelle", saved: "1h" },
  ],
} as const;

type TabKey = keyof typeof tabs;

export function ProcessSimulator() {
  const [active, setActive] = useState<TabKey>("Facturation");
  const listRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = listRef.current?.querySelectorAll(".process-step");
    if (!items?.length) return;

    gsap.fromTo(
      items,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power2.out" },
    );

    gsap.fromTo(
      listRef.current?.querySelectorAll(".saved-chip") ?? [],
      { opacity: 0.2 },
      { opacity: 1, duration: 0.35, stagger: 0.07, yoyo: true, repeat: 1 },
    );

    gsap.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.out" });
  }, [active]);

  const switchTab = (key: TabKey) => {
    if (key === active) return;
    const items = listRef.current?.querySelectorAll(".process-step");
    if (!items?.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(key);
      return;
    }
    gsap.to(items, {
      x: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      onComplete: () => setActive(key),
    });
  };

  return (
    <section className="section-block" id="simulateur">
      <div className="container-site">
        <div className="section-heading">
          <p className="eyebrow font-mono">Simulateur</p>
          <h2 className="font-display">Visualisez le gain par process</h2>
        </div>
        <div className="sim-tabs">
          {(Object.keys(tabs) as TabKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className={active === key ? "is-active" : ""}
              onClick={() => switchTab(key)}
            >
              {key}
            </button>
          ))}
        </div>
        <div ref={listRef} className="sim-steps">
          {tabs[active].map((item, index) => (
            <article key={`${active}-${item.step}`} className="process-step">
              <span className="step-index font-mono">{String(index + 1).padStart(2, "0")}</span>
              <p>{item.step}</p>
              <span className="saved-chip font-mono">{item.saved}</span>
            </article>
          ))}
        </div>
        <div className="sim-gain">
          <div className="sim-gain-label font-mono">Gain cumulé estimé</div>
          <div className="sim-bar">
            <div ref={barRef} className="sim-bar-fill" />
          </div>
        </div>
      </div>
    </section>
  );
}
