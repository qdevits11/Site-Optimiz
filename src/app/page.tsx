import Image from "next/image";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { ProblemSection } from "@/components/ProblemSection";
import { Reveal } from "@/components/Reveal";
import { caseStudies, defaultProblem } from "@/lib/content";

const benefits = [
  {
    title: "Une organisation plus lisible",
    image: "/illustrations/benefit-1.svg",
  },
  {
    title: "Des décisions plus rapides",
    image: "/illustrations/benefit-2.svg",
  },
  {
    title: "Des équipes recentrées sur l'essentiel",
    image: "/illustrations/benefit-3.svg",
  },
  {
    title: "Une capacité à évoluer sans complexité supplémentaire",
    image: "/illustrations/benefit-4.svg",
  },
];

const steps = [
  {
    title: "Premier contact & diagnostic gratuit",
    text: "Un premier échange pour comprendre vos besoins et identifier vos principaux leviers d’optimisation.",
  },
  {
    title: "Audit personnalisé",
    text: "Nous analysons vos processus actuels pour vous proposer des pistes d’amélioration concrètes et adaptées à vos besoins.",
  },
  {
    title: "Proposition et mise en œuvre",
    text: "Ensemble, nous définissons la meilleure stratégie et commençons à digitaliser et automatiser vos tâches.",
  },
  {
    title: "Amélioration continue",
    text: "Nous restons à vos côtés pour ajuster, optimiser et accompagner la croissance de votre entreprise à chaque moments importants.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="section-tight bg-brand-soft">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h1 className="text-4xl font-extrabold leading-tight text-ink md:text-5xl lg:text-[3.4rem]">
              Trop de tâches manuelles et de perte de temps ?
            </h1>
            <p className="mt-5 text-lg italic text-muted md:text-xl">
              Nous identifions ce qui vous ralentit, et nous le transformons en systèmes simples,
              fluides et efficaces.
            </p>
            <div className="mt-8">
              <CtaButton />
              <p className="mt-3 text-sm text-muted">Sans engagement, réponse sous 24h</p>
            </div>
          </Reveal>
          <Reveal delay={140} className="justify-self-center">
            <Image
              src="/illustrations/hero-gears.svg"
              alt="Processus à optimiser"
              width={520}
              height={420}
              priority
              className="float-soft h-auto w-full max-w-[480px]"
            />
          </Reveal>
        </div>
      </section>

      <ProblemSection {...defaultProblem} />

      <section className="section bg-brand-darker text-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Image
              src="/illustrations/coworking.svg"
              alt="Analyse systémique"
              width={480}
              height={380}
              className="mx-auto h-auto w-full max-w-[440px]"
            />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Le problème n&apos;est pas opérationnel.
              <br />
              <span className="text-brand">Il est systémique.</span>
            </h2>
            <p className="mt-5 text-white/90">
              Et un système peut être simplifié, structuré et optimisé.
              <br />
              <strong className="text-white">C’est exactement là que nous intervenons.</strong>
            </p>
            <p className="mt-4 text-white/90">
              Nous analysons votre fonctionnement réel pour identifier ce qui peut être :
            </p>
            <ul className="mt-4 space-y-2 text-brand">
              <li>• simplifié</li>
              <li>• structuré</li>
              <li>• automatisé intelligemment</li>
            </ul>
            <p className="mt-5 text-white/90">
              Non pas pour ajouter des outils mais pour enlever de la complexité.
            </p>
            <div className="mt-8">
              <CtaButton />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">
              Ce que cela change concrètement
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 80}>
                <article className="card-soft h-full text-center">
                  <Image
                    src={benefit.image}
                    alt=""
                    width={220}
                    height={160}
                    className="mx-auto h-36 w-auto object-contain"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-ink">{benefit.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-10 max-w-3xl text-center text-muted">
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

      <section className="section bg-brand-dark text-white">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold md:text-4xl">Votre parcours avec Optmiz</h2>
            <p className="mt-3 text-center text-white/85">Comment nous travaillons ensemble</p>
            <p className="mt-8 text-center text-2xl font-semibold">
              Un cycle en 4 étapes pour optimiser vos processus métier
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 70}>
                <article className="h-full rounded-2xl bg-white p-5 text-ink shadow-lg">
                  <div className="text-3xl font-extrabold text-brand">{index + 1}</div>
                  <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm text-muted">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-10 max-w-3xl text-center text-white/90">
              Un périmètre clair. Un prix fixe. Aucun imprévu. Vous voulez comprendre comment nous
              travaillons ?{" "}
              <Link href="/notre-methodologie" className="font-semibold text-brand hover:underline">
                Découvrez notre méthode Optmiz
              </Link>
            </p>
            <div className="mt-8 text-center">
              <CtaButton />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              Un accompagnement qui dure dans le temps.
            </h2>
            <p className="mt-5 text-muted">
              Une fois les fondations posées, le travail ne s&apos;arrête pas. Nous accompagnons
              l&apos;évolution du système dans le temps pour maintenir sa cohérence, sa performance
              et sa capacité à s&apos;adapter à vos prochaines étapes de croissance.
            </p>
            <div className="mt-8 space-y-5">
              <div>
                <h3 className="font-semibold text-ink">📅 Un système fiable</h3>
                <p className="mt-1 text-sm text-muted">
                  Nous assurons la stabilité et le bon fonctionnement des solutions mises en place.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-ink">🚀 Un système évolutif</h3>
                <p className="mt-1 text-sm text-muted">
                  Votre entreprise change, votre système aussi. Nous l’adaptons en continu à vos
                  enjeux et priorités.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-ink">📊 Un pilotage structuré</h3>
                <p className="mt-1 text-sm text-muted">
                  Un point régulier permet de faire le suivi, d’identifier de nouvelles opportunités
                  et d’ajuster les actions.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <CtaButton />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Image
              src="/illustrations/showcase.svg"
              alt="Accompagnement continu"
              width={520}
              height={420}
              className="mx-auto h-auto w-full max-w-[460px]"
            />
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-dark">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
              Ils nous ont fait confiance.
            </h2>
            <p className="mt-3 text-center text-2xl font-semibold text-brand">
              Voici ce que ça a changé.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-white/85">
              Des résultats réels, mesurables, obtenus dans des sociétés comme la vôtre.
            </p>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion items={caseStudies} />
          </div>
          <div className="mt-10 text-center">
            <CtaButton />
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
