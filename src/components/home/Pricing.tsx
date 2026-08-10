"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const plans = [
  {
    name: "Zen Basique",
    quote: "Ça tourne. Vous êtes tranquille.",
    features: ["Maintenance", "Abonnements", "Correctifs"],
  },
  {
    name: "Zen Standard",
    quote: "Maintenance + accompagnement mensuel.",
    features: ["Tout Basique", "Évolutions", "Visio mensuelle"],
    featured: true,
  },
  {
    name: "Zen Premium",
    quote: "Présence terrain et amélioration continue.",
    features: ["Tout Standard", "1 jour / mois", "Suivi stratégique"],
  },
];

export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block section-tight-block" id="tarifs-home">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading section-heading-row">
          <div>
            <p className="eyebrow font-mono">Après le projet</p>
            <h2 className="font-display">Forfaits Zen (rester serein)</h2>
            <p className="section-lead">
              Optionnel. Pour maintenir et faire évoluer vos systèmes dans la durée.
            </p>
          </div>
          <Link href="/tarifs" className="text-link heading-link">
            Détail & prix →
          </Link>
        </div>
        <div className="pricing-grid" data-reveal data-reveal-type="stagger">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`pricing-card${plan.featured ? " is-featured" : ""}`}
              data-reveal-child
              data-cursor="card"
            >
              <h3 className="font-display">{plan.name}</h3>
              <p className="pricing-quote">{plan.quote}</p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
