import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { cities } from "@/lib/cities";
import { getCalendlyUrl, isCalendlyConfigured } from "@/lib/calendly";
import { BOOKING_DURATION_MINUTES } from "@/lib/booking";
import { buildBreadcrumbJsonLd, pageMetadata, siteConfig, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/rendez-vous")!;

export const metadata: Metadata = pageMetadata(page);

const benefits = [
  {
    title: "Chez vous, sur votre lieu de travail",
    text: "Quentin se déplace en Wallonie. Indiquez l’adresse : on vient voir votre organisation réelle, pas une slide deck.",
  },
  {
    title: `${BOOKING_DURATION_MINUTES} minutes, pas une demi-journée`,
    text: "De quoi faire le tour de votre activité et de vos priorités, sans monopoliser toute votre équipe.",
  },
  {
    title: "Agenda synchronisé",
    text: "Les créneaux affichés sont vos disponibilités réelles (Calendly lié à l’agenda). Gratuit et sans engagement.",
  },
];

export default function RendezVousPage() {
  const calendlyReady = isCalendlyConfigured();
  const calendlyUrl = getCalendlyUrl();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Rendez-vous", path: "/rendez-vous" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ReserveAction",
          name: "Réserver une première visite Optmiz",
          target: {
            "@type": "EntryPoint",
            urlTemplate: calendlyUrl || `${siteConfig.url}/rendez-vous`,
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          result: {
            "@type": "Reservation",
            name: "Première visite diagnostic Optmiz",
          },
          provider: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Rendez-vous" }]}
        eyebrow="Premier rendez-vous"
        title={
          <>
            On vient <span className="text-accent">chez vous</span>, et c’est gratuit
          </>
        }
        subtitle="Choisissez un créneau synchronisé avec l’agenda Optmiz. La visite se fait à l’adresse que vous indiquez — en Wallonie, sans engagement."
        ctaHref={calendlyReady ? "#reservation" : "/#devis"}
        ctaLabel={calendlyReady ? "Choisir un créneau" : "Commencer par le devis"}
        note="45 min · Gratuit · Sans engagement · Agenda synchronisé"
      />

      <section className="page-section">
        <div className="container-site">
          <div className="page-grid-3">
            {benefits.map((item) => (
              <article key={item.title} className="page-card">
                <h3 className="font-display" style={{ margin: 0, fontSize: "1.1rem" }}>
                  {item.title}
                </h3>
                <p style={{ margin: "0.65rem 0 0", color: "var(--muted)", fontSize: "0.95rem" }}>
                  {item.text}
                </p>
              </article>
            ))}
          </div>
          <p className="page-lead" style={{ marginTop: "1.25rem", maxWidth: 720 }}>
            Vous préférez d’abord cadrer le besoin ? Passez par le{" "}
            <Link href="/#devis" className="text-link">
              devis guidé
            </Link>{" "}
            : questionnaire puis choix de créneau Calendly, en une seule fois. Nous intervenons
            notamment à{" "}
            {cities.slice(0, 6).map((city, index) => (
              <span key={city.slug}>
                {index > 0 ? (index === 5 ? " et " : ", ") : null}
                <Link href={`/zones/${city.slug}`} className="text-link">
                  {city.name}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      </section>

      <section className="section-block cta-section" id="reservation">
        <div className="container-site">
          {calendlyReady ? (
            <div className="contact-panel booking-panel">
              <div className="contact-heading">
                <p className="eyebrow font-mono">Calendly</p>
                <h2 className="font-display">
                  Choisissez votre <span className="text-accent">créneau</span>
                </h2>
                <p className="section-lead">
                  Indiquez l’adresse de visite dans Calendly (ou via le devis guidé). Seuls les
                  créneaux libres s’affichent.
                </p>
                <ul className="contact-reassure">
                  <li>Sur votre lieu de travail</li>
                  <li>Agenda synchronisé</li>
                  <li>Confirmation immédiate</li>
                </ul>
                <p className="page-lead" style={{ marginTop: "1rem" }}>
                  Pas encore cadré votre besoin ?{" "}
                  <Link href="/#devis" className="text-link">
                    Commencer par le questionnaire →
                  </Link>
                </p>
              </div>
              <CalendlyEmbed url={calendlyUrl} />
            </div>
          ) : (
            <BookingForm />
          )}
        </div>
      </section>
    </>
  );
}
