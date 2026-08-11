"use client";

import Link from "next/link";

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
              Réservez un créneau pour une première visite gratuite sur votre lieu de travail — en
              2 étapes, sans engagement.
            </p>
          </div>
          <div className="inline-actions" style={{ alignSelf: "center" }}>
            <Link href="/#devis" className="btn-primary-glow btn-cta section-cta">
              Réserver une visite
            </Link>
            <Link href="/#devis" className="btn-ghost section-cta">
              Voir les créneaux
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
