import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getMailConfig, isMailConfigured } from "@/config/mail";
import { createCalBooking, isCalConfigured } from "@/lib/calcom";
import { siteConfig } from "@/lib/seo";

export const runtime = "nodejs";

type BookBody = {
  start?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  address?: string;
  note?: string;
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

    const body = (await request.json()) as BookBody;
    const start = body.start?.trim() ?? "";
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const city = body.city?.trim() ?? "";
    const address = body.address?.trim() ?? "";
    const note = body.note?.trim() ?? "";
    const fullAddress = [address, city].filter(Boolean).join(", ");

    if (!start || !name || !email || !phone || !address || !city) {
      return NextResponse.json(
        { error: "Nom, e-mail, téléphone, adresse, ville et créneau sont obligatoires." },
        { status: 400 },
      );
    }

    const booking = await createCalBooking({
      start,
      name,
      email,
      phone,
      address: fullAddress,
      company,
      note,
    });

    if (isMailConfigured()) {
      const mailConfig = getMailConfig();
      const transporter = nodemailer.createTransport({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure,
        auth: { user: mailConfig.user, pass: mailConfig.pass },
      });

      const slotLabel = formatSlot(start);
      const rows: [string, string][] = [
        ["Nom", name],
        ["Téléphone", phone],
        ["Mail", email],
        ["Société", company || "non renseigné"],
        ["Créneau", slotLabel],
        ["Ville", city],
        ["Adresse de visite", address],
        ["Note", note || "non renseigné"],
        ["Cal.com UID", booking?.uid || "n/a"],
      ];

      await transporter.sendMail({
        from: mailConfig.from,
        to: mailConfig.to,
        replyTo: email,
        subject: `Visite réservée (${company || name} · ${city} · ${slotLabel})`,
        text: [
          "Nouvelle visite réservée via Cal.com",
          "",
          ...rows.map(([label, value]) => `${label}: ${value}`),
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; color: #142e26; line-height: 1.5;">
            <h1 style="font-size: 20px;">Visite réservée via Cal.com</h1>
            <p>Le prospect a choisi un créneau synchronisé avec votre agenda.</p>
            <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
              ${rows
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
              ${escapeHtml(siteConfig.name)} · confirmation aussi dans Cal.com / votre agenda
            </p>
          </div>
        `,
      });
    }

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
