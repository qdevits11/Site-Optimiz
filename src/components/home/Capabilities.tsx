"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

const cards = [
  { title: "Automatisation des relances", text: "De plusieurs heures à 5 minutes, sans oubli." },
  { title: "Centralisation RH", text: "Pointages consolidés, zéro copier-coller." },
  { title: "Calculs de masse", text: "1 874 notifications : 2 semaines → ½ journée." },
  { title: "Feuilles de temps digitales", text: "Zéro papier, suivi terrain en temps réel." },
  { title: "Demandes de prix CRM", text: "Configurateur multi-pays, pipeline clair." },
  { title: "Connexion d’outils", text: "Excel, ERP, mails : un flux unique." },
  { title: "Pilotage structuré", text: "Indicateurs utiles, décisions plus rapides." },
  { title: "Audit terrain", text: "On observe le réel, pas les procédures." },
  { title: "Amélioration continue", text: "Le système évolue avec votre croissance." },
];

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = Math.max(track.scrollWidth - window.innerWidth + 80, 2000);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const cardsEls = track.querySelectorAll<HTMLElement>(".cap-card");
            const mid = window.innerWidth / 2;
            cardsEls.forEach((card) => {
              const rect = card.getBoundingClientRect();
              const center = rect.left + rect.width / 2;
              const delta = (center - mid) / mid;
              const rotateY = gsap.utils.clamp(-5, 5, delta * 5);
              const glow = 1 - Math.min(Math.abs(delta), 1);
              gsap.set(card, {
                rotateY,
                boxShadow: `0 0 ${24 * glow}px rgba(0,212,168,${0.35 * glow})`,
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
    <section ref={sectionRef} id="solutions" className="capabilities-section">
      <div className="container-site capabilities-heading">
        <p className="eyebrow font-mono">Solutions</p>
        <h2 className="font-display">Ce que l’on transforme concrètement</h2>
      </div>
      <div className="capabilities-viewport">
        <div ref={trackRef} className="capabilities-track">
          {cards.map((card) => (
            <article key={card.title} className="cap-card" data-cursor="card">
              <h3 className="font-display">{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
