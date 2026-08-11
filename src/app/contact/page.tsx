import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { buildBreadcrumbJsonLd, buildContactPageJsonLd, pageMetadata, siteConfig, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/contact")!;

export const metadata: Metadata = pageMetadata(page);

const infoItems = [
  { label: "Localisation", value: `${siteConfig.location.city}, ${siteConfig.location.region}` },
  { label: "Zone d’intervention", value: "Wallonie & Bruxelles (pages locales)" },
  { label: "Téléphone", value: siteConfig.phoneDisplay, href: siteConfig.phoneHref },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Réponse", value: "Sous 24h ouvrées" },
  { label: "LinkedIn", value: "Optmiz", href: siteConfig.sameAs[0] },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildContactPageJsonLd()} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title={
          <>
            Parlons de <span className="text-accent">votre situation</span>
          </>
        }
        subtitle="Un premier échange de 30 à 45 minutes, gratuit et sans engagement — sur place chez vous ou à distance."
        ctaHref="/#devis"
        ctaLabel="Réserver une visite"
        note="Gratuit · Sans engagement · Créneau synchronisé"
      />

      <section className="page-section">
        <div className="container-site" style={{ maxWidth: 800 }}>
          <div className="contact-info-grid">
            {infoItems.map((item) => (
              <article key={item.label} className="page-card">
                <p className="page-kicker font-mono" style={{ marginBottom: "0.35rem" }}>
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-link"
                    style={{ fontSize: "0.95rem" }}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer me" }
                      : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text)" }}>{item.value}</p>
                )}
              </article>
            ))}
          </div>
          <p className="page-lead" style={{ marginTop: "1.1rem" }}>
            Pour une visite sur votre lieu de travail,{" "}
            <Link href="/#devis" className="text-link">
              réservez un créneau
            </Link>{" "}
            en 2 étapes sur l’accueil. Une question avant ? Consultez la{" "}
            <Link href="/faq" className="text-link">
              FAQ
            </Link>{" "}
            ou écrivez-nous directement à{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-link">
              {siteConfig.email}
            </a>
            .
          </p>
          <p className="page-lead" style={{ marginTop: "0.5rem" }}>
            Vous cherchez Optmiz près de chez vous ? Voir nos{" "}
            <Link href="/zones" className="text-link">
              zones d’intervention
            </Link>
            .
          </p>
          <p className="page-lead" style={{ marginTop: "0.5rem" }}>
            Vous remarquerez qu’il ne s’agit pas d’une adresse @gmail.com : c’est volontaire.{" "}
            <Link href="/ressources/nom-de-domaine-email-professionnel-pme" className="text-link">
              Voici pourquoi ça compte →
            </Link>
          </p>
        </div>
      </section>

      <section className="section-block cta-section">
        <div className="container-site">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
