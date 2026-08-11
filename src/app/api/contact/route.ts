import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getMailConfig, isMailConfigured } from "@/config/mail";

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
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildEmailHtml(data: ContactPayload) {
  const isDevis = data.type === "devis";
  const rows: [string, string][] = isDevis
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
    : [
        ["Nom", data.name],
        ["Téléphone", data.phone || "non renseigné"],
        ["Mail", data.email],
        ["Société", data.company],
        ["Principal enjeu", data.challenge || "non renseigné"],
      ];

  return `
    <div style="font-family: Arial, sans-serif; color: #142e26; line-height: 1.5;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">
        ${isDevis ? "Nouvelle demande de devis Optmiz" : "Nouvelle demande Optmiz"}
      </h1>
      <p style="margin-bottom: 20px;">
        ${
          isDevis
            ? "Un visiteur a complété le formulaire de qualification."
            : "Un visiteur a complété le formulaire de contact."
        }
      </p>
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
    };

    const subject =
      type === "devis"
        ? `Nouvelle demande de devis (${company}${postalCode ? ` · ${postalCode}` : ""})`
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
