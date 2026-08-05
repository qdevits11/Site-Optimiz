import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";

export const metadata: Metadata = {
  title: "Tarifs - Prix fixe, défini ensemble. Zéro surprise",
  description:
    "Chaque projet est cadré à l'avance. Chaque forfait est transparent. Vous savez exactement ce que vous payez et ce que vous obtenez.",
};

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
    text: "On observe le réel avec vos équipes : flux, frictions, habitudes. Vous repartez avec une cartographie claire — même si vous n’allez pas plus loin.",
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

const faqs = [
  {
    q: "Le diagnostic est-il vraiment gratuit ?",
    a: "Oui. Premier échange gratuit et sans engagement. L’audit terrain complet, lui, est payant.",
  },
  {
    q: "Quelle est la différence entre diagnostic et audit ?",
    a: "Le diagnostic = premier échange pour cadrer. L’audit = mission terrain avec cartographie complète, base du devis fixe.",
  },
  {
    q: "Pourquoi l’audit est-il payant ?",
    a: "Il mobilise du temps terrain réel (équipes, outils, flux, rédaction). Même sans suite, vous gardez une vision claire de vos process.",
  },
  {
    q: "Comment est calculé le prix d’un projet ?",
    a: "Sur base de l’audit : périmètre précis × jours nécessaires, à taux journalier fixe. Tout est dans le devis avant démarrage.",
  },
  {
    q: "Et si je veux ajouter quelque chose en cours de projet ?",
    a: "Réévaluation formelle + nouveau devis. Rien n’est fait sans votre validation.",
  },
  {
    q: "Faut-il un forfait Zen après un projet ?",
    a: "Non, c’est optionnel. Utile si vous voulez maintenance et amélioration continue sans le gérer seuls.",
  },
  {
    q: "Peut-on changer de forfait Zen ?",
    a: "Oui. On ajuste selon vos besoins du moment.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
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
            <FaqList faqs={faqs} />
          </div>
          <p className="page-lead" style={{ marginTop: "1.25rem" }}>
            D’abord voir des résultats ?{" "}
            <Link href="/cas-concrets" className="text-link">
              Cas concrets →
            </Link>{" "}
            ·{" "}
            <Link href="/pourquoi-nous" className="text-link">
              Qui est derrière Optmiz →
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
