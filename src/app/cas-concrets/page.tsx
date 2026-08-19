import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { LeadQualifier } from "@/components/LeadQualifier";
import { CtaButton } from "@/components/CtaButton";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { caseStudies } from "@/lib/content";
import { PROOF_DISCLAIMER } from "@/lib/cta";
import { buildBreadcrumbJsonLd, pageMetadata, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/cas-concrets")!;

export const metadata: Metadata = pageMetadata(page);

const highlighted = [
  {
    title: "Relances clients",
    result: "Plusieurs heures → 5 min",
  },
  {
    title: "1 874 notifications",
    result: "2 semaines → ½ journée",
  },
  {
    title: "Feuilles de temps",
    result: "Papier → temps réel",
  },
  {
    title: "Pointages RH",
    result: "0 tâche manuelle",
  },
  {
    title: "Demandes de prix",
    result: "Configurateur connecté au CRM",
  },
];

export default function CasesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Cas concrets", path: "/cas-concrets" }])}
      />
      <PageHero
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Cas concrets" }]}
        eyebrow="Cas concrets"
        title={
          <>
            Des résultats concrets, <span className="text-accent">pas des promesses.</span>
          </>
        }
        subtitle="Ce que des PME en Wallonie et à Bruxelles ont réellement gagné : temps récupéré, erreurs évitées, processus simplifié."
      />

      <ProblemSection
        title="Ces situations vous parlent ?"
        intro="Ce sont exactement les problèmes que nos clients avaient avant :"
        points={[
          "Heures perdues chaque semaine sur des tâches manuelles évitables",
          "Données copiées d’un outil à l’autre, source d’erreurs",
          "Processus qui reposent sur une seule personne",
          "Manque de visibilité sur ce qui se passe vraiment",
        ]}
        closing="Dans chaque cas ci-dessous, une seule optimisation a changé le quotidien d’une équipe."
      />

      <section className="page-section">
        <div className="container-site">
          <p className="page-kicker font-mono">Résultats observés</p>
          <h2 className="page-title">Les chiffres qui comptent, parce qu’ils sont réels</h2>
          <div className="page-grid-3" style={{ marginTop: "1.15rem" }}>
            {highlighted.map((item) => (
              <article key={item.title} className="page-card">
                <h3 className="font-display" style={{ margin: 0, fontSize: "1.05rem" }}>
                  {item.title}
                </h3>
                <p className="text-accent" style={{ margin: "0.45rem 0 0", fontWeight: 700 }}>
                  {item.result}
                </p>
              </article>
            ))}
          </div>
          <p className="proof-disclaimer">{PROOF_DISCLAIMER}</p>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">Transformations</p>
          <h2 className="page-title">5 cas réels, 5 résultats clairs</h2>
          <p className="page-lead">Cliquez pour lire le problème, la solution et le résultat.</p>
          <div style={{ marginTop: "1.15rem", maxWidth: 760 }}>
            <Accordion items={caseStudies} />
          </div>
          <p className="proof-disclaimer">{PROOF_DISCLAIMER}</p>
          <div className="inline-actions" style={{ marginTop: "1.25rem" }}>
            <CtaButton />
            <Link href="/notre-methodologie" className="text-link">
              Voir la méthode →
            </Link>
            <Link href="/tarifs" className="text-link">
              Voir les tarifs →
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
