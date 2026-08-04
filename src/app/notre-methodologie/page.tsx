import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { Reveal } from "@/components/Reveal";
import { methodSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "La Méthode OPTMIZ - Comment nous transformons vos processus",
  description:
    "6 étapes concrètes pour transformer votre organisation sans tout bouleverser d'un coup.",
};

const gains = [
  "Des heures récupérées par mois",
  "Moins de charge mentale pour vos équipes",
  "Des milliers d'euros économisés par an",
  "Focus retrouvé sur votre cœur de métier",
  "Processus clairs et documentés",
  "Prêt à grandir sans se complexifier",
];

export default function MethodPage() {
  return (
    <>
      <PageHero
        title={
          <>
            La Méthode <span className="text-brand">Optmiz</span>
          </>
        }
        subtitle="6 étapes concrètes pour transformer votre organisation sans tout bouleverser d'un coup."
        imageSrc="/illustrations/showcase.svg"
        imageAlt="Méthode Optmiz"
      />

      <ProblemSection
        title="Pourquoi vos outils ne suffisent pas ?"
        intro="Ce n'est pas un manque de logiciels. C’est l’accumulation d'inefficacités qui, mises bout à bout, ralentissent toute votre organisation :"
        points={[
          "Des tâches répétitives qui consomment du temps chaque jour",
          "Des outils qui ne communiquent pas entre eux",
          "Des équipes qui compensent avec des solutions manuelles",
          "Une complexité qui augmente à mesure que l'entreprise grandit",
        ]}
        closing="Le coût réel est invisible : perte de temps, fatigue des équipes, décisions ralenties, croissance freinée."
      />

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Notre Méthode</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-muted">
              Nous analysons votre fonctionnement réel pour identifier ce qui peut être simplifié,
              structuré, automatisé.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {methodSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 60}>
                <article className="card-soft h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl font-extrabold text-white">
                    {step.letter}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-muted">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-center text-muted">
              Pour comprendre qui est derrière cette approche,{" "}
              <Link href="/pourquoi-nous" className="font-semibold text-brand hover:underline">
                découvrez le parcours de Quentin
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-darker text-white">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Ce que vous gagnez réellement
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gains.map((gain, index) => (
              <Reveal key={gain} delay={index * 50}>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6">
                  <p className="text-lg font-semibold text-brand">✓ {gain}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-10 max-w-3xl text-center text-white/85">
              Vous reprenez le contrôle, récupérez du temps et retrouvez la sérénité. Envie de voir
              ce que ça donne en pratique ?{" "}
              <Link href="/cas-concrets" className="font-semibold text-brand hover:underline">
                Découvrez nos cas concrets
              </Link>
              .
            </p>
            <div className="mt-8 text-center">
              <CtaButton />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
