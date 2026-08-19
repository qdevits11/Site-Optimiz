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

const page = sitePages.find((entry) => entry.path === "/services/creation-site-web")!;

export const metadata: Metadata = pageMetadata(page);

const capabilities = [
  {
    title: "Configurateur",
    text: "Standardiser une demande de prix et l’envoyer directement dans le suivi commercial.",
  },
  {
    title: "Formulaire connecté",
    text: "Les demandes n’atterrissent plus dans une boîte mail : elles alimentent vos outils internes.",
  },
  {
    title: "Portail client, fournisseur ou collaborateur",
    text: "Structurer les échanges et rendre l’information disponible, sans relance manuelle.",
  },
  {
    title: "Demande de prix",
    text: "Un parcours clair qui qualifie le besoin et alimente le processus commercial.",
  },
  {
    title: "Prise de rendez-vous connectée",
    text: "Le prospect choisit un créneau disponible, sans allers-retours par mail.",
  },
  {
    title: "Intégration au suivi commercial",
    text: "Le site ou le portail n’est utile que s’il simplifie un processus métier existant.",
  },
];

const faqs = [
  {
    q: "Construisez-vous des sites vitrine ?",
    a: "Uniquement si cela simplifie un processus (prise de contact, demande de prix, rendez-vous). Nous ne vendons pas de sites internet génériques.",
  },
  {
    q: "Le site est-il connecté à mes autres outils ?",
    a: "C’est souvent tout l’intérêt : un formulaire, un configurateur ou un portail qui alimente automatiquement votre suivi, plutôt qu’un site isolé.",
  },
  {
    q: "Travaillez-vous avec une techno en particulier ?",
    a: "Non. Le choix se fait après l’analyse terrain, selon ce qui correspond à votre besoin réel.",
  },
];

export default function CreationSiteWebPage() {
  return (
    <>
      <JsonLd
        data={buildServiceOfferingJsonLd({
          name: "Site, portail ou configurateur métier",
          description:
            "Un site ou portail uniquement lorsqu’il simplifie un processus métier : configurateur, formulaire connecté, portail, demande de prix, prise de rendez-vous.",
          path: "/services/creation-site-web",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Solutions", path: "/services" },
          { name: "Portails et configurateurs", path: "/services/creation-site-web" },
        ])}
      />
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <PageHero
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Solutions", href: "/services" },
          { label: "Portails et configurateurs" },
        ]}
        eyebrow="Solutions"
        title={
          <>
            Un site ou portail uniquement lorsqu’il simplifie{" "}
            <span className="text-accent">un processus métier</span>
          </>
        }
        subtitle="Pas une offre de création de sites. Un moyen, parmi d’autres, pour structurer les échanges et alimenter vos outils internes."
        showSecondary
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
        closing="Chez Optmiz, un site, un portail ou un configurateur n’est construit que s’il répond à un besoin identifié pendant l’analyse terrain."
      />

      <section className="page-section">
        <div className="container-site">
          <p className="page-kicker font-mono">Quand cela a du sens</p>
          <h2 className="page-title">Des usages métier, pas une vitrine générique</h2>
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
            <Link href={SECONDARY_CTA.href} className="text-link">
              cas concrets
            </Link>{" "}
            : un configurateur de produit multi-pays, connecté au CRM, qui a remplacé des dizaines
            de mails et d’appels dispersés.
          </p>
          <p className="page-lead">
            Pour aller plus loin :{" "}
            <Link href="/ressources/outils-integres-site-internet-pme" className="text-link">
              formulaires, calendrier, outils intégrés →
            </Link>
          </p>
          <div style={{ marginTop: "1rem" }}>
            <CtaButton />
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <p className="page-kicker font-mono">Notre approche</p>
          <h2 className="page-title">Le même parcours que pour toute simplification</h2>
          <p className="page-lead">
            Visite diagnostic gratuite, analyse terrain payante, devis fixe avant mise en œuvre. Un
            portail n’échappe pas à cette règle : pas de surprise de budget, pas de fonctionnalité
            imposée.
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
          <LeadQualifier />
        </div>
      </section>
    </>
  );
}
