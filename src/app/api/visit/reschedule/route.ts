import { NextResponse } from "next/server";
import { isMailConfigured } from "@/config/mail";
import {
  createBookingManageToken,
  verifyBookingManageToken,
} from "@/lib/booking-token";
import {
  getVisitEvent,
  isGoogleCalendarConfigured,
  rescheduleVisitEvent,
} from "@/lib/google-calendar";
import {
  escapeHtml,
  formatVisitSlot,
  sendClientMail,
  sendInternalMail,
} from "@/lib/mailer";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { buildClientVisitRescheduledEmail } from "@/lib/visit-confirmation-email";
import { buildRescheduleVisitIcs } from "@/lib/visit-ics-mail";

export const runtime = "nodejs";

type RescheduleBody = {
  token?: string;
  start?: string;
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

    const body = (await request.json()) as RescheduleBody;
    const start = body.start?.trim() || "";
    const payload = verifyBookingManageToken(body.token?.trim() || "");
    if (!payload) {
      return NextResponse.json(
        { error: "Lien invalide ou expiré." },
        { status: 401 },
      );
    }
    if (!start) {
      return NextResponse.json(
        { error: "Choisissez un nouveau créneau." },
        { status: 400 },
      );
    }

    const existing = await getVisitEvent(payload.eventId);
    if (!existing || existing.email !== payload.email) {
      return NextResponse.json(
        { error: "Ce rendez-vous est introuvable ou déjà annulé." },
        { status: 404 },
      );
    }

    const previousSlotLabel = formatVisitSlot(existing.start);
    const updated = await rescheduleVisitEvent(payload.eventId, start);
    const slotLabel = formatVisitSlot(updated.start);

    const manageToken = createBookingManageToken({
      eventId: updated.id,
      email: updated.email,
    });
    const manageUrl = absoluteUrl(`/visite/gerer?token=${encodeURIComponent(manageToken)}`);

    const city =
      updated.city ||
      updated.address.split(",").map((part) => part.trim()).at(-1) ||
      "";
    const address =
      updated.city && updated.address.endsWith(updated.city)
        ? updated.address.slice(0, -(updated.city.length + 2)).trim()
        : updated.address;

    const clientMail = buildClientVisitRescheduledEmail({
      name: updated.name,
      email: updated.email,
      company: updated.company,
      city,
      address,
      need: updated.need,
      companySize: updated.companySize,
      slotLabel,
      startIso: updated.start,
      previousSlotLabel,
      manageUrl,
    });

    const icalEvent = buildRescheduleVisitIcs({
      eventId: updated.id,
      name: updated.name,
      email: updated.email,
      address,
      city,
      company: updated.company,
      startIso: updated.start,
      endIso: updated.end,
      icsSequence: updated.icsSequence,
      manageUrl,
      slotLabel,
    });

    await sendClientMail({
      to: updated.email,
      subject: clientMail.subject,
      html: clientMail.html,
      text: clientMail.text,
      icalEvent,
    });

    await sendInternalMail({
      replyTo: updated.email,
      subject: `Visite modifiée (${updated.company || updated.name} · ${slotLabel})`,
      text: [
        "Visite modifiée par le prospect",
        "",
        `Nom: ${updated.name}`,
        `Mail: ${updated.email}`,
        `Ancien créneau: ${previousSlotLabel}`,
        `Nouveau créneau: ${slotLabel}`,
        `Adresse: ${updated.address}`,
        `Événement: ${updated.id}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; color: #142e26; line-height: 1.5;">
          <h1 style="font-size: 20px;">Visite modifiée</h1>
          <p>Le prospect a changé de créneau via le lien e-mail Optmiz.</p>
          <p><strong>${escapeHtml(updated.name)}</strong> · ${escapeHtml(updated.email)}</p>
          <p>Avant : ${escapeHtml(previousSlotLabel)}</p>
          <p>Après : ${escapeHtml(slotLabel)}</p>
          <p style="font-size: 13px; color: #5a6b66;">${escapeHtml(siteConfig.name)}</p>
        </div>
      `,
    });

    return NextResponse.json({
      ok: true,
      start: updated.start,
      slotLabel,
      previousSlotLabel,
      manageUrl,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Modification impossible pour le moment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
