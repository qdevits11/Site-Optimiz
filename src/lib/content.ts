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
