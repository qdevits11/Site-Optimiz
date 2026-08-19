import type { Metadata } from "next";
import { sitelinkCandidates } from "@/lib/navigation";

/**
 * IMPORTANT : domaine canonique
 * L'apex "https://optmiz.be" ne répond pas en HTTPS (échec de handshake TLS,
 * DNS pointant vers un service de redirection HTTP-only chez le registrar).
 * Tant que ce n'est pas corrigé côté DNS/Vercel, le domaine fiable est
 * "https://www.optmiz.be". Ne changer cette constante que lorsque
 * https://optmiz.be sert un certificat TLS valide (test: `curl -I https://optmiz.be`).
 */
export const siteConfig = {
  name: "Optmiz",
  legalName: "Optmiz",
  url: "https://www.optmiz.be",
  locale: "fr_BE",
  language: "fr",
  email: "contact@optmiz.be",
  phoneDisplay: "+32 489 00 19 29",
  phoneHref: "tel:+32489001929",
  founder: {
    name: "Quentin Devits",
    jobTitle: "Fondateur",
    url: "https://www.optmiz.be/pourquoi-nous",
  },
  location: {
    city: "Soignies",
    region: "Wallonie",
    country: "BE",
    countryName: "Belgique",
  },
  areaServed: [
    "Wallonie",
    "Hainaut",
    "Bruxelles",
    "Soignies",
    "Braine-le-Comte",
    "Mons",
    "Charleroi",
    "Namur",
    "La Louvière",
    "Nivelles",
    "Enghien",
    "Ath",
    "Binche",
    "Tournai",
    "Gembloux",
  ],
  sameAs: ["https://www.linkedin.com/company/optmiz/"] as string[],
  title: {
    default: "Simplification & automatisation des processus pour PME | Optmiz",
    template: "%s | Optmiz",
  },
  description:
    "Optmiz aide les PME en Wallonie et à Bruxelles à simplifier leurs processus, connecter leurs outils et automatiser les tâches répétitives. Première visite gratuite.",
  keywords: [
    "simplification processus PME",
    "automatisation PME",
    "optimisation processus Belgique",
    "automatisation Wallonie",
    "automatisation Bruxelles",
    "automatisation tâches répétitives",
    "connexion outils métier",
    "PME Wallonie Bruxelles",
    "Optmiz",
    "Soignies",
  ],
} as const;

export type SitePage = {
  path: string;
  title: string;
  description: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export const sitePages: SitePage[] = [
  {
    path: "/",
    title: siteConfig.title.default,
    description: siteConfig.description,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/notre-methodologie",
    title: "Méthode Optmiz · visite diagnostic, analyse, mise en œuvre",
    description:
      "Quatre étapes claires : visite diagnostic gratuite, analyse terrain, mise en œuvre à prix fixe, suivi Zen optionnel. Pour PME en Wallonie et à Bruxelles.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/cas-concrets",
    title: "Cas concrets Optmiz · résultats réels en PME",
    description:
      "Relances clients, pointages RH, notifications de loyers, feuilles de temps, demandes de prix : résultats observés sur des missions réelles.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/pourquoi-nous",
    title: "Pourquoi Optmiz · Quentin Devits, 15 ans d’expérience terrain",
    description:
      "Quentin Devits accompagne les PME en Wallonie et à Bruxelles : présence terrain, approche pragmatique, indépendance vis-à-vis des technologies.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/tarifs",
    title: "Tarifs Optmiz · visite gratuite, analyse payante, prix fixe",
    description:
      "Visite diagnostic gratuite, analyse terrain payante, devis fixe avant mise en œuvre. Suivi Zen optionnel. Vous savez ce que vous payez avant de démarrer.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/services",
    title: "Solutions Optmiz · le bon outil dépend du problème",
    description:
      "Automatisation, connexion d’outils, formulaires, portails, outils de pilotage ou sur-mesure : Optmiz choisit le moyen après avoir compris votre façon de travailler.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/services/creation-site-web",
    title: "Site, portail ou configurateur pour simplifier un processus",
    description:
      "Un site ou portail uniquement lorsqu’il simplifie un processus métier : configurateur, formulaire connecté, portail client, demande de prix, prise de rendez-vous.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/services/systemes-de-gestion",
    title: "Outils de pilotage et connexion de données pour PME",
    description:
      "Centraliser l’information, connecter Excel, mails, ERP ou CRM, et construire un outil seulement si aucun existant ne répond correctement au besoin.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/ressources",
    title: "Ressources Optmiz · simplifier et automatiser les processus PME",
    description:
      "Guides pratiques pour comprendre, prioriser et lancer un projet de simplification et d’automatisation des processus en PME.",
    changeFrequency: "weekly",
    priority: 0.75,
  },
  {
    path: "/faq",
    title: "FAQ Optmiz · visite diagnostic, analyse, tarifs",
    description:
      "Visite diagnostic, analyse terrain, prix fixe, outils existants : les réponses aux questions les plus fréquentes sur Optmiz.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    title: "Contact Optmiz · Soignies, Wallonie & Bruxelles",
    description:
      "Contactez Optmiz pour une visite diagnostic gratuite : simplification et automatisation des processus pour PME en Wallonie et à Bruxelles.",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  {
    path: "/zones",
    title: "Zones d’intervention Optmiz · Wallonie & Bruxelles",
    description:
      "Optmiz intervient auprès des PME à Soignies, Mons, Charleroi, Namur, Bruxelles et dans toute la Wallonie. Réservez une visite diagnostic sur place.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export function absoluteUrl(path = "/"): string {
  if (path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata(
  page: Pick<SitePage, "path" | "title" | "description">,
  extras: Metadata = {},
): Metadata {
  const url = absoluteUrl(page.path);
  const isHome = page.path === "/";

  return {
    title: isHome ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
    ...extras,
  };
}

export function articleMetadata(article: {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
}): Metadata {
  const url = absoluteUrl(`/ressources/${article.slug}`);

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [siteConfig.founder.name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo-on-dark.png"),
    image: absoluteUrl("/logo-on-dark.png"),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    foundingLocation: {
      "@type": "Place",
      name: `${siteConfig.location.city}, ${siteConfig.location.countryName}`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Wallonie",
      },
      {
        "@type": "AdministrativeArea",
        name: "Bruxelles",
      },
      {
        "@type": "Country",
        name: "Belgique",
      },
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.jobTitle,
      url: siteConfig.founder.url,
    },
    knowsAbout: [
      "Simplification des processus",
      "Automatisation des processus",
      "Optimisation opérationnelle",
      "Connexion d'outils métier",
      "Formulaires et saisie terrain",
      "Portails et configurateurs",
    ],
    priceRange: "€€",
    sameAs: siteConfig.sameAs,
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: ["OPTMIZ", "Optmiz Wallonie", "Optmiz Bruxelles"],
    description: siteConfig.description,
    inLanguage: "fr-BE",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    hasPart: sitelinkCandidates.map((link) => ({
      "@type": "WebPage",
      "@id": `${absoluteUrl(link.path)}#webpage`,
      name: link.name,
      url: absoluteUrl(link.path),
      isPartOf: { "@id": `${siteConfig.url}/#website` },
    })),
  };
}

/** Signale à Google les pages prioritaires pour les sitelinks de marque. */
export function buildSiteNavigationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#sitenavigation`,
    name: "Navigation Optmiz",
    itemListElement: sitelinkCandidates.map((link, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: link.name,
      url: absoluteUrl(link.path),
    })),
  };
}

export function buildFaqJsonLd(faqs: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#quentin-devits`,
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.jobTitle,
    url: siteConfig.founder.url,
    image: absoluteUrl("/quentin.webp"),
    worksFor: {
      "@id": `${siteConfig.url}/#organization`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    knowsAbout: [
      "Simplification des processus",
      "Automatisation",
      "Optimisation opérationnelle",
      "Accompagnement PME",
    ],
  };
}

export function buildBreadcrumbJsonLd(items: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleJsonLd(article: {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  const url = absoluteUrl(`/ressources/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}/#article`,
    mainEntityOfPage: url,
    url,
    headline: article.title,
    description: article.description,
    inLanguage: "fr-BE",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@id": `${siteConfig.url}/#quentin-devits`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

export function buildArticleListJsonLd(
  articles: ReadonlyArray<{ slug: string; title: string; description: string; publishedAt: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl("/ressources"),
    name: "Ressources Optmiz",
    description:
      "Guides pratiques pour comprendre, prioriser et lancer un projet de simplification et d’automatisation des processus en PME.",
    hasPart: articles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      description: article.description,
      url: absoluteUrl(`/ressources/${article.slug}`),
      datePublished: article.publishedAt,
    })),
  };
}

export function buildServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Simplification et automatisation de processus pour PME",
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
    audience: {
      "@type": "Audience",
      audienceType: "PME belges",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Accompagnement Optmiz",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Visite diagnostic",
            description: "Premier échange gratuit et sans engagement pour observer la situation et voir si Optmiz peut apporter de la valeur.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Analyse terrain",
            description:
              "Mission terrain payante : observation des flux réels, cartographie complète, base du devis fixe.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mise en œuvre à prix fixe",
            description:
              "Simplification du processus puis réalisation au prix convenu avant démarrage, sans facturation à l'heure.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Suivi Zen",
            description:
              "Maintenance et amélioration continue optionnelles après livraison (Basique, Standard, Premium).",
          },
        },
      ],
    },
  };
}

export function buildServiceOfferingJsonLd(service: {
  name: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(service.path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: service.name,
    description: service.description,
    url,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
  };
}

export function buildContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl("/contact"),
    name: "Contact Optmiz",
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}
