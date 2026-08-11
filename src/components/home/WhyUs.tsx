"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const reasons = [
  {
    title: "Prix fixe",
    text: "Vous validez un périmètre et un montant. Pas de dérive en fin de projet.",
  },
  {
    title: "Terrain d’abord",
    text: "On part de votre quotidien réel, pas d’une stack “idéale” sur papier.",
  },
  {
    title: "Simplicité pour vos équipes",
    text: "Un système utile est un système utilisé. On vise l’adoption, pas la complexité.",
  },
  {
    title: "Proximité Wallonie",
    text: "Échange rapide, compréhension du contexte PME belge, suivi humain.",
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
            Vous voulez gagner du temps sans acheter un usine à gaz, et sans vous engager à
            l’aveugle.
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
            <strong>Prochaine étape :</strong> un diagnostic gratuit. On vous dit clairement si on
            peut vous aider, et où est le ROI le plus rapide.
          </p>
          <Link href="/#devis" className="btn-primary-glow section-cta">
            Réserver mon créneau
          </Link>
        </div>
      </div>
    </section>
  );
}
