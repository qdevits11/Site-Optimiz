export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  sections: ArticleSection[];
  relatedLinks: { href: string; label: string }[];
};

export const articles: Article[] = [
  {
    slug: "automatisation-vs-digitalisation",
    title: "Automatisation vs digitalisation : quelle différence pour votre PME ?",
    description:
      "Digitaliser et automatiser ne veulent pas dire la même chose. Comprendre la différence évite de dépenser au mauvais endroit.",
    excerpt:
      "Les deux mots sont utilisés à tort et à travers. Voici la différence concrète, avec des exemples réels de PME.",
    publishedAt: "2026-08-10",
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "« Il faut digitaliser » et « il faut automatiser » sont souvent utilisés comme des synonymes. Ce n'est pas le cas, et confondre les deux fait perdre du temps et de l'argent : on digitalise ce qui n'a pas besoin d'être automatisé, ou on tente d'automatiser un processus qui n'existe encore que sur papier ou dans la tête d'une seule personne.",
        ],
      },
      {
        heading: "La digitalisation : faire entrer l'information dans un système",
        paragraphs: [
          "Digitaliser, c'est transformer une information ou un processus papier / manuel en une version numérique exploitable. Exemple concret : des équipes terrain qui encodaient leurs heures sur des feuilles papier sont passées à une saisie sur tablette. L'information existe désormais dans un système, en temps réel, sans ressaisie.",
          "La digitalisation seule ne supprime pas le travail humain : elle le rend visible, structuré et exploitable. C'est une étape indispensable avant d'automatiser quoi que ce soit.",
        ],
      },
      {
        heading: "L'automatisation : supprimer l'intervention humaine répétitive",
        paragraphs: [
          "Automatiser, c'est faire en sorte qu'un processus s'exécute sans qu'une personne doive répéter la même action à chaque fois. Exemple concret : une comptable qui vérifiait manuellement les factures impayées et envoyait les relances une par une. Après automatisation, la détection des retards et l'envoi des relances se font seuls, en quelques minutes plutôt qu'en plusieurs heures.",
          "L'automatisation ne fonctionne bien que si les données sur lesquelles elle s'appuie sont fiables, structurées, donc souvent déjà digitalisées.",
        ],
      },
      {
        heading: "Pourquoi l'ordre compte",
        paragraphs: [
          "Automatiser un processus mal clarifié revient à accélérer le chaos : les erreurs se propagent plus vite, pas moins. C'est pour cette raison qu'Optmiz commence toujours par observer et simplifier le fonctionnement réel, avant de connecter les outils ou d'automatiser.",
        ],
      },
      {
        heading: "Dans la pratique, les deux se combinent",
        paragraphs: [
          "La plupart des projets menés chez des PME en Wallonie et à Bruxelles combinent les deux : structurer une saisie terrain, puis automatiser le calcul et la génération des documents qui en découlent. C'est exactement ce qui a permis de faire passer le calcul de 1 874 notifications de loyers de deux semaines à une demi-journée.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/notre-methodologie", label: "Découvrir la méthode Optmiz" },
      { href: "/cas-concrets", label: "Voir d'autres cas concrets" },
      { href: "/ressources/par-ou-commencer-automatisation", label: "Par où commencer votre projet ?" },
    ],
  },
  {
    slug: "combien-coute-automatisation-pme-belgique",
    title: "Combien coûte l'automatisation des processus pour une PME en Belgique ?",
    description:
      "Il n'existe pas de prix « type ». Voici les facteurs qui font varier le coût d'un projet d'automatisation, et comment obtenir un prix fixe fiable.",
    excerpt:
      "Pas de grille tarifaire universelle, mais des facteurs clairs. Voici comment est réellement calculé le prix d'un projet.",
    publishedAt: "2026-08-10",
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "C'est la première question que se posent la plupart des dirigeants de PME, et c'est légitime. La réponse honnête est : « ça dépend », mais ça ne dépend pas du hasard. Trois facteurs expliquent l'essentiel de l'écart de prix entre deux projets d'automatisation.",
        ],
      },
      {
        heading: "1. Le périmètre réel du processus",
        paragraphs: [
          "Automatiser une relance client automatique n'a rien à voir avec automatiser le calcul et l'édition de plus de mille documents personnalisés. Le nombre d'étapes, de cas particuliers et d'exceptions à gérer fait varier le temps de travail, donc le prix.",
        ],
      },
      {
        heading: "2. L'état des outils existants",
        paragraphs: [
          "Connecter deux outils modernes qui exposent déjà une API est rapide. Extraire des données d'un vieux logiciel fermé, ou d'un fichier Excel géré à la main depuis dix ans, demande plus de travail avant même de commencer l'automatisation elle-même.",
        ],
      },
      {
        heading: "3. Le niveau d'intégration souhaité",
        paragraphs: [
          "Une automatisation isolée coûte moins cher qu'un système qui doit s'intégrer proprement à votre CRM, votre ERP et votre facturation. Plus le système final doit être robuste et maintenu dans le temps, plus l'investissement initial est justifié.",
        ],
      },
      {
        heading: "Pourquoi éviter la facturation à l'heure",
        paragraphs: [
          "La facturation à l'heure fait porter le risque de dérapage sur vous : plus le prestataire met de temps, plus vous payez, sans garantie de résultat. C'est l'expérience négative la plus citée par les PME qui ont déjà tenté un projet IT : devis qui gonfle, livrable éloigné de ce qui avait été discuté.",
        ],
      },
      {
        heading: "Comment Optmiz calcule un prix fixe",
        paragraphs: [
          "Chez Optmiz, le prix n'est jamais donné « à la louche » avant d'avoir vu le terrain. Le parcours est simple : une visite diagnostic gratuite permet de valider que le sujet a du sens. Si c'est le cas, une analyse terrain payante cartographie précisément le processus. Le prix fixe est ensuite calculé sur cette base : périmètre précis × jours nécessaires, à taux journalier fixe. Vous connaissez le montant avant le démarrage de la mise en œuvre.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/tarifs", label: "Voir le détail des tarifs et forfaits Zen" },
      { href: "/ressources/audit-processus-pme-guide", label: "Ce que contient un audit terrain" },
      { href: "/#devis", label: "Réserver une visite diagnostic gratuite" },
    ],
  },
  {
    slug: "5-signes-pme-automatiser-processus",
    title: "5 signes que votre PME devrait automatiser ses processus",
    description:
      "Perte de temps, erreurs répétées, dépendance à une seule personne : voici 5 signaux concrets qui indiquent qu'il est temps d'agir.",
    excerpt:
      "Certains signaux reviennent presque toujours avant qu'une PME décide d'automatiser. Voici les 5 plus fréquents.",
    publishedAt: "2026-08-10",
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "L'automatisation n'est pas une question de taille d'entreprise ou de budget IT. C'est une question de symptômes. Voici les cinq signaux les plus fréquents chez les PME qui finissent par lancer un projet d'automatisation.",
        ],
      },
      {
        heading: "1. Des tâches répétitives consomment des heures chaque semaine",
        paragraphs: [
          "Relances, encodages, exports, copier-coller entre outils : si une tâche revient identique chaque semaine et qu'elle ne crée aucune valeur ajoutée nouvelle, c'est un candidat naturel à l'automatisation.",
        ],
      },
      {
        heading: "2. Vos outils ne communiquent pas entre eux",
        paragraphs: [
          "Excel, mails, ERP, CRM : quand chaque outil vit isolé et que le lien entre eux, c'est une personne qui recopie l'information, le système entier dépend de cette personne et de sa disponibilité.",
        ],
      },
      {
        heading: "3. Une seule personne détient tout le savoir opérationnel",
        paragraphs: [
          "Si un processus clé s'arrête ou ralentit sérieusement en cas d'absence d'une seule personne, ce n'est pas un problème de personne : c'est un problème de processus non structuré.",
        ],
      },
      {
        heading: "4. Les erreurs et doublons se répètent",
        paragraphs: [
          "Une erreur ponctuelle est normale. Une erreur qui revient régulièrement au même endroit du processus est un signal fort que l'étape doit être automatisée, pas simplement « refaite avec plus d'attention ».",
        ],
      },
      {
        heading: "5. Vous ne savez plus où ça coince",
        paragraphs: [
          "Quand il devient difficile de dire précisément où le temps se perd dans un processus, c'est souvent le signe qu'il n'a jamais été cartographié. C'est exactement le rôle d'un audit terrain : rendre visible ce qui est aujourd'hui invisible.",
        ],
      },
      {
        heading: "Deux signaux suffisent pour agir",
        paragraphs: [
          "Il n'est pas nécessaire de cocher les cinq cases. Si deux de ces signaux vous parlent, le coût de l'inaction dépasse déjà probablement le coût d'un diagnostic, qui reste gratuit et sans engagement.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/cas-concrets", label: "Voir des cas concrets résolus" },
      { href: "/ressources/par-ou-commencer-automatisation", label: "Par où commencer ?" },
      { href: "/#devis", label: "Réserver une visite diagnostic gratuite" },
    ],
  },
  {
    slug: "par-ou-commencer-automatisation",
    title: "Automatisation des tâches répétitives : par où commencer ?",
    description:
      "Ne commencez pas par choisir un outil. Voici la méthode pour identifier, prioriser et tester votre premier projet d'automatisation.",
    excerpt:
      "La bonne première question n'est jamais « quel outil choisir ? ». Voici par où commencer réellement.",
    publishedAt: "2026-08-10",
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "La tentation la plus courante est de commencer par chercher un logiciel : « quel outil pour automatiser mes relances ? », « quel CRM choisir ? ». C'est l'ordre inverse de ce qui fonctionne. Voici la démarche qui limite le risque d'échec.",
        ],
      },
      {
        heading: "Étape 1 : Lister les tâches répétitives réelles, pas supposées",
        paragraphs: [
          "Demandez à vos équipes ce qu'elles font vraiment chaque semaine, pas ce que la fiche de poste dit qu'elles devraient faire. Les vraies pertes de temps se trouvent presque toujours dans les tâches « annexes » : exports, relances, corrections, ressaisies.",
        ],
      },
      {
        heading: "Étape 2 : Prioriser par impact × fréquence",
        paragraphs: [
          "Une tâche qui prend 5 minutes mais se répète 50 fois par jour pèse plus qu'une tâche de 2 heures qui n'arrive qu'une fois par mois. Classez vos candidats à l'automatisation sur ces deux critères avant de choisir par où commencer.",
        ],
      },
      {
        heading: "Étape 3 : Cartographier le processus actuel, avant / après",
        paragraphs: [
          "Décrivez précisément les étapes actuelles : qui fait quoi, avec quel outil, à quelle fréquence, avec quelles exceptions. C'est cette cartographie qui révèle les vrais points de friction, souvent différents de ce qu'on imaginait au départ.",
        ],
      },
      {
        heading: "Étape 4 : Tester sur un périmètre restreint avant de généraliser",
        paragraphs: [
          "Automatiser directement l'ensemble d'un processus complexe multiplie le risque. Commencer sur un périmètre limité (une équipe, un type de dossier) permet de valider l'approche avant de l'étendre.",
        ],
      },
      {
        heading: "C'est exactement la logique de la méthode Optmiz",
        paragraphs: [
          "Observer le fonctionnement réel, simplifier, puis seulement ensuite choisir l'outil : c'est la logique Optmiz. Le parcours commercial, lui, tient en quatre étapes : visite diagnostic gratuite, analyse terrain payante, mise en œuvre à prix fixe, suivi optionnel.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/notre-methodologie", label: "La méthode Optmiz en détail" },
      { href: "/ressources/5-signes-pme-automatiser-processus", label: "Vérifier les signaux chez vous" },
      { href: "/#devis", label: "Réserver une visite diagnostic gratuite" },
    ],
  },
  {
    slug: "audit-processus-pme-guide",
    title: "Comment auditer les processus de votre PME avant de digitaliser ?",
    description:
      "Sauter l'audit coûte plus cher après. Voici ce qu'observe un bon audit terrain, et ce qu'il doit livrer avant tout devis.",
    excerpt:
      "Un audit terrain bien fait change la suite du projet. Voici ce qu'il doit observer et livrer.",
    publishedAt: "2026-08-10",
    readingMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Beaucoup de projets de digitalisation échouent ou dérapent parce qu'ils ont sauté une étape : l'audit terrain. Sans lui, un devis n'est qu'une estimation basée sur ce que le client croit être son processus, pas sur ce qu'il est réellement.",
        ],
      },
      {
        heading: "Ce qu'observe un bon audit terrain",
        paragraphs: [
          "Un audit sérieux ne se limite pas à un questionnaire. Il observe le fonctionnement réel avec les équipes concernées : les flux d'information, les outils réellement utilisés (pas seulement ceux prévus sur papier), les frictions quotidiennes et les écarts entre la théorie et la pratique.",
        ],
        list: [
          "Sessions terrain avec les personnes qui exécutent le processus au quotidien",
          "Analyse des outils utilisés, y compris les contournements informels",
          "Identification des écarts entre le processus « officiel » et le processus réel",
          "Repérage des exceptions et cas particuliers qui compliquent l'automatisation",
        ],
      },
      {
        heading: "Ce qu'un audit doit livrer",
        paragraphs: [
          "À la fin d'un audit terrain, vous devez repartir avec une cartographie claire de votre processus, même si vous décidez de ne pas aller plus loin. C'est un livrable en soi, pas seulement une étape administrative avant le devis.",
        ],
      },
      {
        heading: "Diagnostic gratuit vs audit payant : la différence",
        paragraphs: [
          "Chez Optmiz, la visite diagnostic (gratuite, environ 30 minutes) sert uniquement à valider que le sujet a du sens et qu'il existe un potentiel de gain réel. L'analyse terrain, elle, est payante : elle mobilise du temps réel sur site, avec vos équipes, pour produire la cartographie complète qui sert de base au devis fixe.",
        ],
      },
      {
        heading: "Pourquoi ce n'est pas du temps perdu",
        paragraphs: [
          "Un audit qui ne débouche pas sur un projet n'est jamais un échec : vous gardez une vision claire de vos processus, utile même si vous choisissez un autre prestataire ou une autre priorité pour l'année.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/tarifs", label: "Voir le parcours diagnostic → audit → devis fixe" },
      { href: "/ressources/combien-coute-automatisation-pme-belgique", label: "Comprendre le calcul du prix" },
      { href: "/#devis", label: "Réserver une visite diagnostic gratuite" },
    ],
  },
  {
    slug: "outils-integres-site-internet-pme",
    title: "Pourquoi la plupart des sites internet de PME ne rapportent aucun client",
    description:
      "Un site vitrine sans outils intégrés reste un dépliant numérique. Formulaire structuré, prise de rendez-vous en ligne, boutique en ligne : ce qui transforme un site en véritable outil pour votre PME.",
    excerpt:
      "Un site qui reçoit des visites ne sert à rien s'il ne fait rien de ces visites. Voici les outils qui changent vraiment la donne.",
    publishedAt: "2026-08-11",
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Beaucoup de PME ont un site internet qui reçoit des visites… et qui ne génère presque aucune demande, aucune vente, aucun rendez-vous. Le problème n'est presque jamais le trafic : c'est l'absence d'outils qui transforment une visite en action concrète. Un site vitrine sans rien derrière reste un dépliant numérique, quel que soit son design.",
        ],
      },
      {
        heading: "Un formulaire structuré vaut mieux qu'une simple adresse mail",
        paragraphs: [
          "Afficher \"contact@entreprise.be\" laisse le visiteur seul face à la page blanche d'un mail : il doit deviner quoi écrire, et beaucoup abandonnent avant d'avoir tapé une ligne. Un formulaire structuré (nom, société, coordonnées, et une question ciblée comme \"quel est votre principal frein aujourd'hui ?\") fait le travail à sa place, et transforme une simple visite en demande qualifiée : vous savez déjà, avant le premier échange, à qui vous parlez et sur quoi porte le besoin.",
          "Le risque, ensuite, est de frustrer ce prospect si vous ne pouvez pas le prendre en charge tout de suite. Un engagement clair (\"réponse sous 24h\") affiché au moment de la demande, suivi d'une confirmation automatique immédiate, suffit à éviter que le silence ne le fasse partir voir ailleurs.",
        ],
      },
      {
        heading: "Un calendrier de prise de rendez-vous en ligne",
        paragraphs: [
          "Les allers-retours par mail pour trouver une heure qui convient à tout le monde sont une friction inutile, et une source d'abandon. Proposer un système de réservation de créneau directement sur le site supprime cette friction : le prospect choisit lui-même un moment disponible dans votre agenda, sans négociation.",
          "C'est aussi un gain de temps réel pour vous, et une image professionnelle dès le premier contact. Un mail automatique envoyé juste après la réservation peut en plus préparer le rendez-vous : expliquer le déroulé, rassurer sur l'absence d'engagement, donner une idée claire de ce qui sera abordé.",
        ],
      },
      {
        heading: "Une boutique en ligne quand la vente s'y prête",
        paragraphs: [
          "Pour une activité qui vend des produits ou des prestations standardisées, une boutique en ligne réduit directement le nombre de commandes prises par téléphone ou par mail : le client choisit, paie et reçoit une confirmation sans intervention humaine à chaque étape.",
          "Bien conçue, elle synchronise le stock en temps réel (pour ne jamais vendre ce qui n'est plus disponible), sécurise le paiement, et libère du temps commercial pour les demandes qui ont réellement besoin d'un humain.",
        ],
      },
      {
        heading: "D'autres outils, selon ce que votre activité demande",
        paragraphs: [
          "Formulaires, calendrier et boutique en ligne couvrent la majorité des besoins, mais d'autres outils peuvent avoir du sens selon votre réalité : un espace client pour suivre une commande ou un dossier, une génération automatique de documents (devis, factures) à partir d'un formulaire, ou un chat pour répondre aux questions les plus fréquentes avant même le premier contact.",
          "Aucun de ces outils n'est ajouté par défaut. Chacun répond à un besoin identifié pendant l'audit, jamais à une mode ou à une liste de fonctionnalités standard.",
        ],
      },
      {
        heading: "Un site web n'est utile que s'il intègre les bons outils",
        paragraphs: [
          "Un site \"joli\" qui ne fait rien de tout ça reste une carte de visite numérique. Un site pensé pour qualifier, vendre, faciliter la prise de rendez-vous ou suivre un dossier devient un véritable outil commercial. C'est cette logique qui guide la manière dont nous concevons un site internet chez Optmiz : jamais un outil pour la forme, toujours pour un résultat mesurable.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/services/creation-site-web", label: "Notre approche de la création de site internet" },
      { href: "/ressources/par-ou-commencer-automatisation", label: "Par où commencer votre projet d'automatisation" },
      { href: "/contact", label: "Voir un exemple concret : notre propre formulaire" },
      { href: "/ressources/nom-de-domaine-email-professionnel-pme", label: "Votre nom de domaine protège-t-il vraiment votre entreprise ?" },
    ],
  },
  {
    slug: "nom-de-domaine-email-professionnel-pme",
    title: "Pourquoi votre nom de domaine compte plus que vous ne le pensez",
    description:
      "Une adresse @gmail.com envoie un signal, même involontaire. Et un nom de domaine non réservé peut être récupéré par n'importe qui. Ce qui protège réellement votre entreprise en ligne.",
    excerpt:
      "Une adresse mail et un nom qu'on ne protège pas soi-même finissent, tôt ou tard, par coûter des clients ou de la crédibilité.",
    publishedAt: "2026-08-11",
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          "Beaucoup de PME utilisent encore une adresse @gmail.com, @outlook.com ou @skynet.be pour leurs communications professionnelles, et n'ont jamais réservé les variantes de leur propre nom en ligne. Ça ne pose aucun problème… jusqu'au jour où ça en pose un : un client qui doute, un concurrent qui capte du trafic destiné à votre marque, ou pire, quelqu'un qui se fait passer pour vous.",
        ],
      },
      {
        heading: "Une adresse @gmail.com envoie un signal, même sans le vouloir",
        paragraphs: [
          "\"contact@votresociete.be\" et \"votresociete2024@gmail.com\" ne disent pas la même chose d'une entreprise, même si le contenu du mail est identique. La seconde adresse suggère, à tort ou à raison, une structure jeune, peu établie, ou qui n'a pas pris le temps de se professionnaliser. Pour un client qui hésite entre deux prestataires, ce détail pèse plus qu'on ne l'imagine.",
          "Corriger ça coûte très peu : le nom de domaine et la boîte mail professionnelle associée sont parmi les investissements numériques les moins chers, pour un effet de crédibilité immédiat.",
        ],
      },
      {
        heading: "Réserver son nom, pas seulement l'utiliser",
        paragraphs: [
          "Avoir un site sur \"votresociete.be\" ne garantit pas que vous soyez seul à pouvoir l'utiliser ailleurs. Si vous n'avez jamais réservé \"votresociete.com\", les variantes avec ou sans tiret, ou les fautes de frappe les plus fréquentes de votre nom, rien n'empêche quelqu'un d'autre de le faire : un concurrent opportuniste, un revendeur de noms de domaine, ou pire, quelqu'un qui monte un site ou des mails frauduleux au nom de votre entreprise.",
          "Le coût de réserver ces variantes est minime. Le coût de ne pas l'avoir fait, le jour où ça arrive, ne l'est pas : image ternie, clients trompés, parfois des mois pour récupérer la situation.",
        ],
      },
      {
        heading: "Un domaine mal configuré peut faire autant de dégâts qu'un domaine non réservé",
        paragraphs: [
          "Réserver un nom ne suffit pas s'il est mal configuré derrière. C'est une situation que nous avons nous-mêmes rencontrée et corrigée sur ce site : une configuration DNS héritée empêchait notre propre nom de domaine principal de s'afficher correctement en HTTPS. Concrètement, un visiteur qui tapait l'adresse sans le \"www\" tombait sur une erreur de sécurité, avant même d'arriver sur le site.",
          "Pour un client qui teste votre professionnalisme avant de vous confier un projet, ce genre d'incident a le même effet qu'un nom de domaine non protégé : ça sème le doute au pire moment.",
        ],
      },
      {
        heading: "Ce qu'il faut vérifier concrètement",
        paragraphs: [
          "Quelques réflexes suffisent à éliminer l'essentiel du risque :",
        ],
        list: [
          "Réserver votre nom en .be et .com au minimum, ainsi que les variantes évidentes (avec/sans tiret, fautes fréquentes)",
          "Faire migrer toutes les communications pro vers une adresse mail sur votre propre domaine",
          "Rediriger proprement les anciens domaines ou variantes vers le domaine principal, plutôt que les laisser inactifs",
          "Vérifier que le domaine principal fonctionne bien en HTTPS, avec et sans \"www\"",
        ],
      },
      {
        heading: "Une base à poser une fois, pour de bon",
        paragraphs: [
          "Ce n'est pas un projet récurrent : c'est une base à poser une fois, correctement, puis à laisser tourner. C'est exactement le type de sujet qu'on identifie pendant un diagnostic ou un audit terrain, souvent en même temps qu'un projet de site internet ou de digitalisation plus large.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/services/creation-site-web", label: "Notre approche de la création de site internet" },
      { href: "/ressources/outils-integres-site-internet-pme", label: "Les outils qui rendent un site internet vraiment utile" },
      { href: "/contact", label: "Réserver une visite diagnostic gratuite" },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(currentSlug: string, count = 3): Article[] {
  return articles.filter((article) => article.slug !== currentSlug).slice(0, count);
}
