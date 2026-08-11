import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

type PageHeroProps = {
  title: React.ReactNode;
  subtitle: string;
  note?: string;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function PageHero({
  title,
  subtitle,
  note = "Sans engagement · Réponse sous 24h",
  eyebrow,
  breadcrumbs,
  ctaHref = "/#devis",
  ctaLabel = "Réserver une visite",
}: PageHeroProps) {
  return (
    <section className="page-shell">
      <div className="container-site" style={{ maxWidth: 760 }}>
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
        {eyebrow ? <p className="page-kicker font-mono">{eyebrow}</p> : null}
        <h1 className="font-display">{title}</h1>
        <p className="section-lead">{subtitle}</p>
        <div style={{ marginTop: "1.35rem" }}>
          <Link
            href={ctaHref}
            className="btn-primary-glow section-cta"
            style={{ display: "inline-flex" }}
          >
            {ctaLabel}
          </Link>
          <p className="hero-note font-mono">{note}</p>
        </div>
      </div>
    </section>
  );
}
