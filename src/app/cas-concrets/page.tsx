import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cas Concrets — Résultats réels d'automatisation en PME belges",
  description:
    "Voici ce que nos clients ont réellement gagné en temps, sérénité et efficacité.",
};

const stats = [
  { value: "10h+", label: "récupérées par mois et par collaborateur" },
  { value: "70%", label: "de temps sur les tâches automatisées" },
  { value: "ROI", label: "dès la première optimisation" },
];

export default function CasesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Des résultats concrets, <span className="text-brand">pas des promesses.</span>
          </>
        }
        subtitle="Voici ce que nos clients ont réellement gagné en temps, sérénité et efficacité."
        imageSrc="/illustrations/benefit-3.svg"
        imageAlt="Résultats clients Optmiz"
      />

      <ProblemSection
        title="Ces situations vous parlent ?"
        intro="Ce sont exactement les problèmes que nos clients avaient avant de nous contacter :"
        points={[
          "Des heures perdues chaque semaine sur des tâches manuelles évitables",
          "Des données copiées d'un outil à l'autre, source d'erreurs",
          "Des processus qui reposent sur une seule personne et bloquent tout",
          "Un manque de visibilité sur ce qui se passe réellement dans l'organisation",
        ]}
        closing="Dans chacun des cas ci-dessous, une seule optimisation a suffi à transformer le quotidien d'une équipe."
      />

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">
              5 cas réels, 5 transformations.
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion items={caseStudies} />
          </div>
        </div>
      </section>

      <section className="section bg-brand-dark text-white">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Ce que ça représente concrètement.
            </h2>
            <p className="mt-3 text-center text-white/85">
              Les gains observés chez nos clients, en moyenne.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 70}>
                <div className="rounded-2xl bg-white/10 px-6 py-8 text-center">
                  <p className="text-4xl font-extrabold text-brand">{stat.value}</p>
                  <p className="mt-2 text-white/85">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold">
              Je ne vends pas des heures de conseil. Je construis des systèmes qui fonctionnent.
            </p>
            <p className="mt-4 text-center text-white/85">
              Vous voulez comprendre comment nous y arrivons ?{" "}
              <Link href="/notre-methodologie" className="font-semibold text-brand hover:underline">
                Découvrez la Méthode Optmiz
              </Link>{" "}
              ou{" "}
              <Link href="/tarifs" className="font-semibold text-brand hover:underline">
                consultez nos tarifs
              </Link>
              .
            </p>
            <div className="mt-8 text-center">
              <CtaButton>Je veux les mêmes résultats ›</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
