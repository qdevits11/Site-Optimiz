"use client";

import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useReveal } from "@/hooks/useReveal";

export function TrustBar() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block section-tight-block trust-bar" id="confiance">
      <div className="container-site">
        <div className="trust-bar-heading" data-reveal data-reveal-type="fade">
          <p className="eyebrow font-mono">Preuves rapides</p>
          <h2 className="font-display">Des gains concrets, pas des promesses vagues</h2>
        </div>
        <div className="proof-grid proof-grid-compact" data-reveal data-reveal-type="stagger">
          <AnimatedCounter
            value={80}
            suffix="%"
            label="De temps récupéré sur les tâches automatisées"
          />
          <AnimatedCounter
            value={1874}
            label="Notifications : 2 semaines → ½ journée"
          />
          <AnimatedCounter value={24} suffix="h" label="Pour vous recontacter après demande" />
          <div className="proof-item" data-reveal-child>
            <div className="proof-value font-display">
              <span>0 €</span>
            </div>
            <p className="proof-label">Diagnostic — sans engagement</p>
          </div>
        </div>
      </div>
    </section>
  );
}
