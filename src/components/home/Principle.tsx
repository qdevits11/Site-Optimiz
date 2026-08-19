"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const flow = ["Observer", "Simplifier", "Connecter", "Automatiser"];

export function Principle() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block principle-section" id="principe">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading">
          <p className="eyebrow font-mono">Notre principe</p>
          <h2 className="font-display">Simplifier avant d’automatiser.</h2>
          <p className="section-lead">
            Une mauvaise procédure automatisée reste une mauvaise procédure. Nous commençons donc
            par comprendre et simplifier votre manière de travailler. Ensuite seulement, nous
            choisissons le bon outil.
          </p>
        </div>

        <ol className="principle-flow" data-reveal data-reveal-type="stagger">
          {flow.map((step, index) => (
            <li key={step} className="principle-flow-item" data-reveal-child>
              <span className="principle-flow-n font-mono text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="principle-flow-label font-display">{step}</span>
            </li>
          ))}
        </ol>

        <p className="principle-closing" data-reveal data-reveal-type="fade">
          Si vos outils actuels suffisent, nous les gardons. Si un outil existant répond au besoin,
          nous l’utilisons. Le sur-mesure vient seulement lorsqu’il apporte une vraie valeur.
        </p>
        <p className="principle-tagline font-display" data-reveal data-reveal-type="fade">
          Nous ne partons pas d’un outil. Nous partons de votre façon de travailler.
        </p>
      </div>
    </section>
  );
}
