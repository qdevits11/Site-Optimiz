/**
 * Configuration SMTP lue depuis les variables d'environnement Vercel.
 *
 * À définir dans Project → Settings → Environment Variables :
 * - SMTP_HOST   (ex. ssl0.ovh.net ou smtp.mail.ovh.net)
 * - SMTP_PORT   (ex. 465 ou 587)
 * - SMTP_USER   (adresse OVH complète)
 * - SMTP_PASS   (mot de passe de la boîte)
 * - SMTP_FROM   (ex. Optmiz <contact@optmiz.be>)
 * - CONTACT_TO_EMAIL (ex. q.devits.optmiz@gmail.com)
 */
export function getMailConfig() {
  const port = Number(process.env.SMTP_PORT || "465");

  return {
    host: process.env.SMTP_HOST || "",
    port: Number.isFinite(port) ? port : 465,
    secure: (process.env.SMTP_SECURE || (port === 465 ? "true" : "false")) === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
    to: process.env.CONTACT_TO_EMAIL || "q.devits.optmiz@gmail.com",
  };
}

export function isMailConfigured() {
  const config = getMailConfig();
  return Boolean(config.host && config.user && config.pass && config.from && config.to);
}
