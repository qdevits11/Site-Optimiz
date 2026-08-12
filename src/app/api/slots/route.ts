import { NextResponse } from "next/server";
import { fetchAvailableSlots, isGoogleCalendarConfigured } from "@/lib/google-calendar";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json(
        {
          error:
            "Les créneaux ne sont pas disponibles pour le moment. Réessayez plus tard ou écrivez à contact@optmiz.be.",
          configured: false,
        },
        { status: 503 },
      );
    }

    const slots = await fetchAvailableSlots();
    return NextResponse.json({ ok: true, configured: true, slots });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Impossible de charger les créneaux.";
    return NextResponse.json({ error: message, configured: true }, { status: 502 });
  }
}
