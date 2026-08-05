"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    n: "01",
    title: "Diagnostic",
    text: "30 min pour comprendre où vous perdez du temps — gratuit, sans engagement.",
  },
  {
    n: "02",
    title: "Audit terrain",
    text: "On observe le réel (pas la théorie) et on priorise les gains les plus rentables.",
  },
  {
    n: "03",
    title: "Mise en œuvre",
    text: "Prix fixe, périmètre clair. On livre un système simple que vos équipes utilisent.",
  },
  {
    n: "04",
    title: "Suivi Zen",
    text: "On reste disponibles pour ajuster, maintenir et faire évoluer le système.",
  },
];

export function Method() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="methode">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading section-heading-row">
          <div>
            <p className="eyebrow font-mono">Méthode</p>
            <h2 className="font-display">Clair. Cadré. Sans surprise.</h2>
            <p className="section-lead">
              Quatre étapes. Vous savez toujours où on en est, ce que ça coûte, et ce que ça
              rapporte.
            </p>
          </div>
          <Link href="/notre-methodologie" className="text-link heading-link">
            Détail de la méthode →
          </Link>
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
