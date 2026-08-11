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
              Obtenez votre <span className="text-accent">devis gratuit</span>
            </h2>
            <p className="section-lead">
              Quelques questions pour cadrer votre besoin. Sans engagement. Réponse sous 24h.
            </p>
          </div>
          <div className="inline-actions" style={{ alignSelf: "center" }}>
            <Link href="/#devis" className="btn-primary-glow btn-cta section-cta">
              Commencer mon devis
            </Link>
            <Link href="/contact" className="btn-ghost section-cta">
              Contact simple
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
