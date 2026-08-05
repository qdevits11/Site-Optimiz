/**
 * Configuration SMTP OVH — à renseigner ici (dans l'app).
 *
 * Remplis `user` et `pass` avec ta boîte OVH qui envoie les mails.
 * Destinataire des demandes formulaire : `to`.
 */
export const mailConfig = {
  /** Serveur SMTP OVH : smtp.mail.ovh.net ou ssl0.ovh.net */
  host: "ssl0.ovh.net",

  /** 465 = SSL, 587 = STARTTLS */
  port: 465,

  /** true pour le port 465, false pour 587 */
  secure: true,

  /** Adresse complète de la boîte OVH (ex. contact@optmiz.be) */
  user: "REMPLIR_ADRESSE@optmiz.be",

  /** Mot de passe de cette boîte OVH */
  pass: "REMPLIR_MOT_DE_PASSE",

  /** Expéditeur affiché */
  from: "Optmiz <REMPLIR_ADRESSE@optmiz.be>",

  /** Destinataire des soumissions du formulaire */
  to: "q.devits.optmiz@gmail.com",
} as const;

export function isMailConfigured() {
  return (
    !mailConfig.user.startsWith("REMPLIR_") &&
    !mailConfig.pass.startsWith("REMPLIR_") &&
    Boolean(mailConfig.host && mailConfig.user && mailConfig.pass)
  );
}
