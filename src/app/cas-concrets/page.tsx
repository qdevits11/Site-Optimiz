import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cas Concrets, résultats réels d'automatisation en PME belges",
  description:
    "Voici ce que nos clients ont réellement gagné en temps, sérénité et efficacité.",
};

const stats = [
  { value: "10h+", label: "récupérées / mois / collaborateur" },
  { value: "70%", label: "de temps en moins sur tâches auto" },
  { value: "ROI", label: "dès la première optimisation" },
];

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Cas concrets"
        title={
          <>
            Des résultats concrets, <span className="text-accent">pas des promesses.</span>
          </>
        }
        subtitle="Ce que des PME belges ont réellement gagné : temps, sérénité, efficacité."
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
          <p className="page-kicker font-mono">Transformations</p>
          <h2 className="page-title">5 cas réels, 5 résultats clairs</h2>
          <p className="page-lead">Cliquez pour lire le problème, la solution et le résultat.</p>
          <div style={{ marginTop: "1.15rem", maxWidth: 760 }}>
            <Accordion items={caseStudies} />
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">En moyenne</p>
          <h2 className="page-title">Ce que ça représente concrètement</h2>
          <div className="page-grid-3">
            {stats.map((stat) => (
              <div key={stat.label} className="page-card stat-chip">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <p
            className="page-lead"
            style={{ marginTop: "1.25rem", color: "var(--text)", fontWeight: 600 }}
          >
            Je ne vends pas des heures de conseil. Je construis des systèmes qui fonctionnent.
          </p>
          <div className="inline-actions" style={{ marginTop: "1rem" }}>
            <CtaButton>Je veux les mêmes résultats ›</CtaButton>
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
          <ContactForm />
        </div>
      </section>
    </>
  );
}
