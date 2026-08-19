import type { Metadata } from "next";
import Link from "next/link";
import { LeadQualifier } from "@/components/LeadQualifier";
import { CtaButton } from "@/components/CtaButton";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { SECONDARY_CTA } from "@/lib/cta";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceOfferingJsonLd,
  pageMetadata,
  sitePages,
} from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/services/systemes-de-gestion")!;

export const metadata: Metadata = pageMetadata(page);

const coverage = [
  {
    title: "Connexion d’outils et de données",
    text: "Excel, mails, ERP, CRM et outils métier qui doivent fonctionner ensemble, sans double encodage.",
  },
  {
    title: "Outils de pilotage",
    text: "Centraliser l’information utile pour comprendre ce qui se passe et prendre des décisions.",
  },
  {
    title: "Suivi commercial",
    text: "Demandes, devis et clients centralisés, avec un suivi clair au lieu de mails dispersés.",
  },
  {
    title: "RH, pointages, facturation",
    text: "Données consolidées, moins d’erreurs, moins de tâches manuelles.",
  },
];

const faqs = [
  {
    q: "Proposez-vous un logiciel en particulier ?",
    a: "Non. Si un outil existant répond au besoin, nous l’utilisons. Un développement sur mesure n’arrive que lorsqu’aucun outil existant ne convient. Jamais l’inverse.",
  },
  {
    q: "Faut-il abandonner mes outils actuels ?",
    a: "Non. Vos outils actuels d’abord. La priorité est de les connecter et de les fiabiliser avant d’envisager un remplacement.",
  },
  {
    q: "Qui forme mes équipes ?",
    a: "Nous, à la livraison. Un système utile est un système utilisé : l’adoption réelle fait partie du projet, pas une option.",
  },
];

export default function SystemesDeGestionPage() {
  return (
    <>
      <JsonLd
        data={buildServiceOfferingJsonLd({
          name: "Outils de pilotage et connexion de données",
          description:
            "Centraliser l’information, connecter les outils existants, et construire un outil seulement si aucun existant ne répond correctement au besoin.",
          path: "/services/systemes-de-gestion",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Solutions", path: "/services" },
          { name: "Outils de pilotage", path: "/services/systemes-de-gestion" },
        ])}
      />
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Solutions", href: "/services" },
          { label: "Outils de pilotage" },
        ]}
        eyebrow="Solutions"
        title={
          <>
            Connecter et piloter,{" "}
            <span className="text-accent">pas vendre un logiciel</span>
          </>
        }
        subtitle="Vos outils actuels d’abord. Du sur-mesure seulement si nécessaire. L’objectif : une information disponible et une façon de travailler plus simple."
        showSecondary
      />

      <ProblemSection
        title="Ce qu’on évite"
        intro="Les mauvaises expériences avec un système de gestion, on les connaît :"
        points={[
          "Données dispersées entre Excel, mails et outils isolés",
          "Un logiciel standard trop rigide ou trop cher pour votre taille",
          "Une implémentation qui traîne pendant des mois",
          "Personne dans l’équipe qui maîtrise vraiment l’outil choisi",
        ]}
        closing="Chez Optmiz, l’outil est choisi après avoir compris votre réalité, pas avant."
      />

      <section className="page-section">
        <div className="container-site" style={{ maxWidth: 800 }}>
          <p className="page-kicker font-mono">Indépendance vis-à-vis des technologies</p>
          <h2 className="page-title">Si un outil existant suffit, nous le gardons.</h2>
          <p className="page-lead">
            Certains besoins se résolvent en connectant ce qui existe déjà. D’autres demandent un
            outil de suivi plus clair. D’autres encore, plus rares, demandent une application sur
            mesure parce qu’aucun outil existant ne répond correctement. La décision se prend après
            l’analyse terrain, jamais avant.
          </p>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">Ce que cela peut couvrir</p>
          <h2 className="page-title">Des exemples concrets, pas une liste de modules</h2>
          <div className="page-grid-2">
            {coverage.map((item) => (
              <article key={item.title} className="page-card">
                <h3 className="font-display" style={{ margin: 0, fontSize: "1.1rem" }}>
                  {item.title}
                </h3>
                <p style={{ margin: "0.5rem 0 0", color: "var(--muted)", fontSize: "0.95rem" }}>
                  {item.text}
                </p>
              </article>
            ))}
          </div>
          <p className="page-lead" style={{ marginTop: "1.25rem" }}>
            Trois de nos{" "}
            <Link href={SECONDARY_CTA.href} className="text-link">
              cas concrets
            </Link>{" "}
            illustrent exactement ça : pointages RH centralisés, 1 874 notifications de loyers
            générées automatiquement, configurateur de demandes de prix connecté au CRM.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <CtaButton />
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <p className="page-kicker font-mono">Notre approche</p>
          <h2 className="page-title">Le même parcours que pour toute simplification</h2>
          <p className="page-lead">
            Visite diagnostic gratuite, analyse terrain payante, devis fixe avant mise en œuvre. Le
            choix de l’outil fait partie du devis, pas une surprise après signature.
          </p>
          <p className="page-lead" style={{ marginTop: "0.65rem" }}>
            <Link href="/notre-methodologie" className="text-link">
              Voir la méthode en détail →
            </Link>{" "}
            ·{" "}
            <Link href="/tarifs" className="text-link">
              Comprendre le prix fixe →
            </Link>
          </p>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <p className="page-kicker font-mono">FAQ</p>
          <h2 className="page-title">Questions fréquentes</h2>
          <div style={{ marginTop: "1.15rem" }}>
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <section className="section-block cta-section">
        <div className="container-site">
          <LeadQualifier />
        </div>
      </section>
    </>
  );
}
