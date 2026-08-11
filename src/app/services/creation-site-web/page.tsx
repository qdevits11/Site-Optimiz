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

const page = sitePages.find((entry) => entry.path === "/services/creation-site-web")!;

export const metadata: Metadata = pageMetadata(page);

const capabilities = [
  {
    title: "Configurateur & structuration commerciale",
    text: "Un configurateur de produit qui standardise vos demandes de prix et les centralise dans votre CRM.",
  },
  {
    title: "Formulaires connectés",
    text: "Les demandes ne finissent plus dans une boîte mail : elles alimentent directement vos outils de suivi.",
  },
  {
    title: "Vitrine claire, pensée pour convertir",
    text: "Un site qui explique ce que vous faites et pousse vers l’action, sans jargon ni surcharge.",
  },
  {
    title: "Multi-pays / multi-langues si nécessaire",
    text: "Structuré pour grandir à l’international quand votre activité le demande.",
  },
];

const faqs = [
  {
    q: "Travaillez-vous avec un CMS ou une techno en particulier ?",
    a: "Non. Le choix se fait après l’audit, selon ce qui correspond à votre besoin réel : pas d’attachement à une techno par défaut.",
  },
  {
    q: "Le site est-il connecté à mes autres outils ?",
    a: "C’est souvent tout l’intérêt : un site qui alimente automatiquement votre CRM ou votre suivi commercial, plutôt qu’un site isolé.",
  },
  {
    q: "Le référencement (SEO) est-il pris en compte ?",
    a: "Oui, dès la conception : structure, performance et contenu sont pensés pour être trouvés, pas ajoutés après coup.",
  },
];

export default function CreationSiteWebPage() {
  return (
    <>
      <JsonLd
        data={buildServiceOfferingJsonLd({
          name: "Création de site internet sur mesure",
          description:
            "Site internet, configurateur ou plateforme connectée à vos outils, construit quand il sert un vrai besoin métier.",
          path: "/services/creation-site-web",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Création de site internet", path: "/services/creation-site-web" },
        ])}
      />
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Création de site internet" },
        ]}
        eyebrow="Services"
        title={
          <>
            Un site internet, quand il sert <span className="text-accent">un vrai besoin métier</span>
          </>
        }
        subtitle="Pas un site vitrine générique : un outil qui structure votre activité (devis, configurateur, prise de contact)."
      />

      <ProblemSection
        title="Ce qu’on évite"
        intro="Les mauvaises expériences avec un site web, on les connaît :"
        points={[
          "Un site joli mais inutile au quotidien",
          "Un site isolé qui ne parle à aucun autre outil",
          "Une maintenance qui traîne, plus personne pour y toucher",
          "Le référencement oublié après la mise en ligne",
        ]}
        closing="Chez Optmiz, un site n’est construit que s’il répond à un besoin identifié pendant l’audit."
      />

      <section className="page-section">
        <div className="container-site">
          <p className="page-kicker font-mono">Ce qu’un site peut faire pour vous</p>
          <h2 className="page-title">Des exemples concrets, pas une liste de fonctionnalités</h2>
          <div className="page-grid-2">
            {capabilities.map((item) => (
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
            C’est exactement ce qui a été livré dans l’un de nos{" "}
            <Link href="/cas-concrets" className="text-link">
              cas concrets
            </Link>{" "}
            : un configurateur de produit multi-pays, connecté au CRM, qui a remplacé des dizaines
            de mails et d’appels dispersés.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <CtaButton>Parler de mon projet ›</CtaButton>
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <p className="page-kicker font-mono">Notre approche</p>
          <h2 className="page-title">Le même process que pour toute automatisation</h2>
          <p className="page-lead">
            Diagnostic gratuit, audit terrain, devis fixe avant démarrage. Un site internet n’échappe
            pas à cette règle : pas de surprise de budget, pas de fonctionnalité imposée.
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

      <section className="page-section">
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
