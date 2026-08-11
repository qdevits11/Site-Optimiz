import { NextResponse } from "next/server";
import { fetchCalSlots, isCalConfigured } from "@/lib/calcom";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!isCalConfigured()) {
      return NextResponse.json(
        {
          error:
            "Cal.com non configuré. Ajoutez CAL_API_KEY et CAL_EVENT_TYPE_ID (ou CAL_USERNAME + CAL_EVENT_TYPE_SLUG).",
          configured: false,
        },
        { status: 503 },
      );
    }

    const slots = await fetchCalSlots();
    return NextResponse.json({ ok: true, configured: true, slots });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Impossible de charger les créneaux.";
    return NextResponse.json({ error: message, configured: true }, { status: 502 });
  }
}
