/**
 * Navigation principale du site.
 * Ces libellés courts aident aussi Google à choisir les sitelinks (sous-liens)
 * sous le résultat de marque : on ne peut pas les forcer, mais on aligne
 * menu, footer et JSON-LD SiteNavigationElement sur la même liste.
 */
export const primaryNavLinks = [
  { href: "/services", label: "Solutions", match: "/services" },
  { href: "/notre-methodologie", label: "Méthode", match: "/notre-methodologie" },
  { href: "/cas-concrets", label: "Cas concrets", match: "/cas-concrets" },
  { href: "/pourquoi-nous", label: "Pourquoi Optmiz", match: "/pourquoi-nous" },
  { href: "/tarifs", label: "Tarifs", match: "/tarifs" },
  { href: "/ressources", label: "Ressources", match: "/ressources" },
] as const;

/** Pages prioritaires signalées à Google pour les sitelinks de marque. */
export const sitelinkCandidates = [
  { name: "Solutions", path: "/services" },
  { name: "Méthode", path: "/notre-methodologie" },
  { name: "Cas concrets", path: "/cas-concrets" },
  { name: "Pourquoi Optmiz", path: "/pourquoi-nous" },
  { name: "Tarifs", path: "/tarifs" },
  { name: "Ressources", path: "/ressources" },
  { name: "Contact", path: "/contact" },
] as const;

export const footerNavLinks = [
  ...primaryNavLinks.map(({ href, label }) => ({ href, label })),
  { href: "/zones", label: "Zones" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
