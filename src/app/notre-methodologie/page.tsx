import type { Metadata } from "next";
import Link from "next/link";
import { LeadQualifier } from "@/components/LeadQualifier";
import { CtaButton } from "@/components/CtaButton";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { commercialSteps, methodSteps } from "@/lib/content";
import { SECONDARY_CTA } from "@/lib/cta";
import { buildBreadcrumbJsonLd, pageMetadata, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/notre-methodologie")!;

export const metadata: Metadata = pageMetadata(page);

const gains = [
  "Du temps récupéré sur les tâches sans valeur ajoutée",
  "Moins d’erreurs et de doubles encodages",
  "Des processus plus simples, vraiment utilisés",
  "Des informations disponibles au bon moment",
  "Moins de dépendance aux personnes clés",
  "Une croissance plus fluide",
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
            Une seule méthode. <span className="text-accent">Quatre étapes.</span>
          </>
        }
        subtitle="Nous ne partons pas d’un outil. Nous partons de votre façon de travailler. Visite diagnostic gratuite, analyse terrain payante, mise en œuvre à prix fixe, suivi optionnel."
        showSecondary
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
          <p className="page-kicker font-mono">Parcours client</p>
          <h2 className="page-title">Visite diagnostic → Analyse → Mise en œuvre → Suivi Zen</h2>
          <p className="page-lead">
            C’est le seul déroulé commercial. Vous savez ce qui est gratuit, ce qui est payant, et
            ce que coûtera la suite avant de démarrer.
          </p>
          <div className="page-grid-2" style={{ marginTop: "1.15rem" }}>
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
          <p className="page-lead" style={{ marginTop: "1.25rem", fontWeight: 600, color: "var(--text)" }}>
            Vous savez ce qui sera réalisé et combien cela coûtera avant le démarrage de la mise
            en œuvre.
          </p>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">Principes de travail</p>
          <h2 className="page-title">OPTMIZ, une philosophie. Pas un second parcours.</h2>
          <p className="page-lead">
            Les six lettres d’Optmiz décrivent notre manière de penser. Elles ne remplacent pas
            les quatre étapes du projet.
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

      <section className="page-section">
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
            <CtaButton />
            <Link href={SECONDARY_CTA.href} className="text-link">
              {SECONDARY_CTA.label} →
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
