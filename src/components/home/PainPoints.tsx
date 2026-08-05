"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const pains = [
  {
    title: "Tâches répétitives",
    note: "Temps perdu chaque semaine",
    text: "Relances, encodages, exports… qui mangent des heures sans créer de valeur.",
  },
  {
    title: "Erreurs & doublons",
    note: "Risque opérationnel",
    text: "Copier-coller entre outils : fautes, oublis, corrections interminables.",
  },
  {
    title: "Outils isolés",
    note: "Flux cassés",
    text: "Excel, mails, ERP, CRM… rien ne se parle, tout repose sur quelqu’un.",
  },
  {
    title: "Process fragiles",
    note: "Dépendance critique",
    text: "Si une personne part, l’organisation ralentit ou s’arrête.",
  },
  {
    title: "Manque de visibilité",
    note: "Décisions freinées",
    text: "Difficile de savoir où ça coince — donc impossible d’agir vite.",
  },
  {
    title: "Croissance freinée",
    note: "Plafond invisible",
    text: "Plus d’activité = plus de chaos manuel, pas plus de capacité.",
  },
];

export function PainPoints() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block pain-section" id="problemes">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading section-heading-row">
          <div>
            <p className="eyebrow eyebrow-alert font-mono">Points bloquants</p>
            <h2 className="font-display">Ce n’est pas un manque d’outils.</h2>
            <p className="section-lead">
              Ce sont des frictions qui coûtent du temps, de l’énergie — et du chiffre d’affaires.
            </p>
          </div>
          <p className="section-aside section-aside-alert">
            Si 2 points ci-dessous vous parlent, agissez : un diagnostic Optmiz dure 30 minutes.
          </p>
        </div>
        <div className="pain-grid" data-reveal data-reveal-type="stagger">
          {pains.map((pain, index) => (
            <article
              key={pain.title}
              className="pain-card pain-card-alert"
              data-reveal-child
              data-cursor="card"
            >
              <div className="pain-card-top">
                <span className="pain-badge font-mono">Bloquant {String(index + 1).padStart(2, "0")}</span>
                <span className="pain-note">{pain.note}</span>
              </div>
              <h3 className="pain-title font-display">{pain.title}</h3>
              <p>{pain.text}</p>
            </article>
          ))}
        </div>
        <div className="pain-urgency" data-reveal data-reveal-type="fade">
          <p>
            <strong>Ces points ne se résolvent pas tout seuls.</strong> Plus vous attendez, plus ils
            coûtent cher à votre équipe.
          </p>
          <Link href="/#contact" className="btn-primary-glow section-cta">
            Je veux lever ces freins
          </Link>
        </div>
      </div>
    </section>
  );
}
