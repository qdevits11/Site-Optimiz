import { NextResponse } from "next/server";
import { createBookingManageToken } from "@/lib/booking-token";
import {
  findFutureVisitByEmail,
  isGoogleCalendarConfigured,
  publicCalendarError,
} from "@/lib/google-calendar";
import { formatVisitSlot } from "@/lib/mailer";
import { absoluteUrl } from "@/lib/seo";
import { isValidBookingEmail } from "@/lib/booking-validation";

export const runtime = "nodejs";

type CheckBody = {
  email?: string;
};

export async function POST(request: Request) {
  try {
    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json(
        { error: "Service indisponible pour le moment.", configured: false },
        { status: 503 },
      );
    }

    const body = (await request.json()) as CheckBody;
    const email = body.email?.trim() ?? "";

    if (!email || !isValidBookingEmail(email)) {
      return NextResponse.json(
        { error: "Indiquez une adresse e-mail valide (avec @ et un point)." },
        { status: 400 },
      );
    }

    const existing = await findFutureVisitByEmail(email);
    if (!existing) {
      return NextResponse.json({ ok: true, existing: false });
    }

    const manageToken = createBookingManageToken({
      eventId: existing.id,
      email: existing.email,
    });
    const manageUrl = absoluteUrl(`/visite/gerer?token=${encodeURIComponent(manageToken)}`);

    return NextResponse.json({
      ok: true,
      existing: true,
      slotLabel: formatVisitSlot(existing.start),
      start: existing.start,
      manageUrl,
    });
  } catch (err) {
    const message = publicCalendarError(err, "Impossible de vérifier la visite.");
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
