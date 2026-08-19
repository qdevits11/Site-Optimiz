"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { commercialSteps } from "@/lib/content";

export function Method() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="methode">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading section-heading-row">
          <div>
            <p className="eyebrow font-mono">Parcours</p>
            <h2 className="font-display">Quatre étapes. Sans surprise.</h2>
            <p className="section-lead">
              Vous savez toujours où on en est, ce qui est gratuit, ce qui est payant, et ce que
              cela coûtera avant la mise en œuvre.
            </p>
          </div>
          <Link href="/notre-methodologie" className="text-link heading-link">
            Détail de la méthode →
          </Link>
        </div>
        <div className="method-timeline" data-reveal data-reveal-type="stagger">
          {commercialSteps.map((step) => (
            <article key={step.n} className="method-card" data-reveal-child>
              <span className="method-n font-mono text-accent">{step.n}</span>
              {"badge" in step && step.badge ? (
                <span className={`step-badge ${step.badgeClass}`}>{step.badge}</span>
              ) : null}
              <h3 className="font-display">{step.title}</h3>
              <p>{step.homeText}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
