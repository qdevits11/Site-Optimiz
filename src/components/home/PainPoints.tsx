"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const pains = [
  {
    title: "Tâches répétitives",
    text: "Relances, encodages, exports… qui mangent des heures chaque semaine.",
  },
  {
    title: "Erreurs & doublons",
    text: "Copier-coller entre outils : fautes, oublis, corrections interminables.",
  },
  {
    title: "Outils isolés",
    text: "Excel, mails, ERP, CRM… rien ne se parle, tout repose sur quelqu’un.",
  },
  {
    title: "Process fragiles",
    text: "Si une personne part, l’organisation ralentit ou s’arrête.",
  },
  {
    title: "Manque de visibilité",
    text: "Difficile de savoir où ça coince — donc de décider vite.",
  },
  {
    title: "Croissance freinée",
    text: "Plus d’activité = plus de chaos manuel, pas plus de capacité.",
  },
];

export function PainPoints() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="problemes">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading section-heading-row">
          <div>
            <p className="eyebrow font-mono">Le vrai frein</p>
            <h2 className="font-display">Ce n’est pas un manque d’outils.</h2>
            <p className="section-lead">
              C’est l’accumulation de petits frictions qui ralentissent toute l’équipe.
            </p>
          </div>
          <p className="section-aside">
            Si 2 points ci-dessous vous parlent, un diagnostic Optmiz vaut 30 minutes.
          </p>
        </div>
        <div className="pain-grid" data-reveal data-reveal-type="stagger">
          {pains.map((pain) => (
            <article key={pain.title} className="pain-card" data-reveal-child data-cursor="card">
              <span className="pain-dot" />
              <div>
                <h3 className="pain-title font-display">{pain.title}</h3>
                <p>{pain.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="section-actions inline-actions" data-reveal data-reveal-type="fade">
          <Link href="/#contact" className="btn-primary-glow section-cta">
            Je veux identifier mes freins
          </Link>
          <Link href="/#solutions" className="text-link">
            Voir ce qu’on automatise →
          </Link>
        </div>
      </div>
    </section>
  );
}
