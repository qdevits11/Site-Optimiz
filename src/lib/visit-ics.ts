import { siteConfig } from "@/lib/seo";

export type VisitIcsInput = {
  eventId: string;
  uid?: string;
  sequence: number;
  method: "REQUEST" | "CANCEL";
  status?: "CONFIRMED" | "CANCELLED" | "TENTATIVE";
  startIso: string;
  endIso: string;
  summary: string;
  description?: string;
  location?: string;
  attendeeName: string;
  attendeeEmail: string;
  url?: string;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** UTC timestamp as YYYYMMDDTHHMMSSZ */
export function toIcsUtc(dateInput: string | Date) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return (
    `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}` +
    `T${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}${pad2(date.getUTCSeconds())}Z`
  );
}

function escapeIcsText(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\r\n", "\\n")
    .replaceAll("\n", "\\n")
    .replaceAll("\r", "\\n");
}

/** RFC 5545 folding: max 75 octets per line, continuation starts with space. */
function foldIcsLine(line: string) {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;

  const parts: string[] = [];
  let offset = 0;
  let first = true;
  while (offset < bytes.length) {
    const budget = first ? 75 : 74;
    let end = Math.min(offset + budget, bytes.length);
    while (end > offset && (bytes[end] & 0xc0) === 0x80) end -= 1;
    if (end === offset) end = Math.min(offset + budget, bytes.length);
    const chunk = bytes.subarray(offset, end).toString("utf8");
    parts.push(first ? chunk : ` ${chunk}`);
    offset = end;
    first = false;
  }
  return parts.join("\r\n");
}

export function buildVisitIcsUid(eventId: string) {
  const safe = eventId.replace(/[^a-zA-Z0-9._-]/g, "");
  return `visite-${safe}@optmiz.be`;
}

export function buildVisitIcs(input: VisitIcsInput) {
  const method = input.method;
  const status =
    input.status || (method === "CANCEL" ? "CANCELLED" : "CONFIRMED");
  const uid = input.uid || buildVisitIcsUid(input.eventId);
  const stamp = toIcsUtc(new Date());
  const dtStart = toIcsUtc(input.startIso);
  const dtEnd = toIcsUtc(input.endIso);
  const organizerEmail = siteConfig.email;
  const description = input.description?.trim() || "";

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Optmiz//Visite//FR",
    "CALSCALE:GREGORIAN",
    `METHOD:${method}`,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SEQUENCE:${Math.max(0, Math.floor(input.sequence))}`,
    `STATUS:${status}`,
    `SUMMARY:${escapeIcsText(input.summary)}`,
    input.location ? `LOCATION:${escapeIcsText(input.location)}` : null,
    description ? `DESCRIPTION:${escapeIcsText(description)}` : null,
    input.url ? `URL:${escapeIcsText(input.url)}` : null,
    `ORGANIZER;CN=${escapeIcsText(siteConfig.name)}:mailto:${organizerEmail}`,
    `ATTENDEE;CN=${escapeIcsText(input.attendeeName)};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=FALSE:mailto:${input.attendeeEmail}`,
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter((line): line is string => Boolean(line));

  return `${lines.map(foldIcsLine).join("\r\n")}\r\n`;
}

export function buildVisitIcsAttachment(input: VisitIcsInput) {
  const content = buildVisitIcs(input);
  const method = input.method;
  return {
    method,
    filename: method === "CANCEL" ? "visite-optmiz-annulation.ics" : "visite-optmiz.ics",
    content,
  };
}
