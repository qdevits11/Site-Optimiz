/**
 * Intégration Cal.com (gratuit) pour créneaux réels + réservation.
 *
 * Variables Vercel (Production + Preview) :
 * - CAL_API_KEY            (obligatoire pour slots authentifiés / booking)
 * - CAL_EVENT_TYPE_ID      (recommandé) OU
 * - CAL_USERNAME + CAL_EVENT_TYPE_SLUG
 * - CAL_TIMEZONE           (défaut Europe/Brussels)
 * - CAL_SLOT_HORIZON_DAYS  (défaut 14)
 */

export const CAL_API_BASE = "https://api.cal.com/v2";
export const CAL_SLOTS_VERSION = "2024-09-04";
export const CAL_BOOKINGS_VERSION = "2026-02-25";

export type CalSlot = {
  start: string;
  label: string;
  dayKey: string;
  dayLabel: string;
  timeLabel: string;
};

export function getCalConfig() {
  const eventTypeIdRaw = process.env.CAL_EVENT_TYPE_ID?.trim() || "";
  const eventTypeId = eventTypeIdRaw ? Number(eventTypeIdRaw) : undefined;
  const horizon = Number(process.env.CAL_SLOT_HORIZON_DAYS || "14");

  return {
    apiKey: process.env.CAL_API_KEY?.trim() || "",
    eventTypeId: Number.isFinite(eventTypeId) ? eventTypeId : undefined,
    eventTypeSlug: process.env.CAL_EVENT_TYPE_SLUG?.trim() || "",
    username: process.env.CAL_USERNAME?.trim() || "",
    timeZone: process.env.CAL_TIMEZONE?.trim() || "Europe/Brussels",
    horizonDays: Number.isFinite(horizon) && horizon > 0 ? Math.min(horizon, 31) : 14,
  };
}

export function isCalConfigured() {
  const config = getCalConfig();
  if (!config.apiKey) return false;
  if (config.eventTypeId) return true;
  return Boolean(config.eventTypeSlug && config.username);
}

function authHeaders(apiVersion: string): HeadersInit {
  const { apiKey } = getCalConfig();
  return {
    Authorization: `Bearer ${apiKey}`,
    "cal-api-version": apiVersion,
    "Content-Type": "application/json",
  };
}

function formatDayLabel(isoDate: string, timeZone: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("fr-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone,
  }).format(date);
}

function formatTimeLabel(isoDate: string, timeZone: string) {
  return new Intl.DateTimeFormat("fr-BE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(new Date(isoDate));
}

function dayKey(isoDate: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  }).format(new Date(isoDate));
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toDateParam(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function fetchCalSlots(): Promise<CalSlot[]> {
  const config = getCalConfig();
  if (!isCalConfigured()) {
    throw new Error("Cal.com n’est pas configuré (CAL_API_KEY + event type).");
  }

  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  const end = addDays(start, config.horizonDays);

  const params = new URLSearchParams({
    start: toDateParam(start),
    end: toDateParam(end),
    timeZone: config.timeZone,
  });

  if (config.eventTypeId) {
    params.set("eventTypeId", String(config.eventTypeId));
  } else {
    params.set("eventTypeSlug", config.eventTypeSlug);
    params.set("username", config.username);
  }

  const response = await fetch(`${CAL_API_BASE}/slots?${params.toString()}`, {
    headers: authHeaders(CAL_SLOTS_VERSION),
    cache: "no-store",
  });

  const payload = (await response.json()) as {
    status?: string;
    data?: Record<string, Array<string | { start: string }>>;
    error?: { message?: string };
    message?: string;
  };

  if (!response.ok) {
    throw new Error(
      payload.error?.message || payload.message || `Cal.com slots HTTP ${response.status}`,
    );
  }

  const slots: CalSlot[] = [];
  const data = payload.data || {};

  for (const [dateKey, entries] of Object.entries(data)) {
    for (const entry of entries) {
      const startIso = typeof entry === "string" ? entry : entry.start;
      if (!startIso) continue;
      slots.push({
        start: startIso,
        dayKey: dayKey(startIso, config.timeZone) || dateKey,
        dayLabel: formatDayLabel(startIso, config.timeZone),
        timeLabel: formatTimeLabel(startIso, config.timeZone),
        label: `${formatDayLabel(startIso, config.timeZone)} · ${formatTimeLabel(startIso, config.timeZone)}`,
      });
    }
  }

  return slots.sort((a, b) => a.start.localeCompare(b.start));
}

export type CreateCalBookingInput = {
  start: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  company?: string;
  need?: string;
  companySize?: string;
  note?: string;
};

export async function createCalBooking(input: CreateCalBookingInput) {
  const config = getCalConfig();
  if (!isCalConfigured()) {
    throw new Error("Cal.com n’est pas configuré (CAL_API_KEY + event type).");
  }

  const body: Record<string, unknown> = {
    start: input.start,
    attendee: {
      name: input.name,
      email: input.email,
      timeZone: config.timeZone,
      language: "fr",
      ...(input.phone ? { phoneNumber: input.phone } : {}),
    },
    location: {
      type: "attendeeAddress",
      address: input.address,
    },
    metadata: {
      source: "optmiz-site",
      ...(input.company ? { company: input.company.slice(0, 500) } : {}),
      ...(input.need ? { need: input.need.slice(0, 500) } : {}),
      ...(input.companySize ? { companySize: input.companySize.slice(0, 500) } : {}),
      ...(input.note ? { note: input.note.slice(0, 500) } : {}),
    },
  };

  if (config.eventTypeId) {
    body.eventTypeId = config.eventTypeId;
  } else {
    body.eventTypeSlug = config.eventTypeSlug;
    body.username = config.username;
  }

  const response = await fetch(`${CAL_API_BASE}/bookings`, {
    method: "POST",
    headers: authHeaders(CAL_BOOKINGS_VERSION),
    body: JSON.stringify(body),
  });

  const payload = (await response.json()) as {
    status?: string;
    data?: { uid?: string; id?: number; start?: string; startTime?: string };
    error?: { message?: string };
    message?: string;
  };

  if (!response.ok) {
    throw new Error(
      payload.error?.message || payload.message || `Cal.com booking HTTP ${response.status}`,
    );
  }

  return payload.data;
}
