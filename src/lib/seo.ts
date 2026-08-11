import type { Metadata } from "next";

/**
 * IMPORTANT — domaine canonique
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
    default: "Optmiz, Automatisation & Digitalisation des Processus en Wallonie",
    template: "%s | Optmiz",
  },
  description:
    "Optmiz aide les PME belges à automatiser leurs tâches répétitives et digitaliser leurs processus. Diagnostic gratuit. Prix fixe. Résultats visibles rapidement.",
  keywords: [
    "automatisation PME",
    "digitalisation processus",
    "automatisation Wallonie",
    "optimisation processus Belgique",
    "consultant digitalisation PME",
    "automatisation tâches répétitives",
    "digitalisation PME Hainaut",
    "création site internet PME Wallonie",
    "site web sur mesure PME Belgique",
    "ERP sur mesure PME Belgique",
    "système de gestion PME",
    "digitalisation facturation PME",
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
    title: "La Méthode Optmiz, transformer vos processus sans chaos",
    description:
      "6 étapes concrètes pour automatiser et digitaliser vos processus PME en Wallonie, sans tout bouleverser d'un coup.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/cas-concrets",
    title: "Cas concrets d'automatisation en PME belges",
    description:
      "Relances clients, pointages RH, notifications de loyers, feuilles de temps : résultats réels obtenus avec Optmiz.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/pourquoi-nous",
    title: "Pourquoi Optmiz ? 15 ans d'expérience terrain en digitalisation PME",
    description:
      "Quentin Devits accompagne les PME wallonnes : méthode claire, présence humaine, prix fixe et résultats rapides.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/tarifs",
    title: "Tarifs Optmiz, prix fixe, audit cadré, forfaits Zen",
    description:
      "Diagnostic gratuit, audit terrain payant, devis fixe avant démarrage. Forfaits Zen pour maintenance et amélioration continue.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/services",
    title: "Nos services, automatisation, sites web, systèmes de gestion",
    description:
      "Automatisation de processus, création de site internet, systèmes de gestion (ERP/CRM) sur mesure : toujours choisis selon votre réalité.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/services/creation-site-web",
    title: "Création de site internet sur mesure pour PME en Wallonie",
    description:
      "Un site web utile à votre activité : configurateur, structuration commerciale ou vitrine claire, connecté à vos autres outils.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/services/systemes-de-gestion",
    title: "Systèmes de gestion sur mesure (ERP, CRM, facturation) pour PME",
    description:
      "Données, factures et suivi client structurés avec l'outil qui convient à votre réalité : Odoo si ça a du sens, sur mesure sinon.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/ressources",
    title: "Ressources, guides sur l'automatisation et la digitalisation PME",
    description:
      "Guides pratiques pour comprendre, prioriser et lancer vos projets d'automatisation et de digitalisation en PME.",
    changeFrequency: "weekly",
    priority: 0.75,
  },
  {
    path: "/faq",
    title: "FAQ, vos questions sur l'automatisation et Optmiz",
    description:
      "Diagnostic, audit, prix fixe, délais, outils : les réponses aux questions les plus fréquentes sur Optmiz.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    title: "Contact Optmiz, Soignies · Wallonie",
    description:
      "Contactez Optmiz pour un diagnostic gratuit : automatisation et digitalisation des processus pour PME en Wallonie.",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  {
    path: "/rendez-vous",
    title: "Réserver une visite gratuite chez vous · Optmiz",
    description:
      "Choisissez un créneau en ligne : Optmiz se déplace chez vous en Wallonie pour un premier diagnostic gratuit de 45 minutes, sans engagement.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/zones",
    title: "Zones d’intervention Optmiz · Wallonie & Bruxelles",
    description:
      "Optmiz intervient auprès des PME à Soignies, Mons, Charleroi, Namur, Braine-le-Comte et dans toute la Wallonie. Réservez une visite sur place.",
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
      "Automatisation des processus",
      "Digitalisation PME",
      "Optimisation opérationnelle",
      "Intégration d'outils métier",
      "Création de sites web sur mesure",
      "Systèmes de gestion (ERP/CRM)",
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
    description: siteConfig.description,
    inLanguage: "fr-BE",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
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
      "Digitalisation PME",
      "Automatisation",
      "Systèmes d'information",
      "Optimisation de processus",
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
      "Guides pratiques pour comprendre, prioriser et lancer vos projets d'automatisation et de digitalisation en PME.",
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
    serviceType: "Automatisation et digitalisation de processus pour PME",
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
            name: "Diagnostic",
            description: "Premier échange gratuit et sans engagement pour cadrer votre besoin.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Audit terrain & cartographie",
            description:
              "Mission terrain payante : observation des flux réels, cartographie complète, base du devis fixe.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Réalisation à prix fixe",
            description: "Mise en œuvre au prix convenu avant démarrage, sans facturation à l'heure.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Forfaits Zen",
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
