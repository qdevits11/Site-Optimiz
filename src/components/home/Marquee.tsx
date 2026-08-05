"use client";

const items = [
  "Relances · 5 min",
  "Pointages · 0 copier-coller",
  "1 874 notifications · ½ journée",
  "Feuilles de temps · zéro papier",
  "CRM · pipeline clair",
  "Outils connectés · un seul flux",
  "Prix fixe · zéro surprise",
  "Diagnostic · gratuit",
];

export function Marquee() {
  const loop = [...items, ...items];

  return (
    <section className="marquee-section" aria-label="Résultats Optmiz">
      <div className="marquee-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item font-display">
            {item}
            <span className="marquee-sep text-accent" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
