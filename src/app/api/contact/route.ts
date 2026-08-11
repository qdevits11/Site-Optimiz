import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getMailConfig, isMailConfigured } from "@/config/mail";
import { formatSlotForDisplay, isValidSlotId } from "@/lib/booking";

export const runtime = "nodejs";

type ContactPayload = {
  type?: "contact" | "devis" | "booking";
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
  slotId?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmailHtml(data: ContactPayload) {
  const type = data.type ?? "contact";
  const rows: [string, string][] =
    type === "devis"
      ? [
          ["Nom", data.name],
          ["Téléphone", data.phone || "non renseigné"],
          ["Mail", data.email],
          ["Société", data.company],
          ["Code postal", data.postalCode || "non renseigné"],
          ["Besoin", data.need || "non renseigné"],
          ["Frein principal", data.pain || "non renseigné"],
          ["Taille", data.companySize || "non renseigné"],
          ["Budget", data.budget || "non renseigné"],
          ["Commentaire", data.comment || "non renseigné"],
        ]
      : type === "booking"
        ? [
            ["Nom", data.name],
            ["Téléphone", data.phone || "non renseigné"],
            ["Mail", data.email],
            ["Société", data.company],
            ["Créneau souhaité", data.slotId ? formatSlotForDisplay(data.slotId) : "non renseigné"],
            ["Ville", data.city || "non renseigné"],
            ["Adresse de visite", data.address || "non renseigné"],
            ["Sujet", data.challenge || "non renseigné"],
          ]
        : [
            ["Nom", data.name],
            ["Téléphone", data.phone || "non renseigné"],
            ["Mail", data.email],
            ["Société", data.company],
            ["Principal enjeu", data.challenge || "non renseigné"],
          ];

  const heading =
    type === "devis"
      ? "Nouvelle demande de devis Optmiz"
      : type === "booking"
        ? "Nouvelle réservation de visite Optmiz"
        : "Nouvelle demande Optmiz";

  const intro =
    type === "devis"
      ? "Un visiteur a complété le formulaire de qualification."
      : type === "booking"
        ? "Un visiteur a demandé un créneau pour une première visite sur site."
        : "Un visiteur a complété le formulaire de contact.";

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
    const type =
      body.type === "devis" ? "devis" : body.type === "booking" ? "booking" : "contact";
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
    const slotId = body.slotId?.trim() ?? "";

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
    }

    if (type === "booking") {
      if (!phone || !address || !city || !slotId) {
        return NextResponse.json(
          { error: "Merci de choisir un créneau et d’indiquer téléphone, ville et adresse." },
          { status: 400 },
        );
      }
      if (!isValidSlotId(slotId)) {
        return NextResponse.json(
          { error: "Ce créneau n’est plus disponible. Choisissez un autre horaire." },
          { status: 400 },
        );
      }
    }

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
      slotId,
    };

    const subject =
      type === "devis"
        ? `Nouvelle demande de devis (${company}${postalCode ? ` · ${postalCode}` : ""})`
        : type === "booking"
          ? `Réservation visite (${company}${city ? ` · ${city}` : ""}${slotId ? ` · ${formatSlotForDisplay(slotId)}` : ""})`
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
            `Besoin: ${need}`,
            `Frein: ${pain}`,
            `Taille: ${companySize}`,
            `Budget: ${budget}`,
            `Commentaire: ${comment || "non renseigné"}`,
          ]
        : type === "booking"
          ? [
              "Nouvelle réservation de visite Optmiz",
              "",
              `Nom: ${name}`,
              `Téléphone: ${phone}`,
              `Mail: ${email}`,
              `Société: ${company}`,
              `Créneau: ${formatSlotForDisplay(slotId)}`,
              `Ville: ${city}`,
              `Adresse: ${address}`,
              `Sujet: ${challenge || "non renseigné"}`,
            ]
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
      html: buildEmailHtml(payload),
      text: textLines.join("\n"),
    });

    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Impossible d'envoyer le formulaire pour le moment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
