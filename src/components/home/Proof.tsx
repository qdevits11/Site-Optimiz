"use client";

import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useReveal } from "@/hooks/useReveal";
import { caseStudies } from "@/lib/content";

export function Proof() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="preuves">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading">
          <p className="eyebrow font-mono">Preuves</p>
          <h2 className="font-display">Des résultats mesurables</h2>
        </div>
        <div className="proof-grid" data-reveal data-reveal-type="stagger">
          <AnimatedCounter value={1874} label="Notifications de loyers automatisées" />
          <AnimatedCounter value={80} suffix="%" label="De temps gagné sur tâches répétitives" />
          <AnimatedCounter value={3} prefix="×" label="Plus de capacité sans recruter" />
          <AnimatedCounter value={15} suffix="+" label="Années d’expérience terrain" />
        </div>
        <div className="proof-cases" data-reveal data-reveal-type="stagger">
          {caseStudies.slice(0, 3).map((item) => (
            <article key={item.id} className="proof-case" data-reveal-child data-cursor="card">
              <p className="font-mono text-accent">{item.id}</p>
              <h3 className="font-display">{item.title}</h3>
              <p className="text-accent">{item.result}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
