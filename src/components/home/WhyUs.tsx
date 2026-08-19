"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { PRIMARY_CTA } from "@/lib/cta";

const reasons = [
  {
    title: "Prix fixe",
    text: "Vous validez un périmètre et un montant avant la mise en œuvre. Pas de dérive en fin de projet.",
  },
  {
    title: "Terrain d’abord",
    text: "On part de votre quotidien réel, pas d’un outil « idéal » sur papier.",
  },
  {
    title: "Simplicité pour vos équipes",
    text: "Un système utile est un système utilisé. On vise l’adoption, pas la complexité.",
  },
  {
    title: "Proximité Wallonie & Bruxelles",
    text: "Échange rapide, compréhension du contexte PME, suivi humain.",
  },
];

export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="pourquoi">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading">
          <p className="eyebrow font-mono">Pourquoi Optmiz</p>
          <h2 className="font-display">Travailler avec nous, c’est évident quand…</h2>
          <p className="section-lead">
            Vous voulez une façon de travailler plus simple, sans acheter un outil de plus, et
            sans vous engager à l’aveugle.
          </p>
        </div>
        <div className="why-grid" data-reveal data-reveal-type="stagger">
          {reasons.map((reason) => (
            <article key={reason.title} className="why-card" data-reveal-child>
              <h3 className="font-display">{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
        <div className="reassure-strip" data-reveal data-reveal-type="fade">
          <p>
            <strong>Prochaine étape :</strong> une visite diagnostic gratuite. On vous dit
            clairement si on peut vous aider, et par où commencer.
          </p>
          <Link href={PRIMARY_CTA.href} className="btn-primary-glow section-cta">
            {PRIMARY_CTA.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
