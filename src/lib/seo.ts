import type { Metadata } from "next";

export const siteConfig = {
  name: "Optmiz",
  legalName: "Optmiz",
  url: "https://optmiz.be",
  locale: "fr_BE",
  language: "fr",
  email: "contact@optmiz.be",
  phoneDisplay: undefined as string | undefined,
  founder: {
    name: "Quentin Devits",
    jobTitle: "Fondateur",
    url: "https://optmiz.be/pourquoi-nous",
  },
  location: {
    city: "Soignies",
    region: "Wallonie",
    country: "BE",
    countryName: "Belgique",
  },
  sameAs: [] as string[],
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
