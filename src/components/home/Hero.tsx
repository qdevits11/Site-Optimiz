"use client";

import dynamic from "next/dynamic";
import { LeadQualifier } from "@/components/LeadQualifier";

const HeroCanvas = dynamic(() => import("@/components/home/HeroCanvas"), {
  ssr: false,
});

export function Hero() {
  return (
    <section className="hero">
      <HeroCanvas />
      <div className="hero-veil" aria-hidden />
      <div className="hero-inner hero-with-qualifier">
        <div className="hero-copy">
          <p className="hero-eyebrow font-mono">Automatisation pour PME · Wallonie</p>
          <h1 className="hero-title font-display">
            Moins de tâches manuelles.{" "}
            <span className="accent-word text-accent">Plus de temps utile.</span>
          </h1>
          <p className="hero-subtitle">
            Optmiz repère ce qui vous ralentit, puis le transforme en process simples, fiables et
            mesurables, sans jargon, sans surprise.
          </p>
        </div>
        <div className="hero-form-stage">
          <LeadQualifier variant="hero" id="devis" />
        </div>
      </div>
    </section>
  );
}
