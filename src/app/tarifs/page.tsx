import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { pricingFaqs } from "@/lib/content";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  pageMetadata,
  sitePages,
} from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/tarifs")!;

export const metadata: Metadata = pageMetadata(page);

const pricingSteps = [
  {
    title: "Diagnostic rapide",
    badge: "Gratuit",
    badgeClass: "step-badge-free",
    text: "Premier échange pour comprendre votre contexte et valider qu’Optmiz peut vous apporter de la valeur. Sans engagement.",
  },
  {
    title: "Audit terrain & cartographie",
    badge: "Payant",
    badgeClass: "step-badge-paid",
    text: "On observe le réel avec vos équipes : flux, frictions, habitudes. Vous repartez avec une cartographie claire, même si vous n’allez pas plus loin.",
    include:
      "Inclut : sessions terrain, analyse des outils, écarts théorie/réalité, cartographie livrée.",
  },
  {
    title: "Devis fixe sur base de l’audit",
    text: "Projet cadré et chiffré avant démarrage. Pas de facturation à l’heure. Pas de surprise en fin de mois.",
  },
  {
    title: "Réalisation & livraison",
    text: "On livre exactement ce qui a été convenu. Toute évolution passe par une réévaluation validée par vous.",
  },
];

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
        subtitle="Projet cadré à l’avance. Forfaits transparents. Vous savez exactement ce que vous payez et ce que vous obtenez."
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
        closing="Chez Optmiz, le prix est fixé avant la première ligne de code."
      />

      <section className="page-section">
        <div className="container-site" style={{ maxWidth: 800 }}>
          <p className="page-kicker font-mono">Comment ça se chiffre</p>
          <h2 className="page-title">4 étapes. Dans l’ordre. Sans raccourci.</h2>
          <div style={{ marginTop: "1.15rem", display: "grid", gap: "0.75rem" }}>
            {pricingSteps.map((step, index) => (
              <article key={step.title} className="page-card">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-accent" style={{ fontSize: "0.85rem" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display" style={{ margin: 0, fontSize: "1.1rem" }}>
                    {step.title}
                  </h3>
                  {step.badge ? (
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
            Pas d’heures cachées. Pas de dépassement. Pas de mauvaise surprise.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <CtaButton>Discuter de mon projet ›</CtaButton>
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">Après le projet</p>
          <h2 className="page-title">Forfaits Zen (optionnels)</h2>
          <p className="page-lead">
            Pour maintenir et faire évoluer vos systèmes dans la durée. Tarif défini ensemble
            selon vos projets actifs.
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
            <Link href="/cas-concrets" className="text-link">
              Cas concrets →
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
          <ContactForm />
        </div>
      </section>
    </>
  );
}
