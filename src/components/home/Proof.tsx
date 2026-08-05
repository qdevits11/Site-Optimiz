"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { caseStudies } from "@/lib/content";

export function Proof() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="preuves">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading section-heading-row">
          <div>
            <p className="eyebrow font-mono">Preuves</p>
            <h2 className="font-display">Ils l’ont fait. Voici le résultat.</h2>
            <p className="section-lead">
              Trois situations typiques de PME. Même logique : un process pénible → un système
              fluide.
            </p>
          </div>
          <Link href="/cas-concrets" className="text-link heading-link">
            Tous les cas →
          </Link>
        </div>
        <div className="proof-cases" data-reveal data-reveal-type="stagger">
          {caseStudies.slice(0, 3).map((item) => (
            <article key={item.id} className="proof-case" data-reveal-child data-cursor="card">
              <p className="font-mono proof-case-id">{item.id}</p>
              <h3 className="font-display">{item.title}</h3>
              <p className="proof-case-result text-accent">{item.result}</p>
              {item.tags?.length ? (
                <p className="proof-case-tags font-mono">{item.tags.join(" · ")}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
