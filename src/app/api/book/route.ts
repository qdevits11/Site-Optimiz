import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getMailConfig, isMailConfigured } from "@/config/mail";
import { createCalBooking, isCalConfigured } from "@/lib/calcom";
import { siteConfig } from "@/lib/seo";
import { buildClientVisitConfirmationEmail } from "@/lib/visit-confirmation-email";

export const runtime = "nodejs";

type BookBody = {
  start?: string;
  name?: string;
  email?: string;
  company?: string;
  city?: string;
  address?: string;
  need?: string;
  companySize?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatSlot(start: string) {
  return new Intl.DateTimeFormat("fr-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: process.env.CAL_TIMEZONE?.trim() || "Europe/Brussels",
  }).format(new Date(start));
}

export async function POST(request: Request) {
  try {
    if (!isCalConfigured()) {
      return NextResponse.json(
        { error: "Réservation indisponible pour le moment. Réessayez plus tard ou contactez-nous." },
        { status: 503 },
      );
    }

    if (!isMailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Configuration mail incomplète. Impossible d’envoyer la confirmation Optmiz.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as BookBody;
    const start = body.start?.trim() ?? "";
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const city = body.city?.trim() ?? "";
    const address = body.address?.trim() ?? "";
    const need = body.need?.trim() ?? "";
    const companySize = body.companySize?.trim() ?? "";
    const fullAddress = [address, city].filter(Boolean).join(", ");

    if (!start || !name || !email || !address || !city || !need || !companySize) {
      return NextResponse.json(
        {
          error:
            "Nom, e-mail, adresse, ville, priorité, taille d’entreprise et créneau sont obligatoires.",
        },
        { status: 400 },
      );
    }

    const booking = await createCalBooking({
      start,
      name,
      email,
      address: fullAddress,
      company,
      need,
      companySize,
    });

    const mailConfig = getMailConfig();
    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: { user: mailConfig.user, pass: mailConfig.pass },
    });

    const slotLabel = formatSlot(start);
    const internalRows: [string, string][] = [
      ["Nom", name],
      ["Mail", email],
      ["Société", company || "non renseigné"],
      ["Priorité", need],
      ["Taille", companySize],
      ["Créneau", slotLabel],
      ["Ville", city],
      ["Adresse de visite", address],
      ["Réservation", booking?.uid || "n/a"],
    ];

    await transporter.sendMail({
      from: mailConfig.from,
      to: mailConfig.to,
      replyTo: email,
      subject: `Visite réservée (${company || name} · ${city} · ${slotLabel})`,
      text: [
        "Nouvelle visite réservée",
        "",
        ...internalRows.map(([label, value]) => `${label}: ${value}`),
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #142e26; line-height: 1.5;">
          <h1 style="font-size: 20px;">Visite réservée</h1>
          <p>Le prospect a choisi un créneau synchronisé avec votre agenda.</p>
          <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
            ${internalRows
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding: 10px 12px; border: 1px solid #d7dfdc; background: #f0f5f4; font-weight: 600; width: 180px;">
                  ${escapeHtml(label)}
                </td>
                <td style="padding: 10px 12px; border: 1px solid #d7dfdc;">
                  ${escapeHtml(value)}
                </td>
              </tr>`,
              )
              .join("")}
          </table>
          <p style="margin-top: 16px; font-size: 13px; color: #5a6b66;">
            ${escapeHtml(siteConfig.name)} · aussi visible dans votre agenda
          </p>
        </div>
      `,
    });

    const clientMail = buildClientVisitConfirmationEmail({
      name,
      email,
      company,
      city,
      address,
      need,
      companySize,
      slotLabel,
      startIso: start,
    });

    await transporter.sendMail({
      from: mailConfig.from,
      to: email,
      replyTo: siteConfig.email,
      subject: clientMail.subject,
      html: clientMail.html,
      text: clientMail.text,
    });

    return NextResponse.json({
      ok: true,
      bookingUid: booking?.uid ?? null,
      start,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Réservation impossible pour le moment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
