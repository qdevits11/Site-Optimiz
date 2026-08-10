import Link from "next/link";

export function SeoIntro() {
  return (
    <section className="section-block section-tight-block" id="a-propos-optmiz">
      <div className="container-site">
        <p className="eyebrow font-mono">En résumé</p>
        <h2 className="font-display">Automatisation et digitalisation pour PME en Wallonie</h2>
        <div className="seo-intro-body" style={{ marginTop: "0.85rem" }}>
          <p>
            Optmiz accompagne les PME belges, en particulier en Wallonie (Hainaut, Bruxelles,
            Nivelles), pour automatiser leurs tâches répétitives et digitaliser leurs processus
            métier. L’approche part toujours du terrain : les flux réels, les outils déjà en place,
            les habitudes de vos équipes, pas d’une stack technique théorique.
          </p>
          <p>
            Concrètement, cela veut dire des relances clients envoyées automatiquement, des
            pointages RH centralisés sans ressaisie, des calculs de masse générés en quelques
            heures au lieu de plusieurs semaines, ou des feuilles de temps digitalisées sur le
            terrain. Chaque projet démarre par un diagnostic gratuit, se cadre via un audit terrain,
            puis se réalise à prix fixe, sans facturation à l’heure.
          </p>
        </div>
        <div className="seo-intro-links">
          <Link href="/notre-methodologie" className="text-link">
            Découvrir la méthode Optmiz →
          </Link>
          <Link href="/cas-concrets" className="text-link">
            Voir des cas concrets chiffrés →
          </Link>
          <Link href="/ressources" className="text-link">
            Lire nos guides sur l’automatisation →
          </Link>
          <Link href="/tarifs" className="text-link">
            Comprendre le prix fixe →
          </Link>
        </div>
      </div>
    </section>
  );
}
