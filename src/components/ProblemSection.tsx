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
    <section className="page-section problem-panel">
      <div className="container-site">
        <p className="page-kicker font-mono">Situation fréquente</p>
        <h2 className="page-title">{title}</h2>
        <p className="page-lead">{intro}</p>
        <ul className="problem-list">
          {points.map((point) => (
            <li key={point}>
              <span className="pain-dot" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="page-lead" style={{ marginTop: "1rem", color: "var(--text)" }}>
          {closing}
        </p>
        {showCta ? (
          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/#contact" className="btn-ghost section-cta" style={{ display: "inline-flex" }}>
              Réserver mon diagnostic gratuit
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
