"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const plans = [
  { name: "Zen Basique", quote: "Vos systèmes tournent. Vous êtes tranquille.", features: ["Maintenance", "Abonnements", "Correctifs", "Maintien en service"] },
  { name: "Zen Standard", quote: "Maintenance + accompagnement mensuel.", features: ["Tout Basique", "Évolutions", "Visio mensuelle", "Priorisation"] },
  { name: "Zen Premium", quote: "Présence terrain et amélioration continue.", features: ["Tout Standard", "1 jour / mois", "Analyse terrain", "Suivi stratégique"] },
];

export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="tarifs-home">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading">
          <p className="eyebrow font-mono">Tarifs</p>
          <h2 className="font-display">Prix fixe. Zéro mauvaise surprise.</h2>
        </div>
        <div className="pricing-grid" data-reveal data-reveal-type="stagger">
          {plans.map((plan) => (
            <article key={plan.name} className="pricing-card" data-reveal-child data-cursor="card">
              <h3 className="font-display">{plan.name}</h3>
              <p className="pricing-quote">{plan.quote}</p>
              <ul>{plan.features.map((f) => <li key={f}>{f}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="section-actions">
          <Link href="/tarifs" className="btn-ghost">Voir le détail des tarifs</Link>
        </div>
      </div>
    </section>
  );
}
