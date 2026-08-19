import type { Metadata } from "next";
import Link from "next/link";
import { LeadQualifier } from "@/components/LeadQualifier";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { solutionOfferings } from "@/lib/content";
import { buildBreadcrumbJsonLd, pageMetadata, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/services")!;

export const metadata: Metadata = pageMetadata(page);

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Solutions", path: "/services" },
        ])}
      />
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Solutions" }]}
        eyebrow="Solutions"
        title={
          <>
            Le bon outil dépend du <span className="text-accent">problème</span>
          </>
        }
        subtitle="Nous ne partons pas d’un outil. Nous partons de votre façon de travailler. Voici les moyens que nous pouvons mettre en œuvre, uniquement s’ils simplifient réellement votre fonctionnement."
        showSecondary
      />

      <section className="page-section">
        <div className="container-site">
          <p className="page-kicker font-mono">Les solutions que nous pouvons mettre en œuvre</p>
          <h2 className="page-title">Un moyen, choisi après le diagnostic. Pas trois métiers.</h2>
          <p className="page-lead" style={{ maxWidth: 720, marginBottom: "1.25rem" }}>
            Optmiz n’est pas une agence web, un intégrateur ERP ou un vendeur d’automatisation.
            Ce sont des réponses possibles, une fois le processus compris et simplifié.
          </p>
          <div className="page-grid-3">
            {solutionOfferings.map((offer) => (
              <article key={offer.title} className="page-card">
                <h3 className="font-display" style={{ margin: 0, fontSize: "1.1rem" }}>
                  {offer.title}
                </h3>
                <p style={{ margin: "0.65rem 0 0", color: "var(--muted)", fontSize: "0.95rem" }}>
                  {offer.text}
                </p>
                <Link
                  href={offer.href}
                  className="text-link"
                  style={{ display: "inline-block", marginTop: "0.85rem" }}
                >
                  {offer.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <p className="page-kicker font-mono">Toujours le même parcours</p>
          <h2 className="page-title">Visite diagnostic → analyse terrain → mise en œuvre</h2>
          <p className="page-lead">
            Aucun outil n’est choisi avant d’avoir compris le besoin. La visite diagnostic est
            gratuite. L’analyse terrain est payante. Le devis fixe arrive avant la mise en œuvre,
            pas avant.
          </p>
          <p className="page-lead" style={{ marginTop: "0.85rem" }}>
            <Link href="/notre-methodologie" className="text-link">
              Voir la méthode en détail →
            </Link>{" "}
            ·{" "}
            <Link href="/tarifs" className="text-link">
              Comprendre le prix fixe →
            </Link>
          </p>
        </div>
      </section>

      <section className="section-block cta-section">
        <div className="container-site">
          <LeadQualifier />
        </div>
      </section>
    </>
  );
}
