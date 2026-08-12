import { NextResponse } from "next/server";
import { verifyBookingManageToken } from "@/lib/booking-token";
import { getVisitEvent, isGoogleCalendarConfigured } from "@/lib/google-calendar";
import { formatVisitSlot } from "@/lib/mailer";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json(
        { error: "Service indisponible pour le moment." },
        { status: 503 },
      );
    }

    const token = new URL(request.url).searchParams.get("token")?.trim() || "";
    const payload = verifyBookingManageToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Lien invalide ou expiré. Utilisez le lien reçu dans votre e-mail Optmiz." },
        { status: 401 },
      );
    }

    const visit = await getVisitEvent(payload.eventId);
    if (!visit || visit.email !== payload.email) {
      return NextResponse.json(
        { error: "Ce rendez-vous est introuvable ou déjà annulé." },
        { status: 404 },
      );
    }

    const isPast = new Date(visit.start).getTime() <= Date.now();

    return NextResponse.json({
      ok: true,
      visit: {
        start: visit.start,
        slotLabel: formatVisitSlot(visit.start),
        name: visit.name,
        email: visit.email,
        city: visit.city,
        address: visit.address,
        company: visit.company,
        need: visit.need,
        companySize: visit.companySize,
        isPast,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Impossible de charger le rendez-vous.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
