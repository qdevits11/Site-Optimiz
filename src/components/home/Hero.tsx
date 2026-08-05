"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
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
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !titleRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(titleRef.current!, {
        type: "words",
        wordsClass: "hero-word",
      });

      gsap.set(split.words, { y: 40, opacity: 0 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 12 });
      gsap.set(ctaRef.current?.querySelectorAll(".btn-reveal") ?? [], {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      });

      const tl = gsap.timeline({ delay: 0.25 });

      tl.to(split.words, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.05,
        ease: "power3.out",
      });

      const accentWords = titleRef.current!.querySelectorAll(".accent-word");
      accentWords.forEach((word) => {
        const original = word.textContent || "";
        tl.to(
          word,
          {
            duration: 0.35,
            scrambleText: {
              text: original,
              chars: "upperCase",
              revealDelay: 0.08,
            },
          },
          "-=0.35",
        );
      });

      tl.to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2",
      );

      tl.to(
        ctaRef.current?.querySelectorAll(".btn-reveal") ?? [],
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.inOut",
        },
        "-=0.2",
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
      <div className="hero-inner container-site">
        <p className="hero-eyebrow font-mono">Automatisation pour PME · Wallonie</p>
        <h1 ref={titleRef} className="hero-title font-display">
          Moins de tâches manuelles.{" "}
          <span className="accent-word text-accent">Plus de temps utile.</span>
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Optmiz repère ce qui vous ralentit, puis le transforme en process simples, fiables et
          mesurables — sans jargon, sans surprise.
        </p>
        <div ref={ctaRef} className="hero-cta">
          <Link href="/#contact" className="btn-reveal btn-primary-glow">
            Réserver mon diagnostic gratuit
          </Link>
          <Link href="/#preuves" className="btn-reveal btn-ghost">
            Voir les résultats clients
          </Link>
        </div>
        <ul className="hero-trust" aria-label="Garanties">
          {trustChips.map((chip) => (
            <li key={chip} className="font-mono">
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
