import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { buildPersonJsonLd, pageMetadata, sitePages } from "@/lib/seo";

const page = sitePages.find((entry) => entry.path === "/pourquoi-nous")!;

export const metadata: Metadata = pageMetadata(page);

const milestones = [
  {
    title: "Début de carrière",
    role: "Développeur → Directeur informatique",
    text: "Systèmes durables, conçus pour des équipes non tech (logements sociaux à Bruxelles).",
  },
  {
    title: "Industrie",
    role: "Leader IT (environnements exigeants)",
    text: "Volumes élevés, process complexes (Google, GSK, Inovyn, UCB). Livrer sous pression.",
  },
  {
    title: "Produit",
    role: "Digital Manager (sur mesure)",
    text: "Du web à l’atelier : configurateur, CRM, facturation, production pilotée tablettes.",
  },
  {
    title: "Aujourd’hui",
    role: "Fondateur d’Optmiz",
    text: "Accompagner les PME wallonnes : méthode claire, présence humaine, résultats rapides.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <JsonLd data={buildPersonJsonLd()} />
      <PageHero
        eyebrow="Pourquoi Optmiz"
        title="Vous méritez mieux qu’un consultant de passage."
        subtitle="15 ans terrain. Des résultats concrets. Une méthode qui tient dans le temps."
      />

      <ProblemSection
        title="Ce que vivent beaucoup de PME"
        intro="Que vous ayez déjà essayé un accompagnement ou que vous gériez tout en interne :"
        points={[
          "Des consultants qui livrent un rapport… puis disparaissent",
          "Des solutions trop complexes, jamais vraiment adoptées",
          "Peu de suivi quand la réalité change",
          "Un coût difficile à justifier face aux résultats",
        ]}
        closing="Résultat : les mêmes problèmes, avec un outil de plus à gérer."
      />

      <section className="page-section">
        <div className="container-site grid items-start gap-8 lg:grid-cols-[260px_1fr]">
          <Image
            src="/quentin.jpg"
            alt="Quentin Devits, fondateur d'Optmiz"
            width={280}
            height={280}
            className="profile-photo mx-auto"
          />
          <div>
            <p className="page-kicker font-mono">Fondateur</p>
            <h2 className="page-title">Quentin Devits</h2>
            <p className="page-lead">
              15 ans à construire et optimiser des systèmes : logement social, industrie
              internationale, production sur mesure.
            </p>
            <p className="page-lead">
              Ce que j’ai appris : chaque organisation a des leviers invisibles. Les trouver
              demande écoute, présence terrain, et des solutions que les équipes utilisent vraiment.
            </p>
            <div className="page-grid-3" style={{ marginTop: "1.15rem" }}>
              <div className="page-card stat-chip">
                <strong>15</strong>
                <span>ans d’expérience terrain</span>
              </div>
              <div className="page-card stat-chip">
                <strong>5</strong>
                <span>secteurs d’activité</span>
              </div>
              <div className="page-card stat-chip">
                <strong>100%</strong>
                <span>focalisé PME</span>
              </div>
            </div>
            <div style={{ marginTop: "1.25rem" }}>
              <CtaButton />
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section-alt">
        <div className="container-site">
          <p className="page-kicker font-mono">Parcours</p>
          <h2 className="page-title">Construit sur le terrain, pas dans les livres</h2>
          <div className="page-grid-2">
            {milestones.map((item) => (
              <article key={item.title} className="page-card">
                <h3 className="font-display" style={{ margin: 0, fontSize: "1.1rem" }}>
                  {item.title}
                </h3>
                <p className="text-accent" style={{ margin: "0.35rem 0", fontWeight: 600 }}>
                  {item.role}
                </p>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.95rem" }}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-site">
          <p className="page-kicker font-mono">La différence</p>
          <h2 className="page-title">Pas un consultant classique</h2>
          <p className="page-lead">Ce qui change concrètement quand vous travaillez avec Optmiz.</p>
          <div className="page-grid-2">
            <article className="page-card compare-bad">
              <h3 className="font-display" style={{ margin: 0, fontSize: "1.15rem" }}>
                Consultant classique
              </h3>
              <ul className="compare-list">
                <li>Rapport livré, puis disparition</li>
                <li>Solutions génériques</li>
                <li>Peu de présence terrain</li>
                <li>Coût élevé, ROI flou</li>
              </ul>
            </article>
            <article className="page-card compare-good">
              <h3 className="font-display" style={{ margin: 0, fontSize: "1.15rem" }}>
                Avec Optmiz
              </h3>
              <ul className="compare-list">
                <li>Présence terrain dès le départ</li>
                <li>Solutions adaptées à vos équipes</li>
                <li>Suivi et itération dans le temps</li>
                <li>Résultats visibles rapidement</li>
              </ul>
            </article>
          </div>
          <p className="page-lead" style={{ marginTop: "1.25rem", color: "var(--text)", fontWeight: 600 }}>
            Je ne vends pas des heures de conseil. Je construis des systèmes qui fonctionnent.
          </p>
          <p className="page-lead">
            <Link href="/cas-concrets" className="text-link">
              Voir les cas concrets →
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
