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
        type: "chars,words",
        charsClass: "hero-char",
        wordsClass: "hero-word",
      });

      gsap.set(split.chars, { yPercent: 120, opacity: 0, rotateX: 40 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 18, filter: "blur(10px)" });
      gsap.set(ctaRef.current?.querySelectorAll(".btn-reveal") ?? [], {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
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
        ctaRef.current?.querySelectorAll(".btn-reveal") ?? [],
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.inOut",
        },
        "-=0.3",
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
          <Link href="/#contact" className="btn-reveal btn-primary-glow" data-cursor="cta">
            Réserver mon diagnostic gratuit
          </Link>
          <Link href="/#transformation" className="btn-reveal btn-ghost">
            Voir la transformation
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
