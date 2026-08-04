import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CtaButton } from "@/components/CtaButton";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { ProblemSection } from "@/components/ProblemSection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Tarifs - Prix fixe, défini ensemble. Zéro surprise",
  description:
    "Chaque projet est cadré à l'avance. Chaque forfait est transparent. Vous savez exactement ce que vous payez et ce que vous obtenez.",
};

const pricingSteps = [
  {
    icon: "🎯",
    title: "Diagnostic rapide",
    badge: "Gratuit",
    text: "Un premier échange pour comprendre votre contexte et valider qu'Optmiz peut vous apporter de la valeur. Sans engagement de votre côté.",
  },
  {
    icon: "🔍",
    title: "Audit terrain & cartographie",
    badge: "Payant",
    text: "Nous nous rendons sur le terrain avec vos équipes pour observer ce qu'elles font réellement, pas ce qui est écrit dans les procédures. Des sessions dédiées avec les collaborateurs permettent de comprendre les flux réels, les points de friction et les habitudes cachées.",
    extra:
      "À l'issue de l'audit, vous disposez d'une cartographie complète et précise de vos processus, une base solide pour prendre les bonnes décisions, que vous alliez plus loin ou non.",
    include:
      "Inclut : sessions terrain avec vos équipes, analyse des outils existants, identification des écarts entre processus théoriques et réels, cartographie livrée en fin de mission.",
  },
  {
    icon: "🔒",
    title: "Devis fixe sur base de l'audit",
    text: "Sur base de l'audit, le projet est cadré et chiffré précisément. Le prix est fixé avant de commencer, détaillé dans un devis que vous validez. Pas de facturation à l'heure, pas de surprises en fin de mois.",
  },
  {
    icon: "🚚",
    title: "Réalisation & livraison",
    text: "On réalise exactement ce qui a été convenu. Si une évolution est souhaitée en cours de route, elle fait l'objet d'une réévaluation transparente, soumise à votre validation avant toute action supplémentaire.",
  },
];

const zenPlans = [
  {
    name: "Zen Basique",
    quote: "Vos systèmes tournent. Vous êtes tranquille.",
    features: [
      "Maintenance des serveurs et infrastructure",
      "Gestion des abonnements et outils en place",
      "Maintien en service du ou des projets actifs",
      "Interventions correctives si nécessaire",
    ],
  },
  {
    name: "Zen Standard",
    quote: "Nous maintenons votre projet et vous accompagnons.",
    features: [
      "Tout le contenu Basique",
      "Mises à jour et évolutions de vos projets",
      "Visio mensuelle de suivi préparée",
      "Priorisation des améliorations en cours",
      "Votre organisation progresse chaque mois",
    ],
  },
  {
    name: "Zen Premium",
    quote: "Présence physique mensuelle et amélioration continue.",
    features: [
      "Tout le contenu Standard",
      "1 jour physique chez vous chaque mois",
      "Analyse terrain de vos processus",
      "Suivi stratégique et identification d'opportunités",
      "ROI maximal, accompagnement le plus complet",
    ],
  },
];

const faqs = [
  {
    q: "Le diagnostic est-il vraiment gratuit ?",
    a: "Oui, le premier échange est entièrement gratuit et sans engagement. Il nous permet de comprendre votre organisation et d'identifier ensemble les leviers les plus impactants. Si vous décidez de ne pas aller plus loin, vous repartez quand même avec des pistes concrètes. L'audit complet en revanche est payant.",
  },
  {
    q: "Quelle est la différence entre le diagnostic et l'audit ?",
    a: "Le diagnostic rapide est un premier échange gratuit pour comprendre votre contexte. L'audit est une mission terrain approfondie et payante où nous rencontrons vos équipes, observons vos processus réels et produisons une cartographie complète. C'est l'audit qui permet de chiffrer un projet avec précision.",
  },
  {
    q: "Pourquoi l'audit est-il payant ?",
    a: "L'audit mobilise du temps terrain significatif : sessions avec vos équipes, analyse des outils, observation des flux réels, rédaction de la cartographie. C'est un travail de fond qui a de la valeur en lui-même. Même si vous décidez de ne pas aller plus loin, vous repartez avec une vision claire et documentée de vos processus.",
  },
  {
    q: "Comment est calculé le prix d'un projet ?",
    a: "Le périmètre précis est défini sur base de l'audit. Le prix reflète le nombre de jours nécessaires pour réaliser ce périmètre, à un taux journalier fixe. Tout est détaillé dans le devis avant le démarrage. Aucune surprise possible.",
  },
  {
    q: "Que se passe-t-il si je veux ajouter quelque chose en cours de projet ?",
    a: 'Toute évolution de périmètre fait l\'objet d\'une réévaluation formelle. Vous recevez un nouveau devis pour les éléments ajoutés, que vous validez avant qu\'on engage le travail supplémentaire. Pas de travail "gratuit" qui réapparaît en facture surprise.',
  },
  {
    q: "Faut-il prendre un forfait Zen après un projet ?",
    a: "Non, c'est entièrement optionnel. Certains clients préfèrent gérer eux-mêmes après la livraison. Les forfaits Zen sont là pour ceux qui veulent que la maintenance soit faite par Optmiz, continuer à progresser et être accompagnés dans la durée mais ce n'est pas une obligation.",
  },
  {
    q: "Peut-on changer de forfait Zen en cours de route ?",
    a: "Oui. Les forfaits sont flexibles et s'adaptent à vos besoins du moment. Si votre activité évolue et que vous avez besoin de plus ou moins d'accompagnement, on ajuste ensemble.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Un prix fixe, défini ensemble.
            <br />
            <span className="text-brand">Zéro mauvaise surprise.</span>
          </>
        }
        subtitle="Chaque projet est cadré à l'avance. Chaque forfait est transparent. Vous savez exactement ce que vous payez et ce que vous obtenez."
        imageSrc="/illustrations/benefit-2.svg"
        imageAlt="Tarification transparente Optmiz"
      />

      <ProblemSection
        title="Ce que vous évitez avec nous."
        intro="Les mauvaises expériences avec des prestataires IT, on les connaît :"
        points={[
          "Un devis initial attractif qui gonfle au fil des mois",
          "Des heures facturées sans résultat visible",
          "Un projet livré qui ne correspond pas à ce qui avait été discuté",
          "Impossible de savoir où en est le budget en temps réel",
        ]}
        closing="Chez Optmiz, le prix est fixé avant que la première ligne de code soit écrite. Point."
      />

      <section className="section bg-brand-dark text-white">
        <div className="container-site max-w-3xl">
          <Reveal>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Comment arrive-t-on à un projet chiffré ?
            </h2>
            <p className="mt-3 text-center text-white/85">
              Trois étapes dans l&apos;ordre, chacune avec son rôle. Pas de raccourci.
            </p>
          </Reveal>
          <div className="mt-10 space-y-4">
            {pricingSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 60}>
                <article className="rounded-2xl bg-white/10 p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-2xl">{step.icon}</span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    {step.badge ? (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink">
                        {step.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-white/90">{step.text}</p>
                  {"extra" in step && step.extra ? (
                    <p className="mt-3 text-white/90">{step.extra}</p>
                  ) : null}
                  {"include" in step && step.include ? (
                    <p className="mt-4 rounded-xl bg-brand-darker/40 px-4 py-3 text-sm text-white/90">
                      📍 {step.include}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 text-center text-white/90">
              🔄 Si le scope change, le prix aussi. L&apos;audit est l&apos;investissement qui rend
              tout le reste fiable.
            </p>
            <p className="mt-3 text-center font-semibold text-brand">
              Pas d&apos;heures cachées. Pas de dépassement. Pas de mauvaise surprise.
            </p>
            <div className="mt-8 text-center">
              <CtaButton>Discuter de mon projet ›</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">Forfaits Zen</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-muted">
              Pour maintenir, faire évoluer et accompagner votre organisation dans la durée. Une
              fois votre projet mis en place, vos systèmes ont besoin d&apos;être maintenus, ajustés
              et améliorés en continu.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {zenPlans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 70}>
                <article className="card-soft flex h-full flex-col border border-brand/15">
                  <h3 className="text-2xl font-bold text-ink">{plan.name}</h3>
                  <p className="mt-3 text-sm italic text-brand">&ldquo;{plan.quote}&rdquo;</p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm text-muted">
                    {plan.features.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
              Le tarif est défini ensemble en fonction de vos projets actifs et de votre niveau
              d&apos;accompagnement souhaité.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-soft">
        <div className="container-site max-w-3xl">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-ink md:text-4xl">
              Questions fréquentes
            </h2>
          </Reveal>
          <div className="mt-10">
            <FaqList faqs={faqs} />
          </div>
          <Reveal>
            <p className="mt-10 text-center text-muted">
              Vous voulez d&apos;abord voir ce qu&apos;on a accompli ?{" "}
              <Link href="/cas-concrets" className="font-semibold text-brand hover:underline">
                Consultez nos cas concrets
              </Link>{" "}
              ou{" "}
              <Link href="/pourquoi-nous" className="font-semibold text-brand hover:underline">
                découvrez qui est derrière Optmiz
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
