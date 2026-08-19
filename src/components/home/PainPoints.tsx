"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { PRIMARY_CTA } from "@/lib/cta";

const pains = [
  {
    title: "Tâches répétitives",
    note: "Temps perdu chaque semaine",
    text: "Encoder, copier-coller, vérifier, relancer… encore et encore.",
  },
  {
    title: "Outils qui ne se parlent pas",
    note: "Doubles encodages",
    text: "Excel, mails, papier, ERP et SaaS créent des doubles encodages.",
  },
  {
    title: "Dépendance aux personnes clés",
    note: "Processus fragiles",
    text: "Certaines procédures reposent sur une seule personne.",
  },
  {
    title: "Croissance = plus de complexité",
    note: "Plafond invisible",
    text: "Plus d’activité crée plus d’administratif et de dépendances.",
  },
  {
    title: "Erreurs et doublons",
    note: "Risque opérationnel",
    text: "Les ressaisies manuelles multiplient les fautes, les oublis et les corrections.",
  },
  {
    title: "Manque de visibilité",
    note: "Décisions freinées",
    text: "Difficile de savoir où ça coince, donc impossible d’agir vite.",
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
            <p className="eyebrow eyebrow-alert font-mono">Vous vous reconnaissez ?</p>
            <h2 className="font-display">Ce n’est pas un manque d’outils.</h2>
            <p className="section-lead">
              Ce sont des frictions qui coûtent du temps, de l’énergie, et du chiffre d’affaires.
            </p>
          </div>
          <p className="section-aside section-aside-alert">
            Si 2 points ci-dessous vous parlent, la prochaine étape est une visite diagnostic de
            30 minutes, gratuite.
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
          <Link href={PRIMARY_CTA.href} className="btn-primary-glow section-cta">
            {PRIMARY_CTA.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
