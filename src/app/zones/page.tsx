import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { cities } from "@/lib/cities";
import { buildBreadcrumbJsonLd, pageMetadata, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/zones")!;

export const metadata: Metadata = pageMetadata(page);

export default function ZonesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Zones d’intervention", path: "/zones" },
        ])}
      />

      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Zones" }]}
        eyebrow="Wallonie & Bruxelles"
        title={
          <>
            Optmiz près de <span className="text-accent">chez vous</span>
          </>
        }
        subtitle="Basés à Soignies, nous nous déplaçons chez les PME wallonnes pour un premier diagnostic gratuit — sur votre lieu de travail."
        ctaHref="/#devis"
        ctaLabel="Réserver une visite"
        note="Soignies · Hainaut · Brabant wallon · Namur · Bruxelles"
      />

      <section className="page-section">
        <div className="container-site">
          <p className="page-kicker font-mono">Villes & communes</p>
          <h2 className="page-title">Choisissez votre ville</h2>
          <p className="page-lead" style={{ maxWidth: 680, marginBottom: "1.5rem" }}>
            Chaque page détaille comment Optmiz intervient localement : automatisation,
            digitalisation, site utile et systèmes de gestion — avec un rendez-vous possible sur
            place.
          </p>
          <div className="zones-grid">
            {cities.map((city) => (
              <Link key={city.slug} href={`/zones/${city.slug}`} className="zones-card">
                <p className="page-kicker font-mono" style={{ marginBottom: "0.35rem" }}>
                  {city.province} · {city.postalCode}
                </p>
                <h3 className="font-display" style={{ margin: 0, fontSize: "1.25rem" }}>
                  {city.name}
                </h3>
                <p style={{ margin: "0.55rem 0 0", color: "var(--muted)", fontSize: "0.92rem" }}>
                  Automatisation & digitalisation PME · {city.populationLabel} habitants
                </p>
                <span className="text-link" style={{ display: "inline-block", marginTop: "0.85rem" }}>
                  Voir la page {city.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site" style={{ maxWidth: 720 }}>
          <p className="page-kicker font-mono">Déplacement</p>
          <h2 className="page-title">On vient chez vous</h2>
          <p className="page-lead">
            Le premier rendez-vous se fait de préférence sur votre lieu de travail : c’est là que
            se voient les process réels. Réservez un créneau en 2 étapes sur l’accueil
            (coordonnées + horaire libre).
          </p>
          <div style={{ marginTop: "1.25rem" }}>
            <Link href="/#devis" className="btn-primary-glow section-cta" style={{ display: "inline-flex" }}>
              Réserver un créneau
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
