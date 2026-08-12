import { siteConfig, absoluteUrl } from "@/lib/seo";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export type VisitConfirmationDetails = {
  name: string;
  email: string;
  company?: string;
  city: string;
  address: string;
  need: string;
  companySize: string;
  slotLabel: string;
  startIso: string;
};

const brand = {
  bg: "#0b1f1a",
  card: "#102822",
  text: "#e8f5f0",
  muted: "#9bb8ae",
  accent: "#20c894",
  border: "#1e3d34",
};

export function buildClientVisitConfirmationEmail(details: VisitConfirmationDetails) {
  const firstName = details.name.split(/\s+/)[0] || details.name;
  const location = [details.address, details.city].filter(Boolean).join(", ");
  const logoUrl = absoluteUrl("/logo-on-dark.png");

  const html = `
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
                  Visite confirmée
                </p>
                <h1 style="margin:10px 0 0;color:${brand.text};font-size:24px;line-height:1.3;">
                  On se voit bientôt, ${escapeHtml(firstName)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 8px;color:${brand.muted};font-size:15px;line-height:1.55;">
                <p style="margin:0 0 14px;">
                  Votre première visite Optmiz est réservée. Quentin se déplace chez vous —
                  gratuitement et sans engagement.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 8px;">
                  <tr>
                    <td style="padding:12px 14px;border:1px solid ${brand.border};background:#0d211c;border-radius:12px;">
                      <p style="margin:0 0 6px;color:${brand.accent};font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-family:ui-monospace,Menlo,monospace;">Quand</p>
                      <p style="margin:0;color:${brand.text};font-size:16px;font-weight:700;">${escapeHtml(details.slotLabel)}</p>
                    </td>
                  </tr>
                  <tr><td style="height:10px;"></td></tr>
                  <tr>
                    <td style="padding:12px 14px;border:1px solid ${brand.border};background:#0d211c;border-radius:12px;">
                      <p style="margin:0 0 6px;color:${brand.accent};font-size:11px;letter-spacing:0.06em;text-transform:uppercase;font-family:ui-monospace,Menlo,monospace;">Où</p>
                      <p style="margin:0;color:${brand.text};font-size:15px;">${escapeHtml(location)}</p>
                    </td>
                  </tr>
                </table>
                <p style="margin:16px 0 0;color:${brand.muted};font-size:14px;">
                  Priorité notée : <span style="color:${brand.text};">${escapeHtml(details.need)}</span>
                  · Taille : <span style="color:${brand.text};">${escapeHtml(details.companySize)}</span>
                </p>
                <p style="margin:18px 0 0;">
                  Un imprévu ? Répondez à cet e-mail ou écrivez à
                  <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
                  · <a href="${escapeHtml(siteConfig.phoneHref)}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(siteConfig.phoneDisplay)}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 28px;text-align:center;">
                <a href="${absoluteUrl("/#devis")}"
                   style="display:inline-block;background:${brand.accent};color:#06241a;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;font-size:14px;">
                  Voir Optmiz
                </a>
                <p style="margin:18px 0 0;color:${brand.muted};font-size:12px;">
                  ${escapeHtml(siteConfig.name)} · Soignies, Wallonie · ${escapeHtml(siteConfig.url.replace("https://", ""))}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;

  const text = [
    `Visite Optmiz confirmée`,
    "",
    `Bonjour ${firstName},`,
    "",
    "Votre première visite Optmiz est réservée. Quentin se déplace chez vous — gratuitement et sans engagement.",
    "",
    `Quand : ${details.slotLabel}`,
    `Où : ${location}`,
    `Priorité : ${details.need}`,
    `Taille : ${details.companySize}`,
    "",
    `Un imprévu ? ${siteConfig.email} · ${siteConfig.phoneDisplay}`,
    "",
    `${siteConfig.name} · ${siteConfig.url}`,
  ].join("\n");

  return {
    subject: `Visite Optmiz confirmée — ${details.slotLabel}`,
    html,
    text,
  };
}
