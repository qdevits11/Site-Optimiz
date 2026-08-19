"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { caseStudies } from "@/lib/content";
import { PROOF_DISCLAIMER, SECONDARY_CTA } from "@/lib/cta";

export function Proof() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="preuves">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading section-heading-row">
          <div>
            <p className="eyebrow font-mono">Cas concrets</p>
            <h2 className="font-display">Ce que des missions réelles ont déjà changé</h2>
            <p className="section-lead">
              Un process pénible, une façon de travailler plus simple. Voici les résultats
              observés.
            </p>
          </div>
          <Link href={SECONDARY_CTA.href} className="text-link heading-link">
            {SECONDARY_CTA.label} →
          </Link>
        </div>
        <div className="proof-cases" data-reveal data-reveal-type="stagger">
          {caseStudies.map((item) => (
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
        <p className="proof-disclaimer">{PROOF_DISCLAIMER}</p>
      </div>
    </section>
  );
}
