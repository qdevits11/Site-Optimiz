/**
 * Navigation principale du site.
 * Ces libellés courts aident aussi Google à choisir les sitelinks (sous-liens)
 * sous le résultat de marque : on ne peut pas les forcer, mais on aligne
 * menu, footer et JSON-LD SiteNavigationElement sur la même liste.
 */
export const primaryNavLinks = [
  { href: "/services", label: "Services", match: "/services" },
  { href: "/notre-methodologie", label: "Méthode", match: "/notre-methodologie" },
  { href: "/cas-concrets", label: "Cas concrets", match: "/cas-concrets" },
  { href: "/zones", label: "Zones", match: "/zones" },
  { href: "/ressources", label: "Ressources", match: "/ressources" },
  { href: "/tarifs", label: "Tarifs", match: "/tarifs" },
] as const;

/** Pages prioritaires signalées à Google pour les sitelinks de marque. */
export const sitelinkCandidates = [
  { name: "Services", path: "/services" },
  { name: "Méthode", path: "/notre-methodologie" },
  { name: "Tarifs", path: "/tarifs" },
  { name: "Cas concrets", path: "/cas-concrets" },
  { name: "Zones", path: "/zones" },
  { name: "Contact", path: "/contact" },
  { name: "Ressources", path: "/ressources" },
] as const;

export const footerNavLinks = [
  ...primaryNavLinks.map(({ href, label }) => ({ href, label })),
  { href: "/pourquoi-nous", label: "Pourquoi nous" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
