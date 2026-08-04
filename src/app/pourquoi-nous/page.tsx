import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Pourquoi Optmiz ? 15 ans d'expérience terrain en digitalisation PME",
  description:
    "15 ans sur le terrain. Des résultats concrets. Une méthode qui fonctionne.",
};

const milestones = [
  {
    title: "Début de carrière",
    role: "Développeur → Directeur informatique",
    text: "De développeur à Manager puis Directeur informatique dans une société de logements sociaux à Bruxelles. J'y ai appris à construire des systèmes qui tiennent dans la durée, avec des équipes qui ne sont pas des experts tech.",
  },
  {
    title: "Expérience Industrielle",
    role: "Leader IT - Environnements exigeants",
    text: "Leader informatique pour un partenaire industriel travaillant avec Google, GSK, Inovyn et UCB. Des processus complexes, des volumes massifs, des exigences élevées. J'ai appris à livrer des solutions robustes sous pression.",
  },
  {
    title: "Expérience Produit",
    role: "Digital Manager - Produits sur mesure",
    text: "Digital Manager dans une entreprise de production et commercialisation de produits sur mesure. De la présence web jusqu'à l'atelier : configurateur produit, gestion client, facturation, et mise en production pilotée par scans et tablettes.",
  },
  {
    title: "Aujourd'hui",
    role: "Fondateur d'Optmiz",
    text: "J'accompagne les PME dans la simplification et l'automatisation de leurs processus. Avec une méthode structurée, un accompagnement humain concret, et un seul objectif : des résultats visibles rapidement.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Vous méritez mieux qu&apos;un consultant de passage.
          </>
        }
        subtitle="15 ans sur le terrain. Des résultats concrets. Une méthode qui fonctionne."
        imageSrc="/illustrations/coworking.svg"
        imageAlt="Accompagnement Optmiz"
      />

      <ProblemSection
        title="Ce que vivent la plupart des PME."
        intro="Vous avez déjà peut-être essayé de vous faire accompagner. Ou vous gérez tout en interne. Dans les deux cas, les mêmes blocages reviennent :"
        points={[
          "Des consultants qui livrent des rapports… et disparaissent",
          "Des solutions trop complexes, jamais vraiment adoptées",
          "Pas de suivi, pas d'adaptation quand la réalité change",
          "Un coût difficile à justifier face aux résultats obtenus",
        ]}
        closing="Résultat : vous restez avec les mêmes problèmes, en plus d'un outil supplémentaire à gérer."
      />

      <section className="section bg-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <Image
              src="/quentin.jpg"
              alt="Quentin Devits, fondateur d'Optmiz"
              width={280}
              height={280}
              className="mx-auto rounded-2xl object-cover shadow-xl"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Fondateur d&apos;Optmiz
            </p>
            <h2 className="mt-2 text-3xl font-bold text-ink">Quentin Devits</h2>
            <p className="mt-4 text-muted">
              J&apos;ai passé 15 ans à construire, optimiser et transformer des systèmes dans des
              environnements très différents passant du logement social à l&apos;industrie
              internationale, mais aussi par la production de produits haut de gamme sur mesure
              attaquant le marché mondial.
            </p>
            <p className="mt-4 text-muted">
              Ce que j&apos;ai appris : chaque organisation a des leviers d&apos;amélioration
              invisibles. Et les identifier demande du temps, de l&apos;écoute, et une présence
              terrain avec les équipes.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-brand-soft p-4 text-center">
                <p className="text-3xl font-extrabold text-brand">13</p>
                <p className="mt-1 text-xs text-muted">ans d&apos;expérience terrain</p>
              </div>
              <div className="rounded-2xl bg-brand-soft p-4 text-center">
                <p className="text-3xl font-extrabold text-brand">5</p>
                <p className="mt-1 text-xs text-muted">secteurs d&apos;activité</p>
              </div>
              <div className="rounded-2xl bg-brand-soft p-4 text-center">
                <p className="text-3xl font-extrabold text-brand">100%</p>
                <p className="mt-1 text-xs text-muted">focalisé sur les PME</p>
              </div>
            </div>
            <div className="mt-8">
              <CtaButton />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-soft">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">
              Un parcours construit sur le terrain.
            </h2>
            <p className="mt-3 text-center text-muted">
              Pas dans les livres. Dans des entreprises réelles, face à des problèmes réels.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {milestones.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="card-soft h-full">
                  <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 font-semibold text-brand">{item.role}</p>
                  <p className="mt-3 text-sm text-muted">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">
              Pas un consultant classique.
            </h2>
            <p className="mt-3 text-center text-muted">
              Ce qui change concrètement quand vous travaillez avec Optmiz.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <article className="rounded-2xl border border-problem/20 bg-problem/5 p-6">
                <h3 className="text-xl font-bold text-problem">Consultant classique</h3>
                <ul className="mt-4 space-y-2 text-muted">
                  <li>❌ Un rapport livré, puis disparu</li>
                  <li>❌ Solutions génériques non adaptées</li>
                  <li>❌ Peu de présence terrain</li>
                  <li>❌ Coût élevé, ROI flou</li>
                </ul>
              </article>
            </Reveal>
            <Reveal delay={80}>
              <article className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
                <h3 className="text-xl font-bold text-brand-darker">Avec la Méthode Optmiz</h3>
                <ul className="mt-4 space-y-2 text-muted">
                  <li>✅ Présence terrain dès le départ</li>
                  <li>✅ Solutions sur mesure, adaptées</li>
                  <li>✅ Suivi et itération dans le temps</li>
                  <li>✅ Résultats visibles rapidement</li>
                </ul>
              </article>
            </Reveal>
          </div>
          <Reveal>
            <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold text-ink">
              Je ne vends pas des heures de conseil. Je construis des systèmes qui fonctionnent.
            </p>
            <p className="mt-4 text-center text-muted">
              Vous voulez voir des exemples concrets ?{" "}
              <Link href="/cas-concrets" className="font-semibold text-brand hover:underline">
                Consultez nos cas concrets
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
