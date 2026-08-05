import Link from "next/link";

type ProblemSectionProps = {
  title: string;
  intro: string;
  points: string[];
  closing: string;
  showCta?: boolean;
};

export function ProblemSection({
  title,
  intro,
  points,
  closing,
  showCta = true,
}: ProblemSectionProps) {
  return (
    <section className="section-block" style={{ background: "rgba(255,80,110,0.08)" }}>
      <div className="container-site" style={{ maxWidth: 760, textAlign: "center" }}>
        <h2 className="font-display" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>
          {title}
        </h2>
        <p className="section-lead" style={{ marginInline: "auto" }}>
          {intro}
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "1.5rem auto", maxWidth: 520, textAlign: "left" }}>
          {points.map((point) => (
            <li key={point} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.7rem", color: "var(--text)" }}>
              <span className="pain-dot" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="section-closing" style={{ marginInline: "auto" }}>
          {closing}
        </p>
        {showCta ? (
          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/#contact" className="btn-ghost" style={{ display: "inline-flex", padding: "0.85rem 1.2rem", borderRadius: 999 }}>
              Réserver mon diagnostic gratuit
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
