"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { LeadQualifier } from "@/components/LeadQualifier";
import { gsap, registerGsap, SplitText } from "@/lib/gsap";
import { whenIntroReady } from "@/lib/intro";

const HeroCanvas = dynamic(() => import("@/components/home/HeroCanvas"), {
  ssr: false,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section || !titleRef.current) return;

    if (prefersReduced) {
      section.classList.add("is-hero-ready");
      return;
    }

    const ctx = gsap.context(() => {
      const split = new SplitText(titleRef.current!, {
        type: "chars,words",
        charsClass: "hero-char",
        wordsClass: "hero-word",
      });

      gsap.set(split.chars, { yPercent: 110, opacity: 0, rotateX: 28 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 16, filter: "blur(8px)" });
      gsap.set(formRef.current, { opacity: 0, y: 24, scale: 0.985 });

      let tl: gsap.core.Timeline | null = null;

      const cancelWait = whenIntroReady(() => {
        section.classList.add("is-hero-ready");

        tl = gsap.timeline({ delay: 0.05 });

        tl.to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        })
          .to(
            split.chars,
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.016,
              ease: "power4.out",
            },
            "-=0.12",
          );

        const accent = titleRef.current!.querySelector(".accent-word");
        if (accent) {
          tl.to(
            accent,
            {
              duration: 0.45,
              scrambleText: {
                text: accent.textContent || "",
                chars: "upperCase",
                revealDelay: 0.04,
              },
            },
            "-=0.3",
          );
        }

        tl.to(
          subtitleRef.current,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
          "-=0.35",
        ).to(
          formRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" },
          "-=0.4",
        );
      });

      return () => {
        cancelWait();
        tl?.kill();
        split.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero">
      <HeroCanvas />
      <div className="hero-veil" aria-hidden />
      <div className="hero-inner hero-with-qualifier">
        <div className="hero-copy">
          <p ref={eyebrowRef} className="hero-eyebrow font-mono">
            Automatisation pour PME · Wallonie
          </p>
          <h1 ref={titleRef} className="hero-title font-display">
            Moins de tâches manuelles.{" "}
            <span className="accent-word text-accent">Plus de temps utile.</span>
          </h1>
          <p ref={subtitleRef} className="hero-subtitle">
            Optmiz repère ce qui vous ralentit, puis le transforme en process simples, fiables et
            mesurables, sans jargon, sans surprise.
          </p>
        </div>
        <div ref={formRef} className="hero-form-stage">
          <LeadQualifier variant="hero" id="devis" />
        </div>
      </div>
    </section>
  );
}
