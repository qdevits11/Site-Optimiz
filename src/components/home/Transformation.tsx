"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export function Transformation() {
  const sectionRef = useRef<HTMLElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      gsap.set(afterRef.current, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(beforeRef.current, { opacity: 1, filter: "none" });

      tl.to(progressRef.current, { scaleX: 1, ease: "none" }, 0)
        .to(
          beforeRef.current,
          {
            opacity: 0.15,
            filter: "blur(6px)",
            y: -40,
            ease: "none",
          },
          0,
        )
        .to(
          afterRef.current,
          {
            clipPath: "inset(0% 0 0 0)",
            ease: "none",
          },
          0.15,
        )
        .fromTo(
          afterRef.current?.querySelectorAll(".transform-chip") ?? [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: "none" },
          0.35,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="transform-section" id="transformation">
      <div className="transform-progress" ref={progressRef} aria-hidden />
      <div className="container-site transform-stage">
        <p className="eyebrow font-mono">La bascule</p>
        <div className="transform-stack">
          <div ref={beforeRef} className="transform-panel transform-before">
            <p className="transform-label font-mono">Avant</p>
            <h2 className="font-display transform-title">
              Chaos manuel.
              <br />
              Équipes saturées.
              <br />
              Temps perdu.
            </h2>
            <ul className="transform-list">
              <li>Copier-coller entre Excel, mails et ERP</li>
              <li>Relances oubliées, erreurs répétées</li>
              <li>Personnes clés qui tiennent tout à bout de bras</li>
            </ul>
          </div>
          <div ref={afterRef} className="transform-panel transform-after">
            <p className="transform-label font-mono text-accent">Après Optmiz</p>
            <h2 className="font-display transform-title">
              Flux fluides.
              <br />
              Gains mesurables.
              <br />
              Équipes libérées.
            </h2>
            <div className="transform-chips">
              <span className="transform-chip">−70% tâches répétitives</span>
              <span className="transform-chip">Prix fixe</span>
              <span className="transform-chip">Adoption réelle</span>
              <span className="transform-chip">ROI rapide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
