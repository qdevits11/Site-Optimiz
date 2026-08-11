import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getMailConfig, isMailConfigured } from "@/config/mail";
import { buildCalendlyPrefillUrl, getCalendlyUrl, isCalendlyConfigured } from "@/lib/calendly";
import { siteConfig } from "@/lib/seo";

export const runtime = "nodejs";

type ContactPayload = {
  type?: "contact" | "devis";
  name: string;
  phone?: string;
  email: string;
  company: string;
  challenge?: string;
  postalCode?: string;
  comment?: string;
  need?: string;
  pain?: string;
  companySize?: string;
  budget?: string;
  address?: string;
  city?: string;
  sendClientCalendly?: boolean;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmailHtml(data: ContactPayload, calendlyUrl?: string) {
  const type = data.type ?? "contact";
  const rows: [string, string][] =
    type === "devis"
      ? [
          ["Nom", data.name],
          ["Téléphone", data.phone || "non renseigné"],
          ["Mail", data.email],
          ["Société", data.company],
          ["Code postal", data.postalCode || "non renseigné"],
          ["Ville", data.city || "non renseigné"],
          ["Adresse de visite", data.address || "non renseigné"],
          ["Besoin", data.need || "non renseigné"],
          ["Frein principal", data.pain || "non renseigné"],
          ["Taille", data.companySize || "non renseigné"],
          ["Budget", data.budget || "non renseigné"],
          ["Commentaire", data.comment || "non renseigné"],
        ]
      : [
          ["Nom", data.name],
          ["Téléphone", data.phone || "non renseigné"],
          ["Mail", data.email],
          ["Société", data.company],
          ["Principal enjeu", data.challenge || "non renseigné"],
        ];

  const heading =
    type === "devis" ? "Nouvelle demande de devis Optmiz" : "Nouvelle demande Optmiz";

  const intro =
    type === "devis"
      ? "Un visiteur a complété le formulaire de qualification. Il choisit ensuite un créneau Calendly pour la visite sur site."
      : "Un visiteur a complété le formulaire de contact.";

  const calendlyBlock =
    calendlyUrl && type === "devis"
      ? `<p style="margin-top: 20px;">Lien Calendly envoyé au client :<br/><a href="${escapeHtml(calendlyUrl)}">${escapeHtml(calendlyUrl)}</a></p>`
      : "";

  return `
    <div style="font-family: Arial, sans-serif; color: #142e26; line-height: 1.5;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">${heading}</h1>
      <p style="margin-bottom: 20px;">${intro}</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #d7dfdc; background: #f0f5f4; font-weight: 600; width: 180px;">
              ${escapeHtml(label)}
            </td>
            <td style="padding: 10px 12px; border: 1px solid #d7dfdc;">
              ${escapeHtml(value).replaceAll("\n", "<br/>")}
            </td>
          </tr>`,
          )
          .join("")}
      </table>
      ${calendlyBlock}
    </div>
  `;
}

function buildClientCalendlyEmail(options: {
  name: string;
  calendlyUrl: string;
  city?: string;
  address?: string;
}) {
  const locationBits = [options.address, options.city].filter(Boolean).join(", ");
  const locationLine = locationBits
    ? `<p>Visite prévue à l’adresse indiquée : <strong>${escapeHtml(locationBits)}</strong>.</p>`
    : "";

  return `
    <div style="font-family: Arial, sans-serif; color: #142e26; line-height: 1.55;">
      <h1 style="font-size: 20px; margin-bottom: 12px;">Choisissez votre créneau de visite</h1>
      <p>Bonjour ${escapeHtml(options.name)},</p>
      <p>
        Merci pour votre demande. Dernière étape : réservez un créneau pour la première visite
        chez vous (gratuite, sans engagement). Les disponibilités sont synchronisées avec
        l’agenda d’Optmiz.
      </p>
      ${locationLine}
      <p style="margin: 24px 0;">
        <a href="${escapeHtml(options.calendlyUrl)}"
           style="display:inline-block;background:#20c894;color:#06241a;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:999px;">
          Choisir mon créneau
        </a>
      </p>
      <p style="font-size: 13px; color: #5a6b66;">
        Ou copiez ce lien : ${escapeHtml(options.calendlyUrl)}
      </p>
      <p style="margin-top: 28px; font-size: 13px; color: #5a6b66;">
        ${escapeHtml(siteConfig.name)} · ${escapeHtml(siteConfig.email)} · ${escapeHtml(siteConfig.phoneDisplay)}
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    if (!isMailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Configuration mail incomplète. Définis SMTP_HOST, SMTP_USER, SMTP_PASS et SMTP_FROM dans Vercel.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as Partial<ContactPayload>;
    const type = body.type === "devis" ? "devis" : "contact";
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const challenge = body.challenge?.trim() ?? "";
    const postalCode = body.postalCode?.trim() ?? "";
    const comment = body.comment?.trim() ?? "";
    const need = body.need?.trim() ?? "";
    const pain = body.pain?.trim() ?? "";
    const companySize = body.companySize?.trim() ?? "";
    const budget = body.budget?.trim() ?? "";
    const address = body.address?.trim() ?? "";
    const city = body.city?.trim() ?? "";
    const sendClientCalendly = Boolean(body.sendClientCalendly);

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Les champs Nom, Mail et Société sont obligatoires." },
        { status: 400 },
      );
    }

    if (type === "devis") {
      if (!postalCode || !need || !pain || !companySize || !budget) {
        return NextResponse.json(
          { error: "Merci de compléter toutes les étapes du formulaire." },
          { status: 400 },
        );
      }
      if (sendClientCalendly && (!phone || !address || !city)) {
        return NextResponse.json(
          {
            error:
              "Merci d’indiquer téléphone, ville et adresse de visite pour organiser le rendez-vous.",
          },
          { status: 400 },
        );
      }
    }

    const fullAddress = [address, city].filter(Boolean).join(", ");
    const calendlyUrl =
      type === "devis" && isCalendlyConfigured()
        ? buildCalendlyPrefillUrl({ name, email, address: fullAddress })
        : getCalendlyUrl();

    const mailConfig = getMailConfig();

    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
    });

    const payload: ContactPayload = {
      type,
      name,
      phone,
      email,
      company,
      challenge,
      postalCode,
      comment,
      need,
      pain,
      companySize,
      budget,
      address,
      city,
      sendClientCalendly,
    };

    const subject =
      type === "devis"
        ? `Nouvelle demande de devis (${company}${city ? ` · ${city}` : postalCode ? ` · ${postalCode}` : ""})`
        : `Nouvelle demande contact (${company})`;

    const textLines =
      type === "devis"
        ? [
            "Nouvelle demande de devis Optmiz",
            "",
            `Nom: ${name}`,
            `Téléphone: ${phone || "non renseigné"}`,
            `Mail: ${email}`,
            `Société: ${company}`,
            `Code postal: ${postalCode}`,
            `Ville: ${city || "non renseigné"}`,
            `Adresse de visite: ${address || "non renseigné"}`,
            `Besoin: ${need}`,
            `Frein: ${pain}`,
            `Taille: ${companySize}`,
            `Budget: ${budget}`,
            `Commentaire: ${comment || "non renseigné"}`,
            calendlyUrl ? `Calendly client: ${calendlyUrl}` : "",
          ].filter(Boolean)
        : [
            "Nouvelle demande Optmiz",
            "",
            `Nom: ${name}`,
            `Téléphone: ${phone || "non renseigné"}`,
            `Mail: ${email}`,
            `Société: ${company}`,
            `Principal enjeu: ${challenge || "non renseigné"}`,
          ];

    const info = await transporter.sendMail({
      from: mailConfig.from,
      to: mailConfig.to,
      replyTo: email,
      subject,
      html: buildEmailHtml(payload, calendlyUrl || undefined),
      text: textLines.join("\n"),
    });

    if (type === "devis" && sendClientCalendly && calendlyUrl) {
      await transporter.sendMail({
        from: mailConfig.from,
        to: email,
        replyTo: siteConfig.email,
        subject: "Choisissez votre créneau de visite — Optmiz",
        html: buildClientCalendlyEmail({ name, calendlyUrl, city, address }),
        text: [
          `Bonjour ${name},`,
          "",
          "Merci pour votre demande. Réservez un créneau pour la visite chez vous :",
          calendlyUrl,
          "",
          fullAddress ? `Adresse indiquée : ${fullAddress}` : "",
          "",
          `${siteConfig.name} · ${siteConfig.email} · ${siteConfig.phoneDisplay}`,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    }

    return NextResponse.json({
      ok: true,
      id: info.messageId,
      calendlyUrl: calendlyUrl || null,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Impossible d'envoyer le formulaire pour le moment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
