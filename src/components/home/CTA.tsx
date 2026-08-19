"use client";

import Link from "next/link";
import { PRIMARY_CTA } from "@/lib/cta";

export function CTA() {
  return (
    <section className="section-block cta-section" id="contact-wrap">
      <div className="container-site">
        <div className="contact-panel contact-panel-split">
          <div className="contact-heading">
            <p className="eyebrow font-mono">Étape suivante</p>
            <h2 className="font-display">
              On vient <span className="text-accent">chez vous</span>
            </h2>
            <p className="section-lead">
              Réservez une visite diagnostic gratuite sur votre lieu de travail. Sans engagement.
              Le devis n’arrive qu’après l’analyse nécessaire.
            </p>
          </div>
          <div className="inline-actions" style={{ alignSelf: "center" }}>
            <Link href={PRIMARY_CTA.href} className="btn-primary-glow btn-cta section-cta">
              {PRIMARY_CTA.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
