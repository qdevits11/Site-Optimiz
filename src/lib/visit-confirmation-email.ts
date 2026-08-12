import { siteConfig, absoluteUrl } from "@/lib/seo";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export type VisitMailDetails = {
  name: string;
  email: string;
  company?: string;
  city: string;
  address: string;
  need: string;
  companySize: string;
  slotLabel: string;
  startIso: string;
  manageUrl?: string;
  previousSlotLabel?: string;
};

const brand = {
  bg: "#0b1f1a",
  card: "#102822",
  text: "#e8f5f0",
  muted: "#9bb8ae",
  accent: "#20c894",
  border: "#1e3d34",
  danger: "#f0a8a0",
};

function wrapBrandedEmail(opts: {
  eyebrow: string;
  title: string;
  bodyHtml: string;
  footerNote?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}) {
  const logoUrl = absoluteUrl("/logo-on-dark.png");
  const ctas = [opts.primaryCta, opts.secondaryCta].filter(Boolean) as Array<{
    href: string;
    label: string;
  }>;

  return `
  <div style="margin:0;padding:0;background:${brand.bg};font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${brand.bg};padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background:${brand.card};border:1px solid ${brand.border};border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 12px;text-align:center;">
                <img src="${logoUrl}" alt="Optmiz" height="28" style="height:28px;width:auto;display:inline-block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 0;text-align:center;">
                <p style="margin:0;color:${brand.accent};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-family:ui-monospace,Menlo,monospace;">
                  ${escapeHtml(opts.eyebrow)}
                </p>
                <h1 style="margin:10px 0 0;color:${brand.text};font-size:24px;line-height:1.3;">
                  ${opts.title}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 8px;color:${brand.muted};font-size:15px;line-height:1.55;">
                ${opts.bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 28px;text-align:center;">
                ${ctas
                  .map(
                    (cta, index) => `
                  <a href="${escapeHtml(cta.href)}"
                     style="display:inline-block;margin:0 6px 10px;background:${index === 0 ? brand.accent : "transparent"};color:${index === 0 ? "#06241a" : brand.text};text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;font-size:14px;border:1px solid ${index === 0 ? brand.accent : brand.border};">
                    ${escapeHtml(cta.label)}
                  </a>`,
                  )
                  .join("")}
                <p style="margin:18px 0 0;color:${brand.muted};font-size:12px;">
                  ${escapeHtml(opts.footerNote || `${siteConfig.name} · Soignies, Wallonie · ${siteConfig.url.replace("https://", "")}`)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

function locationLine(details: VisitMailDetails) {
  return [details.address, details.city].filter(Boolean).join(", ");
}

function slotCard(label: string, title = "Quand") {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 8px;">
      <tr>
        <td style="padding:12px 14px;border:1px solid ${brand.border};background:#0d211c;border-radius:12px;">
          <p style="margin:0 0 6px;color:${brand.accent};font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-family:ui-monospace,Menlo,monospace;">${escapeHtml(title)}</p>
          <p style="margin:0;color:${brand.text};font-size:16px;font-weight:700;">${escapeHtml(label)}</p>
        </td>
      </tr>
    </table>`;
}

function whereCard(location: string) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:10px 0 8px;">
      <tr>
        <td style="padding:12px 14px;border:1px solid ${brand.border};background:#0d211c;border-radius:12px;">
          <p style="margin:0 0 6px;color:${brand.accent};font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-family:ui-monospace,Menlo,monospace;">Où</p>
          <p style="margin:0;color:${brand.text};font-size:15px;">${escapeHtml(location)}</p>
        </td>
      </tr>
    </table>`;
}

export function buildClientVisitConfirmationEmail(details: VisitMailDetails) {
  const firstName = details.name.split(/\s+/)[0] || details.name;
  const location = locationLine(details);
  const manageUrl = details.manageUrl;

  const bodyHtml = `
    <p style="margin:0 0 14px;">
      Votre première visite Optmiz est réservée. Quentin se déplace chez vous,
      gratuitement et sans engagement.
    </p>
    ${slotCard(details.slotLabel)}
    ${whereCard(location)}
    <p style="margin:16px 0 0;color:${brand.muted};font-size:14px;">
      Priorité notée : <span style="color:${brand.text};">${escapeHtml(details.need)}</span>
      · Taille : <span style="color:${brand.text};">${escapeHtml(details.companySize)}</span>
    </p>
    <p style="margin:18px 0 0;">
      Un fichier agenda (.ics) est joint à cet e-mail : ouvrez-le pour ajouter
      le rendez-vous dans Apple Agenda ou Google Agenda (Android).
    </p>
    <p style="margin:18px 0 0;">
      Besoin de changer de créneau ou d’annuler ? Utilisez les liens ci-dessous.
      Vous pouvez aussi répondre à cet e-mail ou écrire à
      <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
      · <a href="${escapeHtml(siteConfig.phoneHref)}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(siteConfig.phoneDisplay)}</a>
    </p>`;

  const html = wrapBrandedEmail({
    eyebrow: "Visite confirmée",
    title: `On se voit bientôt, ${escapeHtml(firstName)}`,
    bodyHtml,
    primaryCta: manageUrl
      ? { href: `${manageUrl}&action=reschedule`, label: "Modifier le rendez-vous" }
      : undefined,
    secondaryCta: manageUrl
      ? { href: `${manageUrl}&action=cancel`, label: "Annuler le rendez-vous" }
      : undefined,
  });

  const text = [
    `Visite Optmiz confirmée`,
    "",
    `Bonjour ${firstName},`,
    "",
    "Votre première visite Optmiz est réservée. Quentin se déplace chez vous, gratuitement et sans engagement.",
    "",
    `Quand : ${details.slotLabel}`,
    `Où : ${location}`,
    `Priorité : ${details.need}`,
    `Taille : ${details.companySize}`,
    "",
    "Fichier agenda joint (.ics) : ouvrez-le pour l’ajouter à Apple Agenda ou Google Agenda.",
    "",
    manageUrl
      ? `Modifier le rendez-vous : ${manageUrl}&action=reschedule`
      : "",
    manageUrl ? `Annuler le rendez-vous : ${manageUrl}&action=cancel` : "",
    "",
    `Contact : ${siteConfig.email} · ${siteConfig.phoneDisplay}`,
    "",
    `${siteConfig.name} · ${siteConfig.url}`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  return {
    subject: `Visite Optmiz confirmée · ${details.slotLabel}`,
    html,
    text,
  };
}

export function buildClientVisitCancelledEmail(details: VisitMailDetails) {
  const firstName = details.name.split(/\s+/)[0] || details.name;
  const location = locationLine(details);

  const bodyHtml = `
    <p style="margin:0 0 14px;">
      Votre visite prévue le <span style="color:${brand.text};">${escapeHtml(details.slotLabel)}</span>
      a bien été annulée.
    </p>
    ${location ? whereCard(location) : ""}
    <p style="margin:18px 0 0;">
      Un fichier agenda (.ics) est joint : ouvrez-le pour retirer le rendez-vous
      de Apple Agenda ou Google Agenda.
    </p>
    <p style="margin:18px 0 0;">
      Si vous souhaitez reprendre contact plus tard, écrivez-nous à
      <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
      ou appelez le
      <a href="${escapeHtml(siteConfig.phoneHref)}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(siteConfig.phoneDisplay)}</a>.
    </p>`;

  const html = wrapBrandedEmail({
    eyebrow: "Visite annulée",
    title: `C’est noté, ${escapeHtml(firstName)}`,
    bodyHtml,
  });

  const text = [
    `Visite Optmiz annulée`,
    "",
    `Bonjour ${firstName},`,
    "",
    `Votre visite prévue le ${details.slotLabel} a bien été annulée.`,
    location ? `Lieu prévu : ${location}` : "",
    "",
    "Fichier agenda joint (.ics) : ouvrez-le pour retirer le rendez-vous de votre agenda.",
    "",
    `Pour reprendre contact : ${siteConfig.email} · ${siteConfig.phoneDisplay}`,
    "",
    `${siteConfig.name} · ${siteConfig.url}`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `Visite Optmiz annulée · ${details.slotLabel}`,
    html,
    text,
  };
}

export function buildClientVisitRescheduledEmail(details: VisitMailDetails) {
  const firstName = details.name.split(/\s+/)[0] || details.name;
  const location = locationLine(details);
  const manageUrl = details.manageUrl;

  const bodyHtml = `
    <p style="margin:0 0 14px;">
      Votre rendez-vous Optmiz a été modifié.
      ${
        details.previousSlotLabel
          ? `Ancien créneau : <span style="color:${brand.text};">${escapeHtml(details.previousSlotLabel)}</span>.`
          : ""
      }
    </p>
    ${slotCard(details.slotLabel, "Nouveau créneau")}
    ${whereCard(location)}
    <p style="margin:18px 0 0;">
      Un fichier agenda (.ics) est joint : ouvrez-le pour mettre à jour
      le rendez-vous dans Apple Agenda ou Google Agenda.
    </p>
    <p style="margin:18px 0 0;">
      Besoin d’annuler ou de changer encore ? Utilisez les liens ci-dessous, ou contactez
      <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
      · <a href="${escapeHtml(siteConfig.phoneHref)}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(siteConfig.phoneDisplay)}</a>.
    </p>`;

  const html = wrapBrandedEmail({
    eyebrow: "Visite modifiée",
    title: `Nouveau créneau confirmé, ${escapeHtml(firstName)}`,
    bodyHtml,
    primaryCta: manageUrl
      ? { href: `${manageUrl}&action=reschedule`, label: "Modifier à nouveau" }
      : undefined,
    secondaryCta: manageUrl
      ? { href: `${manageUrl}&action=cancel`, label: "Annuler le rendez-vous" }
      : undefined,
  });

  const text = [
    `Visite Optmiz modifiée`,
    "",
    `Bonjour ${firstName},`,
    "",
    "Votre rendez-vous Optmiz a été modifié.",
    details.previousSlotLabel ? `Ancien créneau : ${details.previousSlotLabel}` : "",
    `Nouveau créneau : ${details.slotLabel}`,
    `Où : ${location}`,
    "",
    "Fichier agenda joint (.ics) : ouvrez-le pour mettre à jour votre agenda.",
    "",
    manageUrl
      ? `Modifier à nouveau : ${manageUrl}&action=reschedule`
      : "",
    manageUrl ? `Annuler : ${manageUrl}&action=cancel` : "",
    "",
    `Contact : ${siteConfig.email} · ${siteConfig.phoneDisplay}`,
    "",
    `${siteConfig.name} · ${siteConfig.url}`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  return {
    subject: `Visite Optmiz modifiée · ${details.slotLabel}`,
    html,
    text,
  };
}

/** @deprecated Use VisitMailDetails */
export type VisitConfirmationDetails = VisitMailDetails;
