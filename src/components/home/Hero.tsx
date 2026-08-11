"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { LeadQualifier } from "@/components/LeadQualifier";
import { gsap, registerGsap, SplitText } from "@/lib/gsap";

const HeroCanvas = dynamic(() => import("@/components/home/HeroCanvas"), {
  ssr: false,
});

const trustChips = [
  "Diagnostic gratuit",
  "Réponse sous 24h",
  "Prix fixe",
  "PME wallonnes",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !titleRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(titleRef.current!, {
        type: "chars,words",
        charsClass: "hero-char",
        wordsClass: "hero-word",
      });

      gsap.set(split.chars, { yPercent: 120, opacity: 0, rotateX: 40 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 18, filter: "blur(10px)" });
      gsap.set(copyRef.current?.querySelectorAll(".hero-trust, .hero-secondary-cta") ?? [], {
        opacity: 0,
        y: 14,
      });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.85,
        stagger: 0.018,
        ease: "power4.out",
      });

      const accent = titleRef.current!.querySelector(".accent-word");
      if (accent) {
        tl.to(
          accent,
          {
            duration: 0.5,
            scrambleText: {
              text: accent.textContent || "",
              chars: "upperCase",
              revealDelay: 0.05,
            },
          },
          "-=0.35",
        );
      }

      tl.to(
        subtitleRef.current,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
        "-=0.35",
      ).to(
        copyRef.current?.querySelectorAll(".hero-trust, .hero-secondary-cta") ?? [],
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" },
        "-=0.35",
      );

      return () => {
        split.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero">
      <HeroCanvas />
      <div className="hero-veil" aria-hidden />
      <div className="hero-inner container-site hero-with-qualifier">
        <div ref={copyRef} className="hero-copy">
          <p className="hero-eyebrow font-mono">Automatisation pour PME · Wallonie</p>
          <h1 ref={titleRef} className="hero-title font-display">
            Moins de tâches manuelles.{" "}
            <span className="accent-word text-accent">Plus de temps utile.</span>
          </h1>
          <p ref={subtitleRef} className="hero-subtitle">
            Optmiz repère ce qui vous ralentit, puis le transforme en process simples, fiables et
            mesurables, sans jargon, sans surprise.
          </p>
          <ul className="hero-trust" aria-label="Garanties">
            {trustChips.map((chip) => (
              <li key={chip} className="font-mono">
                {chip}
              </li>
            ))}
          </ul>
          <div className="hero-secondary-cta">
            <Link href="/#transformation" className="btn-ghost">
              Voir la transformation
            </Link>
          </div>
        </div>
        <LeadQualifier variant="hero" id="devis" />
      </div>
    </section>
  );
}
