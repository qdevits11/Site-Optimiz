"use client";

const items = [
  "Relances · 5 min",
  "1 874 notifications · ½ journée",
  "Feuilles de temps · temps réel",
  "Pointages RH · 0 tâche manuelle",
  "Demandes de prix · CRM connecté",
  "Visite diagnostic · gratuite",
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
