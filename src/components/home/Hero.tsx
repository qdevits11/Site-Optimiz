"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, registerGsap, SplitText } from "@/lib/gsap";

const HeroCanvas = dynamic(() => import("@/components/home/HeroCanvas"), {
  ssr: false,
});

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

      gsap.set(split.words, { y: 60, opacity: 0 });
      gsap.set(subtitleRef.current, { opacity: 0, filter: "blur(8px)" });
      gsap.set(ctaRef.current?.querySelectorAll(".btn-reveal") ?? [], {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(split.words, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Scramble accent words after reveal
      const accentWords = titleRef.current!.querySelectorAll(".accent-word");
      accentWords.forEach((word, index) => {
        const original = word.textContent || "";
        tl.to(
          word,
          {
            duration: 0.4,
            scrambleText: {
              text: original,
              chars: "upperCase",
              revealDelay: 0.1,
            },
            delay: 0.3 + index * 0.05,
          },
          "-=0.4",
        );
      });

      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.35",
      );

      tl.to(
        ctaRef.current?.querySelectorAll(".btn-reveal") ?? [],
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.inOut",
        },
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
      <div className="hero-inner container-site">
        <p className="hero-eyebrow font-mono">Automatisation & digitalisation · Wallonie</p>
        <h1 ref={titleRef} className="hero-title font-display">
          Trop de tâches manuelles et de{" "}
          <span className="accent-word text-accent">perte de temps</span> ?
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Nous identifions ce qui vous ralentit, et nous le transformons en systèmes simples,
          fluides et efficaces.
        </p>
        <div ref={ctaRef} className="hero-cta">
          <Link href="/#contact" className="btn-reveal btn-primary-glow">
            Réserver mon diagnostic gratuit
          </Link>
          <Link href="/cas-concrets" className="btn-reveal btn-ghost">
            Voir les cas concrets
          </Link>
        </div>
        <p className="hero-note font-mono">Sans engagement · Réponse sous 24h</p>
      </div>
    </section>
  );
}
