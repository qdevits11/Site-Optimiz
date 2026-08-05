"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const cards = [
  {
    title: "Relances clients",
    result: "Plusieurs heures → 5 min",
    text: "Détection, envoi et suivi automatiques des impayés.",
  },
  {
    title: "Pointages RH",
    result: "0 copier-coller",
    text: "Données consolidées chaque jour, sans intervention.",
  },
  {
    title: "Calculs de masse",
    result: "2 semaines → ½ journée",
    text: "1 874 notifications de loyers générées automatiquement.",
  },
  {
    title: "Feuilles de temps",
    result: "Zéro papier",
    text: "Saisie terrain sur tablette, suivi en temps réel.",
  },
  {
    title: "Demandes de prix",
    result: "Pipeline clair",
    text: "Configurateur + CRM : moins de mails, plus de deals suivis.",
  },
  {
    title: "Connexion d’outils",
    result: "Un seul flux",
    text: "Excel, ERP, mails et CRM reliés sans double saisie.",
  },
];

export function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="solutions" className="section-block">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading">
          <p className="eyebrow font-mono">Ce qu’on change</p>
          <h2 className="font-display">Des résultats lisibles en une ligne</h2>
          <p className="section-lead">
            Avant / après. Pas de slides techniques — uniquement ce que votre équipe gagne.
          </p>
        </div>
        <div className="solutions-grid" data-reveal data-reveal-type="stagger">
          {cards.map((card) => (
            <article key={card.title} className="solution-card" data-reveal-child data-cursor="card">
              <p className="solution-result font-mono text-accent">{card.result}</p>
              <h3 className="font-display">{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
        <div className="section-actions inline-actions" data-reveal data-reveal-type="fade">
          <Link href="/cas-concrets" className="btn-ghost section-cta">
            Lire les cas concrets
          </Link>
          <Link href="/#methode" className="text-link">
            Comment on travaille →
          </Link>
        </div>
      </div>
    </section>
  );
}
