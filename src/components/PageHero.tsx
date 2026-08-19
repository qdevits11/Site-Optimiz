import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";

type PageHeroProps = {
  title: React.ReactNode;
  subtitle: string;
  note?: string;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  showSecondary?: boolean;
};

export function PageHero({
  title,
  subtitle,
  note = "Première visite gratuite · Sans engagement",
  eyebrow,
  breadcrumbs,
  ctaHref = PRIMARY_CTA.href,
  ctaLabel = PRIMARY_CTA.label,
  secondaryHref = SECONDARY_CTA.href,
  secondaryLabel = SECONDARY_CTA.label,
  showSecondary = false,
}: PageHeroProps) {
  return (
    <section className="page-shell">
      <div className="container-site" style={{ maxWidth: 760 }}>
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
        {eyebrow ? <p className="page-kicker font-mono">{eyebrow}</p> : null}
        <h1 className="font-display">{title}</h1>
        <p className="section-lead">{subtitle}</p>
        <div className="page-hero-actions">
          <Link href={ctaHref} className="btn-primary-glow section-cta">
            {ctaLabel}
          </Link>
          {showSecondary ? (
            <Link href={secondaryHref} className="btn-ghost section-cta">
              {secondaryLabel}
            </Link>
          ) : null}
          <p className="hero-note font-mono">{note}</p>
        </div>
      </div>
    </section>
  );
}
