import { NextResponse } from "next/server";
import { isMailConfigured } from "@/config/mail";
import { verifyBookingManageToken } from "@/lib/booking-token";
import {
  cancelVisitEvent,
  getVisitEvent,
  isGoogleCalendarConfigured,
  publicCalendarError,
} from "@/lib/google-calendar";
import {
  escapeHtml,
  formatVisitSlot,
  sendClientMail,
  sendInternalMail,
} from "@/lib/mailer";
import { siteConfig } from "@/lib/seo";
import { buildClientVisitCancelledEmail } from "@/lib/visit-confirmation-email";
import { buildCancelVisitIcs } from "@/lib/visit-ics-mail";

export const runtime = "nodejs";

type CancelBody = {
  token?: string;
};

export async function POST(request: Request) {
  try {
    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json(
        { error: "Service indisponible pour le moment." },
        { status: 503 },
      );
    }

    if (!isMailConfigured()) {
      return NextResponse.json(
        { error: "Configuration mail incomplète." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as CancelBody;
    const payload = verifyBookingManageToken(body.token?.trim() || "");
    if (!payload) {
      return NextResponse.json(
        { error: "Lien invalide ou expiré." },
        { status: 401 },
      );
    }

    const existing = await getVisitEvent(payload.eventId);
    if (!existing || existing.email !== payload.email) {
      return NextResponse.json(
        { error: "Ce rendez-vous est introuvable ou déjà annulé." },
        { status: 404 },
      );
    }

    const cancelled = await cancelVisitEvent(payload.eventId);
    const slotLabel = formatVisitSlot(cancelled.start);
    const city =
      cancelled.city ||
      cancelled.address.split(",").map((part) => part.trim()).at(-1) ||
      "";
    const address =
      cancelled.city && cancelled.address.endsWith(cancelled.city)
        ? cancelled.address.slice(0, -(cancelled.city.length + 2)).trim()
        : cancelled.address;

    const clientMail = buildClientVisitCancelledEmail({
      name: cancelled.name,
      email: cancelled.email,
      company: cancelled.company,
      city,
      address,
      need: cancelled.need,
      companySize: cancelled.companySize,
      slotLabel,
      startIso: cancelled.start,
    });

    const icalEvent = buildCancelVisitIcs({
      eventId: cancelled.id,
      name: cancelled.name,
      email: cancelled.email,
      address,
      city,
      company: cancelled.company,
      startIso: cancelled.start,
      endIso: cancelled.end,
      icsSequence: cancelled.icsSequence,
      slotLabel,
    });

    await sendClientMail({
      to: cancelled.email,
      subject: clientMail.subject,
      html: clientMail.html,
      text: clientMail.text,
      icalEvent,
    });

    await sendInternalMail({
      replyTo: cancelled.email,
      subject: `Visite annulée (${cancelled.company || cancelled.name} · ${slotLabel})`,
      text: [
        "Visite annulée par le prospect",
        "",
        `Nom: ${cancelled.name}`,
        `Mail: ${cancelled.email}`,
        `Créneau: ${slotLabel}`,
        `Adresse: ${cancelled.address}`,
        `Événement: ${cancelled.id}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #142e26; line-height: 1.5;">
          <h1 style="font-size: 20px;">Visite annulée</h1>
          <p>Le prospect a annulé via le lien e-mail Optmiz.</p>
          <p><strong>${escapeHtml(cancelled.name)}</strong> · ${escapeHtml(cancelled.email)}</p>
          <p>Créneau : ${escapeHtml(slotLabel)}</p>
          <p style="font-size: 13px; color: #5a6b66;">${escapeHtml(siteConfig.name)}</p>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      slotLabel,
    });
  } catch (err) {
    const message = publicCalendarError(err, "Annulation impossible pour le moment.");
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
