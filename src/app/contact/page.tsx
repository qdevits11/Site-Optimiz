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
  { label: "Zone d’intervention", value: "Wallonie (Hainaut, Bruxelles, Nivelles) et à distance" },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Réponse", value: "Sous 24h ouvrées" },
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
        subtitle="Un premier échange de 30 minutes, gratuit et sans engagement, pour savoir si Optmiz peut vous aider."
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
                  <a href={item.href} className="text-link" style={{ fontSize: "0.95rem" }}>
                    {item.value}
                  </a>
                ) : (
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text)" }}>{item.value}</p>
                )}
              </article>
            ))}
          </div>
          <p className="page-lead" style={{ marginTop: "1.1rem" }}>
            Une question avant de réserver un créneau ? Consultez la{" "}
            <Link href="/faq" className="text-link">
              FAQ
            </Link>{" "}
            ou écrivez-nous directement à{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-link">
              {siteConfig.email}
            </a>
            .
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
