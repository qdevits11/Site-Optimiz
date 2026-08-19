import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { cities, getCityBySlug, getNearbyCities } from "@/lib/cities";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  pageMetadata,
  siteConfig,
} from "@/lib/seo";

type CityPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  return pageMetadata({
    path: `/zones/${city.slug}`,
    title: `Simplification des processus PME à ${city.name}`,
    description: `Optmiz accompagne les PME à ${city.name} (${city.province}) : simplification des processus, connexion des outils, automatisation des tâches répétitives. Visite diagnostic gratuite sur place.`,
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const nearby = getNearbyCities(city);
  const path = `/zones/${city.slug}`;

  const faqs = [
    {
      q: `Vous déplacez-vous à ${city.name} ?`,
      a: `Oui. Optmiz est basé à Soignies et se déplace à ${city.name} et dans la région pour une visite diagnostic gratuite sur votre lieu de travail. Réservez sur la page d’accueil : coordonnées + créneau synchronisé.`,
    },
    {
      q: `Que peut-on simplifier dans une PME à ${city.name} ?`,
      a: "Relances clients, pointages RH, calculs récurrents, doubles encodages entre Excel et d’autres outils, notifications, demandes de prix. On observe d’abord le fonctionnement réel, on simplifie, puis on connecte ou on automatise si cela apporte vraiment de la valeur.",
    },
    {
      q: "Le premier rendez-vous est-il payant ?",
      a: "Non. La visite diagnostic est gratuite et sans engagement. L’analyse terrain approfondie, elle, est payante et sert de base au devis fixe.",
    },
    {
      q: `Intervenez-vous aussi autour de ${city.name} ?`,
      a: `Oui. Au-delà de ${city.name}, nous accompagnons les PME de ${city.province} et plus largement en Wallonie et à Bruxelles${nearby.length ? `, notamment vers ${nearby.map((c) => c.name).join(", ")}` : ""}.`,
    },
  ];

  const offerings = [
    {
      title: "Simplifier et automatiser",
      text: `Les tâches répétitives de votre équipe à ${city.name} quittent le quotidien : relances, calculs, notifications, exports.`,
      href: "/cas-concrets",
    },
    {
      title: "Connecter vos outils",
      text: "Excel, mails, ERP, CRM : l’information circule sans double encodage.",
      href: "/services/systemes-de-gestion",
    },
    {
      title: "Portails et formulaires",
      text: "Un configurateur, un formulaire ou un portail seulement s’il simplifie un processus métier.",
      href: "/services/creation-site-web",
    },
  ];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Zones", path: "/zones" },
          { name: city.name, path },
        ])}
      />
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${absoluteUrl(path)}#service`,
          name: `Simplification des processus PME à ${city.name}`,
          serviceType: "Simplification et automatisation de processus",
          description: city.intro,
          url: absoluteUrl(path),
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: [
            {
              "@type": "City",
              name: city.name,
              postalCode: city.postalCode,
            },
            {
              "@type": "AdministrativeArea",
              name: city.province,
            },
          ],
        }}
      />

      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Zones", href: "/zones" },
          { label: city.name },
        ]}
        eyebrow={`Optmiz · ${city.name}`}
        title={
          <>
            Simplification des processus PME à{" "}
            <span className="text-accent">{city.name}</span>
          </>
        }
        subtitle={city.intro}
        ctaHref="/#devis"
        ctaLabel="Réserver une visite diagnostic gratuite"
        note={`${city.province} · ${city.postalCode} · ${city.populationLabel} habitants`}
      />

      <section className="page-section">
        <div className="container-site city-layout">
          <div>
            <p className="page-kicker font-mono">Contexte local</p>
            <h2 className="page-title">{city.name}, un terrain que l’on connaît</h2>
            <p className="page-lead">{city.localContext}</p>
            <p className="page-lead" style={{ marginTop: "0.85rem" }}>
              {city.whyLocal}
            </p>
            {city.neighborhoods.length ? (
              <p className="page-lead" style={{ marginTop: "0.85rem" }}>
                Nous intervenons notamment du côté de {city.neighborhoods.join(", ")}, partout où
                vos équipes travaillent réellement.
              </p>
            ) : null}
          </div>
          <aside className="city-meta page-card">
            <p className="page-kicker font-mono">Fiche locale</p>
            <dl className="city-meta-list">
              <div>
                <dt>Province</dt>
                <dd>{city.province}</dd>
              </div>
              <div>
                <dt>Code postal</dt>
                <dd>{city.postalCode}</dd>
              </div>
              <div>
                <dt>Population</dt>
                <dd>{city.populationLabel}</dd>
              </div>
              <div>
                <dt>Siège Optmiz</dt>
                <dd>Soignies</dd>
              </div>
            </dl>
            <Link
              href="/#devis"
              className="btn-primary-glow section-cta"
              style={{ display: "inline-flex", marginTop: "1rem" }}
            >
              Réserver une visite diagnostic à {city.name}
            </Link>
          </aside>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">Secteurs fréquents</p>
          <h2 className="page-title">Des profils {city.demonym} que l’on croise souvent</h2>
          <div className="city-tags">
            {city.industries.map((industry) => (
              <span key={industry} className="city-tag">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-site">
          <p className="page-kicker font-mono">Solutions à {city.name}</p>
          <h2 className="page-title">Ce que l’on peut mettre en œuvre pour vous</h2>
          <div className="page-grid-3">
            {offerings.map((offer) => (
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
                  En savoir plus →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <p className="page-kicker font-mono">FAQ · {city.name}</p>
          <h2 className="page-title">Vos questions, sans détour</h2>
          <div style={{ marginTop: "1.25rem" }}>
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      {nearby.length ? (
        <section className="page-section">
          <div className="container-site">
            <p className="page-kicker font-mono">Communes voisines</p>
            <h2 className="page-title">Aussi autour de {city.name}</h2>
            <div className="city-nearby">
              {nearby.map((near) => (
                <Link key={near.slug} href={`/zones/${near.slug}`} className="text-link city-nearby-link">
                  {near.name}
                </Link>
              ))}
              <Link href="/zones" className="text-link city-nearby-link">
                Toutes les zones →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-section page-section-alt">
        <div className="container-site" style={{ maxWidth: 720 }}>
          <p className="page-kicker font-mono">Prochaine étape</p>
          <h2 className="page-title">On vient chez vous à {city.name} ?</h2>
          <p className="page-lead">
            Réservez une visite diagnostic gratuite sur votre lieu de travail. Ou
            écrivez-nous si vous préférez commencer par un message.
          </p>
          <div className="inline-actions" style={{ marginTop: "1.25rem" }}>
            <Link href="/#devis" className="btn-primary-glow section-cta">
              Réserver une visite diagnostic gratuite
            </Link>
            <Link href="/contact" className="btn-ghost section-cta">
              Contacter Optmiz
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
