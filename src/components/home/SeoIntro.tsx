import Link from "next/link";

export function SeoIntro() {
  return (
    <section className="section-block section-tight-block" id="a-propos-optmiz">
      <div className="container-site">
        <p className="eyebrow font-mono">En résumé</p>
        <h2 className="font-display">Simplification des processus pour PME en Wallonie et à Bruxelles</h2>
        <div className="seo-intro-body" style={{ marginTop: "0.85rem" }}>
          <p>
            Optmiz est une société de simplification et d’optimisation des processus pour PME en
            Wallonie et à Bruxelles. L’approche part toujours du terrain : comment l’entreprise
            fonctionne réellement, ce qui fait perdre du temps, ce qui crée de la complexité. Pas
            d’un outil à vendre.
          </p>
          <p>
            Concrètement, cela veut dire observer, simplifier, puis connecter les outils existants
            et automatiser les tâches sans valeur ajoutée. Relances clients envoyées en quelques
            minutes, pointages RH sans ressaisie, calcul de 1 874 notifications en une
            demi-journée, feuilles de temps disponibles en temps réel, ou demandes de prix
            structurées via un configurateur connecté. Un nouvel outil n’est construit que
            lorsqu’il apporte réellement de la valeur. Chaque projet démarre par une visite
            diagnostic gratuite, se cadre via une analyse terrain payante, puis se réalise à prix
            fixe.
          </p>
        </div>
        <div className="seo-intro-links">
          <Link href="/services" className="text-link">
            Voir les solutions →
          </Link>
          <Link href="/notre-methodologie" className="text-link">
            Découvrir la méthode Optmiz →
          </Link>
          <Link href="/cas-concrets" className="text-link">
            Voir des cas concrets →
          </Link>
          <Link href="/ressources" className="text-link">
            Lire nos guides →
          </Link>
          <Link href="/tarifs" className="text-link">
            Comprendre le prix fixe →
          </Link>
        </div>
      </div>
    </section>
  );
}
