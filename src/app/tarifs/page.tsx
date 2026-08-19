import type { Metadata } from "next";
import Link from "next/link";
import { LeadQualifier } from "@/components/LeadQualifier";
import { CtaButton } from "@/components/CtaButton";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { commercialSteps, pricingFaqs } from "@/lib/content";
import { SECONDARY_CTA } from "@/lib/cta";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  pageMetadata,
  sitePages,
} from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/tarifs")!;

export const metadata: Metadata = pageMetadata(page);

const zenPlans = [
  {
    name: "Zen Basique",
    quote: "Ça tourne. Vous êtes tranquille.",
    features: [
      "Maintenance serveurs & infrastructure",
      "Gestion des abonnements / outils",
      "Maintien en service des projets",
      "Correctifs si nécessaire",
    ],
  },
  {
    name: "Zen Standard",
    quote: "Maintenance + accompagnement mensuel.",
    features: [
      "Tout Basique",
      "Évolutions de vos projets",
      "Visio mensuelle préparée",
      "Priorisation des améliorations",
    ],
    featured: true,
  },
  {
    name: "Zen Premium",
    quote: "Présence terrain et amélioration continue.",
    features: [
      "Tout Standard",
      "1 jour physique / mois",
      "Analyse terrain",
      "Suivi stratégique",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(pricingFaqs)} />
      <JsonLd data={buildServiceJsonLd()} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Tarifs", path: "/tarifs" }])} />
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Tarifs" }]}
        eyebrow="Tarifs"
        title={
          <>
            Prix fixe, défini ensemble.{" "}
            <span className="text-accent">Zéro mauvaise surprise.</span>
          </>
        }
        subtitle="Visite diagnostic gratuite. Analyse terrain payante. Devis fixe avant mise en œuvre. Suivi Zen optionnel."
        showSecondary
      />

      <ProblemSection
        title="Ce que vous évitez avec nous"
        intro="Les mauvaises expériences IT, on les connaît :"
        points={[
          "Devis attractif qui gonfle au fil des mois",
          "Heures facturées sans résultat visible",
          "Livrable éloigné de ce qui avait été discuté",
          "Budget impossible à suivre en temps réel",
        ]}
        closing="Chez Optmiz, le prix de la mise en œuvre est fixé après l’analyse terrain, avant la première ligne de code."
      />

      <section className="page-section">
        <div className="container-site" style={{ maxWidth: 800 }}>
          <p className="page-kicker font-mono">Comment ça se chiffre</p>
          <h2 className="page-title">Quatre étapes. Dans l’ordre. Sans raccourci.</h2>
          <div style={{ marginTop: "1.15rem", display: "grid", gap: "0.75rem" }}>
            {commercialSteps.map((step) => (
              <article key={step.title} className="page-card">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-accent" style={{ fontSize: "0.85rem" }}>
                    {step.n}
                  </span>
                  <h3 className="font-display" style={{ margin: 0, fontSize: "1.1rem" }}>
                    {step.title}
                  </h3>
                  {"badge" in step && step.badge ? (
                    <span className={`step-badge ${step.badgeClass}`}>{step.badge}</span>
                  ) : null}
                </div>
                <p style={{ margin: "0.65rem 0 0", color: "var(--muted)", fontSize: "0.95rem" }}>
                  {step.text}
                </p>
                {"include" in step && step.include ? (
                  <p className="include-box">{step.include}</p>
                ) : null}
              </article>
            ))}
          </div>
          <p className="page-lead" style={{ marginTop: "1rem", color: "var(--text)", fontWeight: 600 }}>
            Vous savez ce qui sera réalisé et combien cela coûtera avant le démarrage de la mise
            en œuvre.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <CtaButton />
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">Après le projet</p>
          <h2 className="page-title">Forfaits Zen (optionnels)</h2>
          <p className="page-lead">
            Pour maintenir et faire évoluer vos systèmes dans la durée. Tarif défini ensemble
            selon vos projets actifs. Jamais obligatoire.
          </p>
          <div className="page-grid-3">
            {zenPlans.map((plan) => (
              <article
                key={plan.name}
                className={`page-card${plan.featured ? " is-featured" : ""}`}
                style={
                  plan.featured
                    ? { borderColor: "rgba(46, 230, 188, 0.45)" }
                    : undefined
                }
              >
                <h3 className="font-display" style={{ margin: 0, fontSize: "1.2rem" }}>
                  {plan.name}
                </h3>
                <p className="pricing-quote">{plan.quote}</p>
                <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--muted)" }}>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <p className="page-kicker font-mono">FAQ</p>
          <h2 className="page-title">Questions fréquentes</h2>
          <div style={{ marginTop: "1.15rem" }}>
            <FaqList faqs={[...pricingFaqs]} />
          </div>
          <p className="page-lead" style={{ marginTop: "1.25rem" }}>
            D’abord voir des résultats ?{" "}
            <Link href={SECONDARY_CTA.href} className="text-link">
              {SECONDARY_CTA.label} →
            </Link>{" "}
            ·{" "}
            <Link href="/pourquoi-nous" className="text-link">
              Qui est derrière Optmiz →
            </Link>{" "}
            ·{" "}
            <Link href="/ressources/combien-coute-automatisation-pme-belgique" className="text-link">
              Comment est calculé un prix fixe →
            </Link>{" "}
            ·{" "}
            <Link href="/faq" className="text-link">
              Toutes les questions →
            </Link>
          </p>
        </div>
      </section>

      <section className="page-section cta-section">
        <div className="container-site">
          <LeadQualifier />
        </div>
      </section>
    </>
  );
}
