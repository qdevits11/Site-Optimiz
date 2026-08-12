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
  company?: string;
  need?: string;
  companySize?: string;
};

export async function createVisitEvent(input: CreateVisitEventInput) {
  const config = getBookingConfig();
  const calendar = getCalendarClient();
  const start = new Date(input.start);
  const end = new Date(start.getTime() + config.durationMinutes * 60 * 1000);

  // Re-check availability to avoid race conditions
  const freebusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: new Date(start.getTime() - config.bufferMinutes * 60 * 1000).toISOString(),
      timeMax: new Date(end.getTime() + config.bufferMinutes * 60 * 1000).toISOString(),
      timeZone: config.timeZone,
      items: [{ id: config.calendarId }],
    },
  });
  const busy = freebusy.data.calendars?.[config.calendarId]?.busy || [];
  if (busy.length > 0) {
    throw new Error("Ce créneau vient d’être pris. Choisissez un autre horaire.");
  }

  const summary = input.company
    ? `Visite Optmiz — ${input.name} (${input.company})`
    : `Visite Optmiz — ${input.name}`;

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
  };
}
