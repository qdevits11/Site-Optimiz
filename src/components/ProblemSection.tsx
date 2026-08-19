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
        <p className="page-kicker page-kicker-alert font-mono">Points bloquants</p>
        <h2 className="page-title">{title}</h2>
        <p className="page-lead">{intro}</p>
        <ul className="problem-list">
          {points.map((point, index) => (
            <li key={point} className="problem-item-alert">
              <span className="pain-badge font-mono">
                Bloquant {String(index + 1).padStart(2, "0")}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="page-lead problem-closing-alert">{closing}</p>
        {showCta ? (
          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/#devis" className="btn-primary-glow section-cta" style={{ display: "inline-flex" }}>
              Réserver une visite diagnostic gratuite
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
