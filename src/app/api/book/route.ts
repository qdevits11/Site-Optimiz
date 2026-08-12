import { NextResponse } from "next/server";
import { isMailConfigured } from "@/config/mail";
import { createBookingManageToken } from "@/lib/booking-token";
import {
  createVisitEvent,
  findFutureVisitByEmail,
  isGoogleCalendarConfigured,
} from "@/lib/google-calendar";
import {
  escapeHtml,
  formatVisitSlot,
  sendClientMail,
  sendInternalMail,
} from "@/lib/mailer";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { buildClientVisitConfirmationEmail } from "@/lib/visit-confirmation-email";
import { buildConfirmVisitIcs } from "@/lib/visit-ics-mail";

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

export async function POST(request: Request) {
  try {
    if (!isGoogleCalendarConfigured()) {
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

    const existing = await findFutureVisitByEmail(email);
    if (existing) {
      const manageToken = createBookingManageToken({
        eventId: existing.id,
        email: existing.email,
      });
      const manageUrl = absoluteUrl(`/visite/gerer?token=${encodeURIComponent(manageToken)}`);
      return NextResponse.json(
        {
          error:
            "Une visite Optmiz est déjà prévue pour cette adresse e-mail. Utilisez le lien reçu par e-mail pour la modifier ou l’annuler.",
          code: "VISIT_ALREADY_SCHEDULED",
          existingStart: existing.start,
          existingSlotLabel: formatVisitSlot(existing.start),
          manageUrl,
        },
        { status: 409 },
      );
    }

    const event = await createVisitEvent({
      start,
      name,
      email,
      address: fullAddress,
      city,
      company,
      need,
      companySize,
    });

    if (!event.id) {
      return NextResponse.json(
        { error: "La visite a été créée sans identifiant agenda. Contactez-nous." },
        { status: 502 },
      );
    }

    const manageToken = createBookingManageToken({
      eventId: event.id,
      email,
    });
    const manageUrl = absoluteUrl(`/visite/gerer?token=${encodeURIComponent(manageToken)}`);
    const slotLabel = formatVisitSlot(start);

    const internalRows: [string, string][] = [
      ["Nom", name],
      ["Mail", email],
      ["Société", company || "non renseigné"],
      ["Priorité", need],
      ["Taille", companySize],
      ["Créneau", slotLabel],
      ["Ville", city],
      ["Adresse de visite", address],
      ["Événement agenda", event.id],
    ];

    await sendInternalMail({
      replyTo: email,
      subject: `Visite réservée (${company || name} · ${city} · ${slotLabel})`,
      text: [
        "Nouvelle visite réservée",
        "",
        ...internalRows.map(([label, value]) => `${label}: ${value}`),
        event.htmlLink ? `Lien agenda: ${event.htmlLink}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #142e26; line-height: 1.5;">
          <h1 style="font-size: 20px;">Visite réservée</h1>
          <p>Le prospect a choisi un créneau synchronisé avec votre Google Agenda.</p>
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
          ${
            event.htmlLink
              ? `<p style="margin-top:16px;"><a href="${escapeHtml(event.htmlLink)}">Ouvrir dans Google Agenda</a></p>`
              : ""
          }
          <p style="margin-top: 16px; font-size: 13px; color: #5a6b66;">
            ${escapeHtml(siteConfig.name)}
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
      manageUrl,
    });

    const icalEvent = buildConfirmVisitIcs({
      eventId: event.id,
      name,
      email,
      address,
      city,
      company,
      startIso: start,
      endIso: event.end,
      icsSequence: event.icsSequence,
      manageUrl,
      slotLabel,
    });

    await sendClientMail({
      to: email,
      subject: clientMail.subject,
      html: clientMail.html,
      text: clientMail.text,
      icalEvent,
    });

    return NextResponse.json({
      ok: true,
      eventId: event.id,
      start,
      slotLabel,
      manageUrl,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Réservation impossible pour le moment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
