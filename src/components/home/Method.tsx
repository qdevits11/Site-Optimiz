"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  { n: "01", title: "Premier contact & diagnostic", text: "Un échange pour comprendre vos besoins et identifier les leviers d’optimisation." },
  { n: "02", title: "Audit personnalisé", text: "Analyse terrain de vos process pour des pistes concrètes et adaptées." },
  { n: "03", title: "Proposition & mise en œuvre", text: "Prix fixe, périmètre clair, digitalisation et automatisation sans surprise." },
  { n: "04", title: "Amélioration continue", text: "On reste à vos côtés pour ajuster le système à votre croissance." },
];

export function Method() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="methode">
      <div className="container-site">
        <div data-reveal data-reveal-type="slide" className="section-heading">
          <p className="eyebrow font-mono">Méthode</p>
          <h2 className="font-display">Un cycle en 4 étapes</h2>
        </div>
        <div className="method-timeline" data-reveal data-reveal-type="stagger">
          {steps.map((step) => (
            <article key={step.n} className="method-card" data-reveal-child>
              <span className="method-n font-mono text-accent">{step.n}</span>
              <h3 className="font-display">{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
