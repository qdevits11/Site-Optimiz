import type { Metadata } from "next";
import Link from "next/link";
import { LeadQualifier } from "@/components/LeadQualifier";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { buildBreadcrumbJsonLd, pageMetadata, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/services")!;

export const metadata: Metadata = pageMetadata(page);

const offerings = [
  {
    title: "Automatisation de processus",
    text: "Relances, calculs, notifications, pointages : ce qui se répète est automatisé pour vos équipes.",
    href: "/cas-concrets",
    linkLabel: "Voir les cas concrets →",
  },
  {
    title: "Création de site internet",
    text: "Un site utile à votre activité : configurateur, structuration commerciale ou vitrine claire, connecté à vos autres outils.",
    href: "/services/creation-site-web",
    linkLabel: "En savoir plus →",
  },
  {
    title: "Systèmes de gestion (ERP/CRM)",
    text: "Données, factures et suivi client structurés avec l'outil qui convient : Odoo si ça a du sens, sur mesure sinon.",
    href: "/services/systemes-de-gestion",
    linkLabel: "En savoir plus →",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Services", path: "/services" }])} />
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title={
          <>
            Trois façons de simplifier <span className="text-accent">votre organisation</span>
          </>
        }
        subtitle="Automatisation, site internet, système de gestion : toujours choisis selon votre réalité, jamais par défaut."
      />

      <section className="page-section">
        <div className="container-site">
          <div className="page-grid-3">
            {offerings.map((offer) => (
              <article key={offer.title} className="page-card">
                <h3 className="font-display" style={{ margin: 0, fontSize: "1.1rem" }}>
                  {offer.title}
                </h3>
                <p style={{ margin: "0.65rem 0 0", color: "var(--muted)", fontSize: "0.95rem" }}>
                  {offer.text}
                </p>
                <Link href={offer.href} className="text-link" style={{ display: "inline-block", marginTop: "0.85rem" }}>
                  {offer.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <p className="page-kicker font-mono">Un seul process, trois types de livrables</p>
          <h2 className="page-title">Diagnostic → audit → prix fixe, à chaque fois</h2>
          <p className="page-lead">
            Que le résultat soit un workflow automatisé, un site internet ou un système de gestion,
            la méthode ne change pas : on observe votre réalité, on cadre un devis fixe sur base
            d’un audit terrain, puis on livre. Aucun outil n’est choisi avant d’avoir compris le
            besoin.
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
