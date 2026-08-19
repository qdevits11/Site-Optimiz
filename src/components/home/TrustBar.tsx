"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { PROOF_DISCLAIMER } from "@/lib/cta";

const proofs = [
  {
    value: "5 min",
    label: "Relances clients : plusieurs heures → 5 min",
  },
  {
    value: "1 874",
    label: "Notifications : 2 semaines → ½ journée",
  },
  {
    value: "Temps réel",
    label: "Feuilles de temps : papier → suivi immédiat",
  },
  {
    value: "0",
    label: "Pointages RH : 0 tâche manuelle",
  },
];

export function TrustBar() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block section-tight-block trust-bar" id="confiance">
      <div className="container-site">
        <div className="trust-bar-heading" data-reveal data-reveal-type="fade">
          <p className="eyebrow font-mono">Preuves</p>
          <h2 className="font-display">Des résultats observés, pas des moyennes inventées</h2>
        </div>
        <div className="proof-grid proof-grid-compact" data-reveal data-reveal-type="stagger">
          {proofs.map((item) => (
            <div key={item.label} className="proof-item" data-reveal-child>
              <div className="proof-value font-display">
                <span>{item.value}</span>
              </div>
              <p className="proof-label">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="proof-disclaimer">{PROOF_DISCLAIMER}</p>
      </div>
    </section>
  );
}
