import type { Metadata } from "next";
import Link from "next/link";
import { LeadQualifier } from "@/components/LeadQualifier";
import { CtaButton } from "@/components/CtaButton";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { methodSteps } from "@/lib/content";
import { buildBreadcrumbJsonLd, pageMetadata, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/notre-methodologie")!;

export const metadata: Metadata = pageMetadata(page);

const gains = [
  "Des heures récupérées chaque mois",
  "Moins de charge mentale pour vos équipes",
  "Des économies mesurables sur l’année",
  "Focus retrouvé sur le cœur de métier",
  "Processus clairs et documentés",
  "Prêt à grandir sans complexifier",
];

export default function MethodPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Méthode", path: "/notre-methodologie" },
        ])}
      />
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Méthode" }]}
        eyebrow="Méthode"
        title={
          <>
            La Méthode <span className="text-accent">Optmiz</span>
          </>
        }
        subtitle="6 étapes simples pour transformer votre organisation, sans tout bouleverser d’un coup."
      />

      <ProblemSection
        title="Pourquoi vos outils ne suffisent pas ?"
        intro="Ce n’est pas un manque de logiciels. C’est l’accumulation de frictions :"
        points={[
          "Tâches répétitives qui consomment du temps chaque jour",
          "Outils qui ne communiquent pas entre eux",
          "Équipes qui compensent avec des solutions manuelles",
          "Complexité qui augmente avec la croissance",
        ]}
        closing="Le coût réel est invisible : temps perdu, fatigue, décisions ralenties."
      />

      <section className="page-section">
        <div className="container-site">
          <p className="page-kicker font-mono">Comment on travaille</p>
          <h2 className="page-title">Observer → Transformer → Zenifier</h2>
          <p className="page-lead">
            On part de votre fonctionnement réel, on simplifie, on automatise, puis on stabilise.
          </p>
          <div className="page-grid-3">
            {methodSteps.map((step) => (
              <article key={step.title} className="page-card">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-extrabold"
                  style={{ background: "var(--accent)", color: "#04120f" }}
                >
                  {step.letter}
                </div>
                <h3 className="font-display" style={{ marginTop: "0.85rem", fontSize: "1.1rem" }}>
                  {step.title}
                </h3>
                <p style={{ margin: "0.4rem 0 0", color: "var(--muted)", fontSize: "0.95rem" }}>
                  {step.text}
                </p>
              </article>
            ))}
          </div>
          <p className="page-lead" style={{ marginTop: "1.25rem" }}>
            Qui est derrière cette approche ?{" "}
            <Link href="/pourquoi-nous" className="text-link">
              Découvrir Quentin →
            </Link>{" "}
            ·{" "}
            <Link href="/ressources/par-ou-commencer-automatisation" className="text-link">
              Par où commencer ? →
            </Link>
          </p>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">Ce que vous gagnez</p>
          <h2 className="page-title">Des bénéfices lisibles immédiatement</h2>
          <div className="page-grid-3">
            {gains.map((gain) => (
              <div key={gain} className="page-card">
                <p style={{ margin: 0, color: "var(--text)", fontWeight: 600 }}>
                  <span className="text-accent">✓</span> {gain}
                </p>
              </div>
            ))}
          </div>
          <div className="inline-actions" style={{ marginTop: "1.35rem" }}>
            <CtaButton>Je veux ce type de résultat ›</CtaButton>
            <Link href="/cas-concrets" className="text-link">
              Voir les cas concrets →
            </Link>
          </div>
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
