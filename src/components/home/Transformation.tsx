"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

export function Transformation() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block transform-section" id="transformation">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading">
          <p className="eyebrow font-mono">La bascule</p>
          <h2 className="font-display">Avant / Après Optmiz</h2>
          <p className="section-lead">Les deux réalités, côte à côte. Choisissez celle que vous voulez vivre.</p>
        </div>

        <div className="transform-compare" data-reveal data-reveal-type="stagger">
          <article className="transform-card transform-before" data-reveal-child>
            <p className="transform-label font-mono">Avant</p>
            <h3 className="font-display transform-title">
              Chaos manuel.
              <br />
              Équipes saturées.
              <br />
              Temps perdu.
            </h3>
            <ul className="transform-list">
              <li>Copier-coller entre Excel, mails et ERP</li>
              <li>Relances oubliées, erreurs répétées</li>
              <li>Personnes clés qui tiennent tout à bout de bras</li>
            </ul>
          </article>

          <div className="transform-divider" aria-hidden>
            <span className="font-mono">→</span>
          </div>

          <article className="transform-card transform-after" data-reveal-child>
            <p className="transform-label font-mono text-accent">Après Optmiz</p>
            <h3 className="font-display transform-title">
              Flux fluides.
              <br />
              Gains mesurables.
              <br />
              Équipes libérées.
            </h3>
            <div className="transform-chips">
              <span className="transform-chip">−70% tâches répétitives</span>
              <span className="transform-chip">Prix fixe</span>
              <span className="transform-chip">Adoption réelle</span>
              <span className="transform-chip">ROI rapide</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
