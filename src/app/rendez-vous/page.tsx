import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { cities } from "@/lib/cities";
import { BOOKING_DURATION_MINUTES } from "@/lib/booking";
import { buildBreadcrumbJsonLd, pageMetadata, siteConfig, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/rendez-vous")!;

export const metadata: Metadata = pageMetadata(page);

const benefits = [
  {
    title: "Chez vous, sur votre lieu de travail",
    text: "Quentin se déplace en Wallonie. Vous n’avez rien à préparer : on regarde ensemble ce que vous faites déjà et ce qui vous freine.",
  },
  {
    title: `${BOOKING_DURATION_MINUTES} minutes, pas une demi-journée`,
    text: "De quoi faire le tour de votre activité et de vos priorités, sans monopoliser toute votre équipe.",
  },
  {
    title: "Gratuit et sans engagement",
    text: "Vous repartez avec un avis honnête. Si ce n’est pas le moment, on vous le dira aussi franchement — et un devis fixe seulement si un projet a du sens.",
  },
];

export default function RendezVousPage() {
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
            urlTemplate: `${siteConfig.url}/rendez-vous`,
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
        subtitle="Choisissez le créneau qui vous arrange. Optmiz se déplace en Wallonie pour comprendre votre métier avant de proposer quoi que ce soit."
        ctaHref="#reservation"
        ctaLabel="Choisir un créneau"
        note="45 min · Gratuit · Sans engagement · Confirmation sous 24h"
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
            Vous préférez d’abord écrire ? Passez par le{" "}
            <Link href="/contact" className="text-link">
              formulaire de contact
            </Link>{" "}
            ou le{" "}
            <Link href="/#devis" className="text-link">
              devis guidé
            </Link>
            . Nous intervenons notamment à{" "}
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

      <section className="section-block cta-section">
        <div className="container-site">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
