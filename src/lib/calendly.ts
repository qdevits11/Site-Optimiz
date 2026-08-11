/**
 * Lien Calendly pour la première visite chez le client.
 *
 * Définir dans Vercel (Production + Preview) :
 * - NEXT_PUBLIC_CALENDLY_URL = https://calendly.com/votre-compte/visite-optmiz
 *
 * Dans Calendly : connecter Google Calendar / Outlook pour bloquer les
 * créneaux déjà pris, et activer une question « Adresse de la visite »
 * (optionnel — le site collecte déjà l’adresse avant l’embed).
 */

export function getCalendlyUrl(): string {
  return (process.env.NEXT_PUBLIC_CALENDLY_URL || "").trim().replace(/\/$/, "");
}

export function isCalendlyConfigured(): boolean {
  return /^https:\/\/(www\.)?calendly\.com\//i.test(getCalendlyUrl());
}

/** URL Calendly avec préremplissage nom / email. */
export function buildCalendlyPrefillUrl(options: {
  name?: string;
  email?: string;
  /** Texte libre passé en a1 si une question custom existe (adresse). */
  address?: string;
}): string {
  const base = getCalendlyUrl();
  if (!base) return "";

  const url = new URL(base);
  if (options.name) url.searchParams.set("name", options.name);
  if (options.email) url.searchParams.set("email", options.email);
  // a1 = première question personnalisée Calendly (souvent l’adresse)
  if (options.address) url.searchParams.set("a1", options.address);
  return url.toString();
}
