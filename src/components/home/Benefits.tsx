"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const benefits = [
  {
    title: "Moins de travail manuel",
    text: "Les tâches répétitives quittent le quotidien de vos équipes.",
  },
  {
    title: "Moins d’erreurs",
    text: "Moins de ressaisies, moins de doublons, moins de corrections.",
  },
  {
    title: "Des outils et données mieux connectés",
    text: "L’information circule, sans copier-coller d’un fichier à l’autre.",
  },
  {
    title: "Des processus plus simples",
    text: "On clarifie d’abord la façon de travailler, avant d’ajouter quoi que ce soit.",
  },
  {
    title: "Moins de dépendance aux personnes clés",
    text: "Le savoir-faire ne repose plus sur une seule tête.",
  },
  {
    title: "Une croissance plus fluide",
    text: "Plus d’activité n’entraîne plus automatiquement plus d’administratif.",
  },
];

export function Benefits() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="changements">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading">
          <p className="eyebrow font-mono">Ce qu’Optmiz change</p>
          <h2 className="font-display">Des bénéfices, pas une liste d’outils</h2>
          <p className="section-lead">
            Le client n’achète pas une automatisation, un site ou un CRM. Il achète une façon de
            travailler plus simple, plus fiable et moins chronophage.
          </p>
        </div>
        <div className="pain-grid" data-reveal data-reveal-type="stagger">
          {benefits.map((item) => (
            <article key={item.title} className="why-card" data-reveal-child data-cursor="card">
              <h3 className="font-display">{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
