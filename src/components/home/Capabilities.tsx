"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(track.scrollWidth - window.innerWidth + 80, 800);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const mid = window.innerWidth / 2;
            track.querySelectorAll<HTMLElement>(".cap-card-wow").forEach((card) => {
              const rect = card.getBoundingClientRect();
              const center = rect.left + rect.width / 2;
              const delta = (center - mid) / mid;
              const glow = 1 - Math.min(Math.abs(delta), 1);
              gsap.set(card, {
                rotateY: gsap.utils.clamp(-8, 8, delta * 8),
                scale: 0.94 + glow * 0.06,
                boxShadow: `0 0 ${36 * glow}px rgba(46,230,188,${0.28 * glow})`,
              });
            });
          },
        },
      });
    }, sectionRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="solutions" className="capabilities-wow">
      <div className="container-site capabilities-heading">
        <p className="eyebrow font-mono">Ce qu’on change</p>
        <h2 className="font-display">Faites glisser. Lisez le gain.</h2>
        <p className="section-lead">Chaque carte = un résultat concret. Pas de jargon.</p>
      </div>
      <div className="capabilities-viewport">
        <div ref={trackRef} className="capabilities-track">
          {cards.map((card) => (
            <article key={card.title} className="solution-card cap-card-wow" data-cursor="card">
              <p className="solution-result font-mono text-accent">{card.result}</p>
              <h3 className="font-display">{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
          <article className="solution-card cap-card-wow cap-card-cta" data-cursor="card">
            <p className="solution-result font-mono text-accent">Et vous ?</p>
            <h3 className="font-display">Quel frein on enlève en premier ?</h3>
            <p>30 minutes pour le savoir. Gratuit.</p>
            <Link href="/#contact" className="btn-primary-glow section-cta" style={{ marginTop: "1rem" }}>
              Diagnostic gratuit
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
