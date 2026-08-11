import type { AccordionItem } from "@/components/Accordion";

export const defaultProblem = {
  title: "Ce qui vous freine aujourd’hui n’est pas un manque d’outils.",
  intro:
    "C’est l’accumulation d'inefficacités qui, mises bout à bout, ralentissent toute votre organisation :",
  points: [
    "Des tâches répétitives qui consomment du temps chaque jour",
    "Des erreurs ou doublons dans vos encodages manuels",
    "Des outils qui ne communiquent pas entre eux",
    "Des processus métiers tournant sur Excel",
    "Des équipes qui compensent avec des solutions manuelles",
    "Une complexité qui augmente à mesure que l’entreprise grandit",
  ],
  closing:
    "Le coût réel est invisible : perte de temps, fatigue des équipes, décisions ralenties, croissance freinée.",
};

export const caseStudies: AccordionItem[] = [
  {
    id: "#1",
    title: "Automatisation des relances clients",
    result: "→ 5 min au lieu de plusieurs heures",
    tags: ["🏢 Logements sociaux", "📍 Bruxelles"],
    problem:
      "Une comptable devait vérifier manuellement les factures impayées et envoyer les relances une par une. Une tâche chronophage, répétée chaque semaine, source de stress et d'oublis.",
    solution:
      "Mise en place d'un système de relance automatique : détection des factures en retard, génération automatique des emails de relance, suivi centralisé en temps réel.",
    outcome: "Les relances sont expédiées en moins de 5 minutes, sans intervention humaine.",
  },
  {
    id: "#2",
    title: "Centralisation des pointages RH",
    result: "→ 0 tâche manuelle",
    tags: ["⚙️ Chaudronnerie industrielle", "📍 Charleroi"],
    problem:
      "Un responsable RH récupérait manuellement les données de pointage chaque jour : copier-coller entre systèmes, vérifications fastidieuses, corrections d'erreurs récurrentes.",
    solution:
      "Automatisation complète du flux de données : les informations de pointage sont centralisées et consolidées quotidiennement, sans aucune intervention humaine.",
    outcome:
      "Suppression totale des tâches répétitives, réduction significative des erreurs et gain de temps immédiat.",
  },
  {
    id: "#3",
    title: "Calcul de 1 874 notifications de loyers",
    result: "→ 2 semaines → ½ journée",
    tags: ["🏢 Logements sociaux", "📍 Bruxelles"],
    problem:
      "Le calcul et l'édition de 1 874 notifications de loyers prenait plus de deux semaines : un processus entièrement manuel, source d'erreurs et de retards chaque année.",
    solution:
      "Structuration des données et automatisation complète : calcul automatique, génération des documents, préparation et optimisation de l'envoi à l'impression.",
    outcome: "Le processus complet de 1 874 notifications est réalisé en une demi-journée.",
  },
  {
    id: "#4",
    title: "Digitalisation des feuilles de temps",
    result: "→ Zéro papier, temps réel",
    tags: ["🏭 Terrain & production"],
    problem:
      "Les travailleurs sur site encodaient leurs heures sur des feuilles papier. Un processus lent, sujet aux erreurs et aux pertes, sans aucune visibilité en temps réel pour les responsables.",
    solution:
      "Digitalisation via tablette sur site : encodage simple par les équipes terrain, données envoyées automatiquement et centralisées en temps réel dans le système.",
    outcome:
      "Zéro papier, zéro perte, suivi opérationnel en temps réel et facturation des prestations simplifiée.",
  },
  {
    id: "#5",
    title: "Digitalisation des demandes de prix",
    result: "→ CRM automatisé, multi-pays",
    tags: ["🏭 Production industrielle sur mesure"],
    problem:
      "Les demandes de prix étaient traitées manuellement via une multitude de mails et d'appels dispersés, un processus lent, sujet aux erreurs et impossible à suivre à l'échelle internationale.",
    solution:
      "Création d'un site web multi-pays intégrant un configurateur de produit. Les demandes sont désormais structurées, standardisées et centralisées automatiquement dans le CRM.",
    outcome:
      "Gain de temps commercial considérable, expérience client simplifiée et gestion efficace à l'échelle internationale.",
  },
];

export const generalFaqs = [
  {
    q: "Optmiz intervient-il partout en Belgique ?",
    a: "Optmiz est basé à Soignies et intervient principalement auprès de PME en Wallonie (Hainaut, Brabant wallon, Namur, Bruxelles) — notamment à Mons, Charleroi, Namur, Braine-le-Comte, La Louvière — et à distance pour les échanges qui ne nécessitent pas de présence terrain. La liste des villes est sur la page Zones.",
  },
  {
    q: "Puis-je réserver une visite sur mon lieu de travail ?",
    a: "Oui. Sur la page Rendez-vous vous choisissez un créneau en ligne : première visite gratuite d’environ 45 minutes chez vous, confirmée sous 24h ouvrées.",
  },
  {
    q: "Qu'est-ce que l'automatisation de processus, concrètement ?",
    a: "C'est faire en sorte qu'une tâche répétitive (relance, calcul, export, notification) s'exécute automatiquement, sans qu'une personne doive la refaire manuellement à chaque fois.",
  },
  {
    q: "Quelle est la différence entre automatisation et digitalisation ?",
    a: "Digitaliser, c'est transformer une information papier ou manuelle en version numérique exploitable. Automatiser, c'est supprimer l'intervention humaine répétitive sur un processus déjà digitalisé.",
  },
  {
    q: "Combien de temps dure un projet d'automatisation ?",
    a: "Cela dépend du périmètre défini lors de l'audit. Un projet ciblé (une relance, un calcul) se met en place en quelques semaines ; un projet plus large (CRM, configurateur) prend plus de temps, toujours cadré par un devis fixe.",
  },
  {
    q: "Dois-je changer tous mes outils actuels ?",
    a: "Non. La priorité est de connecter et fiabiliser ce qui existe déjà (Excel, ERP, CRM, mails) avant d'envisager un remplacement d'outil.",
  },
  {
    q: "Mes équipes doivent-elles être techniques pour utiliser les solutions livrées ?",
    a: "Non. L'objectif est l'adoption réelle : un système utile est un système que vos équipes utilisent sans formation technique lourde.",
  },
] as const;

export const pricingFaqs = [
  {
    q: "Le diagnostic est-il vraiment gratuit ?",
    a: "Oui. Premier échange gratuit et sans engagement. L’audit terrain complet, lui, est payant.",
  },
  {
    q: "Quelle est la différence entre diagnostic et audit ?",
    a: "Le diagnostic = premier échange pour cadrer. L’audit = mission terrain avec cartographie complète, base du devis fixe.",
  },
  {
    q: "Pourquoi l’audit est-il payant ?",
    a: "Il mobilise du temps terrain réel (équipes, outils, flux, rédaction). Même sans suite, vous gardez une vision claire de vos process.",
  },
  {
    q: "Comment est calculé le prix d’un projet ?",
    a: "Sur base de l’audit : périmètre précis × jours nécessaires, à taux journalier fixe. Tout est dans le devis avant démarrage.",
  },
  {
    q: "Et si je veux ajouter quelque chose en cours de projet ?",
    a: "Réévaluation formelle + nouveau devis. Rien n’est fait sans votre validation.",
  },
  {
    q: "Faut-il un forfait Zen après un projet ?",
    a: "Non, c’est optionnel. Utile si vous voulez maintenance et amélioration continue sans le gérer seuls.",
  },
  {
    q: "Peut-on changer de forfait Zen ?",
    a: "Oui. On ajuste selon vos besoins du moment.",
  },
] as const;

export const methodSteps = [
  {
    letter: "O",
    title: "Observer",
    text: "Nous observons votre fonctionnement réel.",
  },
  {
    letter: "P",
    title: "Proposer",
    text: "Nos recommandations sont adaptées à votre réalité.",
  },
  {
    letter: "T",
    title: "Transformer",
    text: "Nous mettons en œuvre les solutions à votre rythme.",
  },
  {
    letter: "M",
    title: "Moduler",
    text: "Chaque solution est construite selon vos priorités et vos moyens.",
  },
  {
    letter: "I",
    title: "Itérer",
    text: "Nous vous accompagnons dans l'amélioration continue de vos processus.",
  },
  {
    letter: "Z",
    title: "Zenifier",
    text: "Vous retrouvez la sérénité. Pour rester dans cet état dans la durée, découvrez nos forfaits Zen.",
  },
];
