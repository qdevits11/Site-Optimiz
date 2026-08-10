import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { generalFaqs, pricingFaqs } from "@/lib/content";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, pageMetadata, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/faq")!;

export const metadata: Metadata = pageMetadata(page);

const allFaqs = [...generalFaqs, ...pricingFaqs];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(allFaqs)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "FAQ", path: "/faq" }])} />
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "FAQ" }]}
        eyebrow="FAQ"
        title={
          <>
            Vos questions sur l’automatisation <span className="text-accent">et sur Optmiz</span>
          </>
        }
        subtitle="Diagnostic, audit, prix fixe, délais, outils : les réponses aux questions les plus fréquentes."
      />

      <section className="page-section">
        <div className="container-site" style={{ maxWidth: 800 }}>
          <div className="faq-group">
            <h2 className="faq-group-title font-display">Automatisation & digitalisation</h2>
            <FaqList faqs={[...generalFaqs]} />
          </div>

          <div className="faq-group">
            <h2 className="faq-group-title font-display">Diagnostic, audit & tarifs</h2>
            <FaqList faqs={[...pricingFaqs]} />
            <p className="page-lead" style={{ marginTop: "1rem" }}>
              Le détail des forfaits est sur la page{" "}
              <Link href="/tarifs" className="text-link">
                Tarifs
              </Link>
              . Pour comprendre la méthode de bout en bout, voir{" "}
              <Link href="/notre-methodologie" className="text-link">
                notre méthodologie
              </Link>
              .
            </p>
          </div>
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
