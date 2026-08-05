import Link from "next/link";

type PageHeroProps = {
  title: React.ReactNode;
  subtitle: string;
  note?: string;
  eyebrow?: string;
};

export function PageHero({
  title,
  subtitle,
  note = "Sans engagement · Réponse sous 24h",
  eyebrow,
}: PageHeroProps) {
  return (
    <section className="page-shell">
      <div className="container-site" style={{ maxWidth: 760 }}>
        {eyebrow ? <p className="page-kicker font-mono">{eyebrow}</p> : null}
        <h1 className="font-display">{title}</h1>
        <p className="section-lead">{subtitle}</p>
        <div style={{ marginTop: "1.35rem" }}>
          <Link
            href="/#contact"
            className="btn-primary-glow section-cta"
            style={{ display: "inline-flex" }}
          >
            Réserver mon diagnostic gratuit
          </Link>
          <p className="hero-note font-mono">{note}</p>
        </div>
      </div>
    </section>
  );
}
