import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
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
    title: "Facturation & suivi financier",
    text: "Génération et calcul automatisés, moins d’erreurs, moins de relances manuelles.",
  },
  {
    title: "Suivi commercial (CRM)",
    text: "Demandes, devis et clients centralisés, avec un pipeline clair au lieu de mails dispersés.",
  },
  {
    title: "Gestion de production / stocks",
    text: "Données consolidées, visibilité en temps réel sur ce qui se passe réellement.",
  },
  {
    title: "RH & pointages",
    text: "Données de présence centralisées, sans copier-coller entre systèmes.",
  },
];

const faqs = [
  {
    q: "Odoo ou développement sur mesure, comment choisissez-vous ?",
    a: "Pendant l’audit. Odoo si votre périmètre s’y prête et que ça vous fait gagner du temps, développement sur mesure si votre réalité est trop spécifique pour un outil standard. Jamais l’inverse.",
  },
  {
    q: "Faut-il abandonner mes outils actuels ?",
    a: "Non. La priorité est de connecter et fiabiliser ce qui existe déjà (Excel, mails, outils métier) avant d’envisager un remplacement.",
  },
  {
    q: "Qui forme mes équipes à utiliser le nouveau système ?",
    a: "Nous, à la livraison. Un système utile est un système utilisé : l’adoption réelle fait partie du projet, pas une option.",
  },
];

export default function SystemesDeGestionPage() {
  return (
    <>
      <JsonLd
        data={buildServiceOfferingJsonLd({
          name: "Systèmes de gestion sur mesure (ERP, CRM, facturation)",
          description:
            "Structuration des données, factures et suivi client avec l'outil qui convient à la réalité du client (Odoo ou développement sur mesure).",
          path: "/services/systemes-de-gestion",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Systèmes de gestion", path: "/services/systemes-de-gestion" },
        ])}
      />
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Systèmes de gestion" },
        ]}
        eyebrow="Services"
        title={
          <>
            Un système de gestion adapté à votre réalité,{" "}
            <span className="text-accent">pas à un logiciel</span>
          </>
        }
        subtitle="ERP, CRM, facturation, suivi de production : structuré autour de vos processus réels, pas l’inverse."
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
          <p className="page-kicker font-mono">Pas d’attachement à un outil</p>
          <h2 className="page-title">Odoo si ça a du sens. Sur mesure si c’est plus adapté.</h2>
          <p className="page-lead">
            Certains projets se résolvent très bien avec un ERP existant comme Odoo, correctement
            paramétré. D’autres demandent un développement sur mesure parce que le périmètre est
            trop spécifique pour rentrer dans un outil standard. La décision se prend après l’audit
            terrain, jamais avant.
          </p>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">Ce qu’un système de gestion peut couvrir</p>
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
            <Link href="/cas-concrets" className="text-link">
              cas concrets
            </Link>{" "}
            illustrent exactement ça : pointages RH centralisés, 1 874 notifications de loyers
            générées automatiquement, CRM automatisé multi-pays.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <CtaButton>Parler de mon projet ›</CtaButton>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <p className="page-kicker font-mono">Notre approche</p>
          <h2 className="page-title">Le même process que pour toute automatisation</h2>
          <p className="page-lead">
            Diagnostic gratuit, audit terrain, devis fixe avant démarrage. Le choix de l’outil fait
            partie du devis, pas une surprise après signature.
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
          <ContactForm />
        </div>
      </section>
    </>
  );
}
