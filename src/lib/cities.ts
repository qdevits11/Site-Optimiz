export type City = {
  slug: string;
  name: string;
  postalCode: string;
  province: string;
  populationLabel: string;
  demonym: string;
  intro: string;
  localContext: string;
  whyLocal: string;
  industries: string[];
  neighborhoods: string[];
  nearbySlugs: string[];
};

export const cities: City[] = [
  {
    slug: "soignies",
    name: "Soignies",
    postalCode: "7060",
    province: "Hainaut",
    populationLabel: "± 27 000",
    demonym: "sonégiens",
    intro:
      "Basé à Soignies, Optmiz accompagne les PME locales qui perdent du temps sur des tâches manuelles, des Excel fragiles ou des outils qui ne se parlent pas. Un premier rendez-vous se fait souvent chez vous, sur votre lieu de travail.",
    localContext:
      "Soignies concentre artisans, commerces, PME industrielles et services de proximité. Dans un tissu où tout le monde se connaît, ce qui freine souvent la croissance n’est pas le manque de clients : c’est l’organisation interne — relances, pointages, facturation, reporting.",
    whyLocal:
      "Travailler avec une équipe basée à Soignies, c’est pouvoir se voir rapidement, observer vos process sur le terrain et avancer sans jargon. La proximité change la qualité du diagnostic.",
    industries: ["Artisanat & construction", "Services B2B", "Commerce de proximité", "Industrie légère"],
    neighborhoods: ["centre-ville", "Neufvilles", "Casteau", "Naast"],
    nearbySlugs: ["braine-le-comte", "enghien", "mons", "la-louviere"],
  },
  {
    slug: "braine-le-comte",
    name: "Braine-le-Comte",
    postalCode: "7090",
    province: "Hainaut",
    populationLabel: "± 22 000",
    demonym: "brainois",
    intro:
      "À Braine-le-Comte, Optmiz aide les PME à automatiser les process répétitifs et à digitaliser ce qui bloque encore sur papier ou Excel. Premier échange gratuit, sur place si vous le souhaitez.",
    localContext:
      "Entre Bruxelles et Mons, Braine-le-Comte attire des entreprises en croissance qui jonglent déjà avec plusieurs outils. Le goulot d’étranglement arrive souvent quand le volume augmente : double saisie, relances oubliées, suivi client dispersé.",
    whyLocal:
      "Depuis Soignies, nous nous déplaçons facilement à Braine-le-Comte pour voir votre organisation réelle — pas seulement ce qui est décrit dans un appel Teams.",
    industries: ["Logistique & distribution", "Services aux entreprises", "Commerce", "Professions libérales"],
    neighborhoods: ["centre", "Henripont", "Petit-Roeulx", "Steenkerque"],
    nearbySlugs: ["soignies", "enghien", "nivelles", "la-louviere"],
  },
  {
    slug: "mons",
    name: "Mons",
    postalCode: "7000",
    province: "Hainaut",
    populationLabel: "± 95 000",
    demonym: "montois",
    intro:
      "Optmiz intervient à Mons pour automatiser et digitaliser les processus des PME : relances, pointages, facturation, sites utiles et systèmes de gestion. Diagnostic gratuit, devis fixe.",
    localContext:
      "Capitale du Hainaut, Mons regroupe un tissu dense : indépendants du centre, PME industrielles, acteurs du numérique et du tourisme d’affaires. Dans cet environnement concurrentiel, gagner du temps opérationnel devient un avantage réel.",
    whyLocal:
      "Nous venons chez vous à Mons pour comprendre votre métier sur le terrain, avant de proposer quoi que ce soit. Pas de solution toute faite : un devis cadré après observation.",
    industries: ["Industrie & sous-traitance", "Horeca & services", "Santé & professions libérales", "Tech & services numériques"],
    neighborhoods: ["centre historique", "Hyon", "Jemappes", "Cuesmes", "Ghlin"],
    nearbySlugs: ["soignies", "la-louviere", "binche", "ath"],
  },
  {
    slug: "charleroi",
    name: "Charleroi",
    postalCode: "6000",
    province: "Hainaut",
    populationLabel: "± 202 000",
    demonym: "carolos",
    intro:
      "À Charleroi, Optmiz aide les PME à sortir des process manuels : automatisation des tâches répétitives, digitalisation des flux et outils connectés. Premier rendez-vous possible sur place.",
    localContext:
      "Première ville de Wallonie par sa population, Charleroi concentre artisans, commerçants, PME industrielles et services. Dans une agglomération aussi vaste, l’efficacité interne fait souvent la différence entre survivre et grandir.",
    whyLocal:
      "Nous nous déplaçons dans la région de Charleroi pour voir vos équipes travailler. C’est le seul moyen de proposer une automatisation qui sera vraiment adoptée.",
    industries: ["Industrie & métallurgie", "Construction & rénovation", "Commerce & garage", "Services B2B"],
    neighborhoods: ["Ville Haute", "Ville Basse", "Gilly", "Marcinelle", "Jumet", "Couillet"],
    nearbySlugs: ["la-louviere", "binche", "namur", "nivelles"],
  },
  {
    slug: "namur",
    name: "Namur",
    postalCode: "5000",
    province: "Namur",
    populationLabel: "± 110 000",
    demonym: "namurois",
    intro:
      "Optmiz accompagne les PME namuroises dans l’automatisation et la digitalisation de leurs processus. Échange gratuit, déplacement sur site, prix fixe avant démarrage.",
    localContext:
      "Capitale wallonne, Namur mêle administrations, professions libérales, commerces et PME de services. Beaucoup d’équipes compensent encore avec Excel et des mails — jusqu’au jour où ça casse.",
    whyLocal:
      "Nous intervenons à Namur et dans sa périphérie pour un diagnostic terrain. L’objectif : des gains visibles rapidement, sans projeter une usine à gaz.",
    industries: ["Services & conseil", "Professions libérales", "Commerce", "BTP & artisans"],
    neighborhoods: ["centre", "Jambes", "Saint-Servais", "Flawinne", "Bouge"],
    nearbySlugs: ["charleroi", "nivelles", "gembloux"],
  },
  {
    slug: "la-louviere",
    name: "La Louvière",
    postalCode: "7100",
    province: "Hainaut",
    populationLabel: "± 80 000",
    demonym: "louviérois",
    intro:
      "À La Louvière, Optmiz digitalise et automatise les process PME qui font perdre du temps chaque semaine. Premier échange gratuit, sur votre lieu de travail si vous le préférez.",
    localContext:
      "Au cœur du Centre, La Louvière concentre un tissu industriel et commercial solide. Les entreprises qui grandissent se heurtent souvent aux mêmes freins : saisies manuelles, outils isolés, suivi commercial dispersé.",
    whyLocal:
      "Depuis Soignies, La Louvière est à deux pas. On vient observer vos flux réels avant de chiffrer quoi que ce soit — c’est la base du devis fixe.",
    industries: ["Industrie & logistique", "Commerce", "Services aux entreprises", "Construction"],
    neighborhoods: ["centre", "Haine-Saint-Pierre", "Saint-Vaast", "Trivières", "Strépy-Bracquegnies"],
    nearbySlugs: ["soignies", "mons", "binche", "charleroi"],
  },
  {
    slug: "nivelles",
    name: "Nivelles",
    postalCode: "1400",
    province: "Brabant wallon",
    populationLabel: "± 29 000",
    demonym: "nivellois",
    intro:
      "Optmiz intervient à Nivelles pour automatiser les tâches répétitives et structurer les outils des PME du Brabant wallon. Diagnostic gratuit, résultats concrets.",
    localContext:
      "Nivelles attire des PME dynamiques, souvent proches de Bruxelles, avec des exigences élevées sur la réactivité. Quand le volume augmente, les process « bricolés » deviennent un frein coûteux.",
    whyLocal:
      "Nous nous déplaçons à Nivelles pour un premier rendez-vous terrain. Vous repartez avec une vision claire : quoi automatiser, dans quel ordre, pour quel budget.",
    industries: ["Services B2B", "Tech & digital", "Commerce", "Professions libérales"],
    neighborhoods: ["centre", "Baulers", "Thines", "Monstreux"],
    nearbySlugs: ["braine-le-comte", "bruxelles", "namur", "charleroi"],
  },
  {
    slug: "enghien",
    name: "Enghien",
    postalCode: "7850",
    province: "Hainaut",
    populationLabel: "± 14 000",
    demonym: "enghiennois",
    intro:
      "À Enghien, Optmiz aide les PME et indépendants à digitaliser leurs process et automatiser ce qui se répète. Premier rendez-vous gratuit, chez vous.",
    localContext:
      "Entre Soignies et Bruxelles, Enghien accueille commerces, artisans et petites structures qui grandissent sans toujours formaliser leurs outils. L’Excel « qui marche » finit souvent par coûter cher.",
    whyLocal:
      "Basés à Soignies, nous sommes rapidement sur place à Enghien pour un diagnostic sans blabla — et un devis fixe si un projet a du sens.",
    industries: ["Commerce de proximité", "Artisanat", "Services", "Horeca"],
    neighborhoods: ["centre", "Petit-Enghien", "Marcq"],
    nearbySlugs: ["soignies", "braine-le-comte", "ath", "bruxelles"],
  },
  {
    slug: "ath",
    name: "Ath",
    postalCode: "7800",
    province: "Hainaut",
    populationLabel: "± 29 000",
    demonym: "athois",
    intro:
      "Optmiz accompagne les PME d’Ath et de la région dans l’automatisation et la digitalisation de leurs processus. Déplacement sur site, prix fixe, sans engagement au premier échange.",
    localContext:
      "Ath combine un centre commercial vivant et un tissu de PME périurbaines. Beaucoup d’équipes perdent encore des heures sur des tâches administratives qui pourraient tourner seules.",
    whyLocal:
      "Nous venons à Ath pour voir votre réalité terrain. C’est la seule base sérieuse pour proposer une automatisation utile — pas une slide deck.",
    industries: ["Agroalimentaire & commerce", "Artisanat", "Services", "Industrie légère"],
    neighborhoods: ["centre", "Maffle", "Ghislenghien", "Lanquesaint"],
    nearbySlugs: ["mons", "enghien", "tournai", "soignies"],
  },
  {
    slug: "binche",
    name: "Binche",
    postalCode: "7130",
    province: "Hainaut",
    populationLabel: "± 33 000",
    demonym: "binchois",
    intro:
      "À Binche, Optmiz digitalise et automatise les process PME qui freinent vos équipes. Premier échange gratuit, sur place ou à distance.",
    localContext:
      "Binche et ses environs regroupent commerces, artisans et PME industrielles. Quand l’activité tourne, l’admin suit rarement au même rythme — relances, pointages, factures.",
    whyLocal:
      "Proches de La Louvière et de Soignies, nous intervenons facilement à Binche pour un diagnostic terrain avant tout devis.",
    industries: ["Commerce", "Construction", "Industrie", "Services"],
    neighborhoods: ["centre", "Bray", "Waudrez", "Péronnes-lez-Binche"],
    nearbySlugs: ["la-louviere", "mons", "charleroi", "soignies"],
  },
  {
    slug: "tournai",
    name: "Tournai",
    postalCode: "7500",
    province: "Hainaut",
    populationLabel: "± 69 000",
    demonym: "tournaisiens",
    intro:
      "Optmiz intervient à Tournai pour automatiser les tâches répétitives et structurer les outils des PME de Wallonie picarde. Diagnostic gratuit, devis fixe.",
    localContext:
      "Tournai, ville frontalière dynamique, concentre commerce, logistique, industrie et services. Les PME qui grandissent vers la France ou le reste de la Belgique ont besoin de process fiables — pas de bricolage.",
    whyLocal:
      "Nous nous déplaçons à Tournai pour comprendre votre organisation réelle avant de proposer une solution. Transparence sur le prix dès le départ.",
    industries: ["Logistique & distribution", "Commerce", "Industrie", "Services B2B"],
    neighborhoods: ["centre", "Froyennes", "Kain", "Templeuve", "Blandain"],
    nearbySlugs: ["ath", "mons", "bruxelles"],
  },
  {
    slug: "bruxelles",
    name: "Bruxelles",
    postalCode: "1000",
    province: "Bruxelles-Capitale",
    populationLabel: "± 1,2 M",
    demonym: "bruxellois",
    intro:
      "Optmiz accompagne aussi des PME bruxelloises : automatisation de process, digitalisation et systèmes de gestion. Premier échange gratuit, sur site ou à distance.",
    localContext:
      "À Bruxelles, la pression sur le temps et la qualité de service est forte. Les équipes compensent souvent avec des outils multiples — jusqu’à ce que les erreurs et les doublons coûtent trop cher.",
    whyLocal:
      "Nous intervenons à Bruxelles pour un diagnostic clair : quoi automatiser en premier, avec quels outils, pour quel budget fixe.",
    industries: ["Services & conseil", "Tech", "Commerce & retail", "Professions libérales"],
    neighborhoods: ["centre", "Ixelles", "Schaerbeek", "Anderlecht", "Uccle"],
    nearbySlugs: ["nivelles", "braine-le-comte", "enghien"],
  },
  {
    slug: "gembloux",
    name: "Gembloux",
    postalCode: "5030",
    province: "Namur",
    populationLabel: "± 26 000",
    demonym: "gembloutois",
    intro:
      "À Gembloux, Optmiz aide les PME à automatiser leurs process et digitaliser ce qui freine encore l’organisation. Premier rendez-vous gratuit, chez vous.",
    localContext:
      "Entre Namur et Bruxelles, Gembloux concentre un tissu d’entreprises liées à l’agroalimentaire, aux services et à l’innovation. La croissance demande des outils qui suivent — sans complexité inutile.",
    whyLocal:
      "Nous venons sur place à Gembloux pour observer vos flux avant de chiffrer. C’est la condition d’un devis fixe crédible.",
    industries: ["Agroalimentaire", "Services", "Tech & innovation", "Commerce"],
    neighborhoods: ["centre", "Sauvenière", "Lonzée", "Grand-Manil"],
    nearbySlugs: ["namur", "nivelles", "charleroi"],
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getNearbyCities(city: City): City[] {
  return city.nearbySlugs
    .map((slug) => getCityBySlug(slug))
    .filter((entry): entry is City => Boolean(entry));
}

export function cityPath(slug: string) {
  return `/zones/${slug}`;
}
