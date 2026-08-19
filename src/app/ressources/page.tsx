import type { Metadata } from "next";
import Link from "next/link";
import { LeadQualifier } from "@/components/LeadQualifier";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/lib/articles";
import { buildArticleListJsonLd, buildBreadcrumbJsonLd, pageMetadata, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/ressources")!;

export const metadata: Metadata = pageMetadata(page);

export default function RessourcesPage() {
  return (
    <>
      <JsonLd data={buildArticleListJsonLd(articles)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Ressources", path: "/ressources" }])}
      />
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Ressources" }]}
        eyebrow="Ressources"
        title={
          <>
            Comprendre, prioriser, lancer <span className="text-accent">sans partir d’un outil</span>
          </>
        }
        subtitle="Guides pratiques, sans jargon, pour les PME en Wallonie et à Bruxelles qui veulent simplifier leurs processus et récupérer du temps."
      />

      <section className="page-section">
        <div className="container-site">
          <div className="article-grid">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/ressources/${article.slug}`}
                className="page-card article-card"
              >
                <p className="article-card-meta">{article.readingMinutes} min de lecture</p>
                <h3 className="font-display">{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="text-link">Lire l’article →</span>
              </Link>
            ))}
          </div>
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
