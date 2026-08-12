import { google } from "googleapis";

/**
 * Réservation via Google Calendar (gratuit).
 *
 * Variables Vercel :
 * - GOOGLE_CLIENT_ID
 * - GOOGLE_CLIENT_SECRET
 * - GOOGLE_REFRESH_TOKEN
 * - GOOGLE_CALENDAR_ID          (défaut: primary)
 * - BOOKING_TIMEZONE            (défaut: Europe/Brussels)
 * - BOOKING_DURATION_MINUTES    (défaut: 45)
 * - BOOKING_SLOT_TIMES          (défaut: 09:00,10:30,14:00,15:30)
 * - BOOKING_HORIZON_DAYS        (défaut: 14)
 * - BOOKING_BUFFER_MINUTES      (défaut: 15) — marge autour des événements existants
 */

export type BookingSlot = {
  start: string;
  label: string;
  dayKey: string;
  dayLabel: string;
  timeLabel: string;
};

function getBookingConfig() {
  const duration = Number(process.env.BOOKING_DURATION_MINUTES || "45");
  const horizon = Number(process.env.BOOKING_HORIZON_DAYS || "14");
  const buffer = Number(process.env.BOOKING_BUFFER_MINUTES || "15");
  const slotTimes = (process.env.BOOKING_SLOT_TIMES || "09:00,10:30,14:00,15:30")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    clientId: process.env.GOOGLE_CLIENT_ID?.trim() || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET?.trim() || "",
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN?.trim() || "",
    calendarId: process.env.GOOGLE_CALENDAR_ID?.trim() || "primary",
    timeZone: process.env.BOOKING_TIMEZONE?.trim() || "Europe/Brussels",
    durationMinutes: Number.isFinite(duration) && duration > 0 ? duration : 45,
    horizonDays: Number.isFinite(horizon) && horizon > 0 ? Math.min(horizon, 31) : 14,
    bufferMinutes: Number.isFinite(buffer) && buffer >= 0 ? buffer : 15,
    slotTimes: slotTimes.length ? slotTimes : ["09:00", "10:30", "14:00", "15:30"],
  };
}

export function isGoogleCalendarConfigured() {
  const config = getBookingConfig();
  return Boolean(config.clientId && config.clientSecret && config.refreshToken);
}

function getCalendarClient() {
  const config = getBookingConfig();
  if (!isGoogleCalendarConfigured()) {
    throw new Error("Google Calendar n’est pas configuré (OAuth).");
  }

  const auth = new google.auth.OAuth2(config.clientId, config.clientSecret);
  auth.setCredentials({ refresh_token: config.refreshToken });
  return google.calendar({ version: "v3", auth });
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Parts of a calendar date in a given IANA timezone. */
function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value || "";

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    second: Number(get("second")),
    weekday: get("weekday"),
  };
}

function dayKeyFromParts(parts: { year: number; month: number; day: number }) {
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`;
}

/**
 * Convert a local wall time in `timeZone` to a UTC Date.
 * Uses binary search against Intl (no extra deps).
 */
function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const target = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00`;
  let lo = Date.UTC(year, month - 1, day - 1, 0, 0, 0);
  let hi = Date.UTC(year, month - 1, day + 1, 23, 59, 59);

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const p = zonedParts(new Date(mid), timeZone);
    const current = `${p.year}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}:${pad(p.second)}`;
    if (current === `${target}:00`) return new Date(mid);
    if (current < `${target}:00`) lo = mid + 1;
    else hi = mid - 1;
  }

  // Fallback: approximate with midday probe
  return new Date(lo);
}

function formatDayLabel(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("fr-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone,
  }).format(date);
}

function formatTimeLabel(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("fr-BE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(date);
}

function isWeekday(parts: { weekday: string }) {
  return !["Sat", "Sun"].includes(parts.weekday);
}

function overlaps(
  startA: number,
  endA: number,
  startB: number,
  endB: number,
) {
  return startA < endB && endA > startB;
}

function buildCandidateSlots(from: Date = new Date()): BookingSlot[] {
  const config = getBookingConfig();
  const slots: BookingSlot[] = [];
  const startProbe = new Date(from.getTime() + 60 * 60 * 1000); // ignore next hour

  for (let offset = 0; offset < config.horizonDays + 2; offset++) {
    const probe = new Date(from.getTime() + offset * 24 * 60 * 60 * 1000);
    const parts = zonedParts(probe, config.timeZone);
    if (!isWeekday(parts)) continue;

    for (const time of config.slotTimes) {
      const [hh, mm] = time.split(":").map(Number);
      const startUtc = zonedTimeToUtc(parts.year, parts.month, parts.day, hh, mm, config.timeZone);
      if (startUtc.getTime() < startProbe.getTime()) continue;

      const dayKey = dayKeyFromParts(parts);
      slots.push({
        start: startUtc.toISOString(),
        dayKey,
        dayLabel: formatDayLabel(startUtc, config.timeZone),
        timeLabel: formatTimeLabel(startUtc, config.timeZone),
        label: `${formatDayLabel(startUtc, config.timeZone)} · ${formatTimeLabel(startUtc, config.timeZone)}`,
      });
    }
  }

  return slots;
}

export async function fetchAvailableSlots(): Promise<BookingSlot[]> {
  const config = getBookingConfig();
  const candidates = buildCandidateSlots();
  if (!candidates.length) return [];

  const calendar = getCalendarClient();
  const timeMin = candidates[0].start;
  const lastStart = new Date(candidates[candidates.length - 1].start);
  const timeMax = new Date(
    lastStart.getTime() + config.durationMinutes * 60 * 1000,
  ).toISOString();

  const freebusy = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: config.timeZone,
      items: [{ id: config.calendarId }],
    },
  });

  const busy = freebusy.data.calendars?.[config.calendarId]?.busy || [];
  const bufferMs = config.bufferMinutes * 60 * 1000;
  const durationMs = config.durationMinutes * 60 * 1000;

  return candidates.filter((slot) => {
    const start = new Date(slot.start).getTime();
    const end = start + durationMs;
    return !busy.some((block) => {
      if (!block.start || !block.end) return false;
      const busyStart = new Date(block.start).getTime() - bufferMs;
      const busyEnd = new Date(block.end).getTime() + bufferMs;
      return overlaps(start, end, busyStart, busyEnd);
    });
  });
}

export type CreateVisitEventInput = {
  start: string;
  name: string;
  email: string;
  address: string;
  city?: string;
  company?: string;
  need?: string;
  companySize?: string;
};

export type VisitEventDetails = {
  id: string;
  start: string;
  end: string;
  name: string;
  email: string;
  address: string;
  city: string;
  company: string;
  need: string;
  companySize: string;
  status: string;
  htmlLink: string | null;
  icsSequence: number;
};

const OPTMIZ_MARKER = "optmizVisit";

function buildVisitPrivateProps(input: {
  email: string;
  name: string;
  city?: string;
  company?: string;
  need?: string;
  companySize?: string;
  icsSequence?: number;
}) {
  return {
    [OPTMIZ_MARKER]: "1",
    optmizEmail: input.email.trim().toLowerCase(),
    optmizName: input.name,
    optmizIcsSequence: String(
      Number.isFinite(input.icsSequence) ? Math.max(0, Math.floor(input.icsSequence!)) : 0,
    ),
    ...(input.city ? { optmizCity: input.city } : {}),
    ...(input.company ? { optmizCompany: input.company } : {}),
    ...(input.need ? { optmizNeed: input.need } : {}),
    ...(input.companySize ? { optmizCompanySize: input.companySize } : {}),
  };
}

function parseVisitFromEvent(event: {
  id?: string | null;
  status?: string | null;
  summary?: string | null;
  description?: string | null;
  location?: string | null;
  htmlLink?: string | null;
  start?: { dateTime?: string | null; date?: string | null } | null;
  end?: { dateTime?: string | null; date?: string | null } | null;
  attendees?: Array<{ email?: string | null; displayName?: string | null }> | null;
  extendedProperties?: { private?: Record<string, string> | null } | null;
}): VisitEventDetails | null {
  const id = event.id;
  const start = event.start?.dateTime || event.start?.date;
  if (!id || !start) return null;
  if (event.status === "cancelled") return null;

  const priv = event.extendedProperties?.private || {};
  const attendee = event.attendees?.find((a) => a.email) || event.attendees?.[0];
  const email =
    (priv.optmizEmail || attendee?.email || "").trim().toLowerCase();
  if (!email) return null;

  const description = event.description || "";
  const pickDesc = (label: string) => {
    const match = description.match(new RegExp(`^${label}\\s*:\\s*(.+)$`, "im"));
    return match?.[1]?.trim() || "";
  };

  const name =
    priv.optmizName ||
    attendee?.displayName ||
    pickDesc("Contact").replace(/<[^>]+>/, "").trim() ||
    "Prospect";

  return {
    id,
    start: new Date(start).toISOString(),
    end: new Date(
      event.end?.dateTime ||
        event.end?.date ||
        new Date(start).getTime() + getBookingConfig().durationMinutes * 60 * 1000,
    ).toISOString(),
    name,
    email,
    address: event.location || pickDesc("Adresse") || "",
    city: priv.optmizCity || "",
    company: priv.optmizCompany || pickDesc("Société") || "",
    need: priv.optmizNeed || pickDesc("Priorité") || "",
    companySize: priv.optmizCompanySize || pickDesc("Taille") || "",
    status: event.status || "confirmed",
    htmlLink: event.htmlLink || null,
    icsSequence: Number.parseInt(priv.optmizIcsSequence || "0", 10) || 0,
  };
}

async function assertSlotFree(start: Date, end: Date, ignoreEventId?: string) {
  const config = getBookingConfig();
  const calendar = getCalendarClient();
  const freebusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: new Date(start.getTime() - config.bufferMinutes * 60 * 1000).toISOString(),
      timeMax: new Date(end.getTime() + config.bufferMinutes * 60 * 1000).toISOString(),
      timeZone: config.timeZone,
      items: [{ id: config.calendarId }],
    },
  });
  const busy = freebusy.data.calendars?.[config.calendarId]?.busy || [];
  if (busy.length === 0) return;

  if (ignoreEventId) {
    // freebusy includes our own event when rescheduling; re-check with events.list
    const listed = await calendar.events.list({
      calendarId: config.calendarId,
      timeMin: new Date(start.getTime() - config.bufferMinutes * 60 * 1000).toISOString(),
      timeMax: new Date(end.getTime() + config.bufferMinutes * 60 * 1000).toISOString(),
      singleEvents: true,
      maxResults: 20,
    });
    const conflicting = (listed.data.items || []).filter((item) => {
      if (!item.id || item.id === ignoreEventId || item.status === "cancelled") return false;
      const otherStart = item.start?.dateTime || item.start?.date;
      const otherEnd = item.end?.dateTime || item.end?.date;
      if (!otherStart || !otherEnd) return false;
      const bufferMs = config.bufferMinutes * 60 * 1000;
      return overlaps(
        start.getTime(),
        end.getTime(),
        new Date(otherStart).getTime() - bufferMs,
        new Date(otherEnd).getTime() + bufferMs,
      );
    });
    if (conflicting.length === 0) return;
  }

  throw new Error("Ce créneau vient d’être pris. Choisissez un autre horaire.");
}

export async function createVisitEvent(input: CreateVisitEventInput) {
  const config = getBookingConfig();
  const calendar = getCalendarClient();
  const start = new Date(input.start);
  const end = new Date(start.getTime() + config.durationMinutes * 60 * 1000);

  await assertSlotFree(start, end);

  const summary = input.company
    ? `Visite Optmiz · ${input.name} (${input.company})`
    : `Visite Optmiz · ${input.name}`;

  const description = [
    "Première visite Optmiz (réservée via le site).",
    `Contact : ${input.name} <${input.email}>`,
    input.company ? `Société : ${input.company}` : null,
    input.need ? `Priorité : ${input.need}` : null,
    input.companySize ? `Taille : ${input.companySize}` : null,
    `Adresse : ${input.address}`,
  ]
    .filter(Boolean)
    .join("\n");

  const event = await calendar.events.insert({
    calendarId: config.calendarId,
    // Important: no Google invitation email to the prospect
    sendUpdates: "none",
    requestBody: {
      summary,
      description,
      location: input.address,
      start: { dateTime: start.toISOString(), timeZone: config.timeZone },
      end: { dateTime: end.toISOString(), timeZone: config.timeZone },
      // Keep attendee for your calendar UI, but sendUpdates:none prevents Google mail
      attendees: [{ email: input.email, displayName: input.name }],
      extendedProperties: {
        private: buildVisitPrivateProps({ ...input, icsSequence: 0 }),
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 60 },
          { method: "popup", minutes: 1440 },
        ],
      },
    },
  });

  return {
    id: event.data.id || null,
    htmlLink: event.data.htmlLink || null,
    start: start.toISOString(),
    end: end.toISOString(),
    icsSequence: 0,
  };
}

export async function getVisitEvent(eventId: string): Promise<VisitEventDetails | null> {
  const config = getBookingConfig();
  const calendar = getCalendarClient();
  try {
    const event = await calendar.events.get({
      calendarId: config.calendarId,
      eventId,
    });
    return parseVisitFromEvent(event.data);
  } catch (err) {
    const status = (err as { code?: number })?.code;
    if (status === 404) return null;
    throw err;
  }
}

export async function findFutureVisitByEmail(
  email: string,
): Promise<VisitEventDetails | null> {
  const config = getBookingConfig();
  const calendar = getCalendarClient();
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  const now = new Date();
  const timeMax = new Date(
    now.getTime() + Math.max(config.horizonDays, 90) * 24 * 60 * 60 * 1000,
  );

  const byProp = await calendar.events.list({
    calendarId: config.calendarId,
    timeMin: now.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 25,
    privateExtendedProperty: [`optmizEmail=${normalized}`],
  });

  for (const item of byProp.data.items || []) {
    const parsed = parseVisitFromEvent(item);
    if (parsed && new Date(parsed.start).getTime() > now.getTime()) {
      return parsed;
    }
  }

  // Fallback for older events without extended properties
  const listed = await calendar.events.list({
    calendarId: config.calendarId,
    timeMin: now.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 50,
    q: "Visite Optmiz",
  });

  for (const item of listed.data.items || []) {
    const parsed = parseVisitFromEvent(item);
    if (
      parsed &&
      parsed.email === normalized &&
      new Date(parsed.start).getTime() > now.getTime()
    ) {
      return parsed;
    }
  }

  return null;
}

export async function cancelVisitEvent(eventId: string) {
  const config = getBookingConfig();
  const calendar = getCalendarClient();
  const existing = await getVisitEvent(eventId);
  if (!existing) {
    throw new Error("Ce rendez-vous est introuvable ou déjà annulé.");
  }
  if (new Date(existing.start).getTime() <= Date.now()) {
    throw new Error("Ce rendez-vous est déjà passé et ne peut plus être annulé en ligne.");
  }

  const icsSequence = existing.icsSequence + 1;

  await calendar.events.delete({
    calendarId: config.calendarId,
    eventId,
    sendUpdates: "none",
  });

  return {
    ...existing,
    icsSequence,
  };
}

export async function rescheduleVisitEvent(eventId: string, newStartIso: string) {
  const config = getBookingConfig();
  const calendar = getCalendarClient();
  const existing = await getVisitEvent(eventId);
  if (!existing) {
    throw new Error("Ce rendez-vous est introuvable ou déjà annulé.");
  }
  if (new Date(existing.start).getTime() <= Date.now()) {
    throw new Error("Ce rendez-vous est déjà passé et ne peut plus être modifié en ligne.");
  }

  const start = new Date(newStartIso);
  if (Number.isNaN(start.getTime()) || start.getTime() <= Date.now()) {
    throw new Error("Choisissez un créneau futur.");
  }
  const end = new Date(start.getTime() + config.durationMinutes * 60 * 1000);
  const icsSequence = existing.icsSequence + 1;

  await assertSlotFree(start, end, eventId);

  const updated = await calendar.events.patch({
    calendarId: config.calendarId,
    eventId,
    sendUpdates: "none",
    requestBody: {
      start: { dateTime: start.toISOString(), timeZone: config.timeZone },
      end: { dateTime: end.toISOString(), timeZone: config.timeZone },
      extendedProperties: {
        private: buildVisitPrivateProps({
          email: existing.email,
          name: existing.name,
          city: existing.city || undefined,
          company: existing.company || undefined,
          need: existing.need || undefined,
          companySize: existing.companySize || undefined,
          icsSequence,
        }),
      },
    },
  });

  return (
    parseVisitFromEvent(updated.data) || {
      ...existing,
      start: start.toISOString(),
      end: end.toISOString(),
      icsSequence,
    }
  );
}
