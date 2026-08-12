import { siteConfig } from "@/lib/seo";
import { buildVisitIcsAttachment } from "@/lib/visit-ics";

type VisitIcsMailSource = {
  eventId: string;
  name: string;
  email: string;
  address: string;
  city?: string;
  company?: string;
  startIso: string;
  endIso: string;
  icsSequence: number;
  manageUrl?: string;
  slotLabel?: string;
};

function locationOf(source: VisitIcsMailSource) {
  return [source.address, source.city].filter(Boolean).join(", ");
}

function summaryOf(source: VisitIcsMailSource) {
  return source.company
    ? `Visite Optmiz · ${source.name} (${source.company})`
    : `Visite Optmiz · ${source.name}`;
}

function descriptionOf(source: VisitIcsMailSource, kind: "confirm" | "reschedule" | "cancel") {
  const lines = [
    kind === "cancel"
      ? "Cette visite Optmiz a été annulée."
      : kind === "reschedule"
        ? "Votre visite Optmiz a été modifiée. Ouvrez ce fichier pour mettre à jour votre agenda."
        : "Votre visite Optmiz est confirmée. Ouvrez ce fichier pour l’ajouter à votre agenda (Apple ou Android).",
    source.slotLabel ? `Quand : ${source.slotLabel}` : null,
    locationOf(source) ? `Où : ${locationOf(source)}` : null,
    source.manageUrl ? `Gérer le rendez-vous : ${source.manageUrl}` : null,
    `Contact Optmiz : ${siteConfig.email} · ${siteConfig.phoneDisplay}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export function buildConfirmVisitIcs(source: VisitIcsMailSource) {
  return buildVisitIcsAttachment({
    eventId: source.eventId,
    sequence: source.icsSequence,
    method: "REQUEST",
    status: "CONFIRMED",
    startIso: source.startIso,
    endIso: source.endIso,
    summary: summaryOf(source),
    description: descriptionOf(source, "confirm"),
    location: locationOf(source),
    attendeeName: source.name,
    attendeeEmail: source.email,
    url: source.manageUrl,
  });
}

export function buildRescheduleVisitIcs(source: VisitIcsMailSource) {
  return buildVisitIcsAttachment({
    eventId: source.eventId,
    sequence: source.icsSequence,
    method: "REQUEST",
    status: "CONFIRMED",
    startIso: source.startIso,
    endIso: source.endIso,
    summary: summaryOf(source),
    description: descriptionOf(source, "reschedule"),
    location: locationOf(source),
    attendeeName: source.name,
    attendeeEmail: source.email,
    url: source.manageUrl,
  });
}

export function buildCancelVisitIcs(source: VisitIcsMailSource) {
  return buildVisitIcsAttachment({
    eventId: source.eventId,
    sequence: source.icsSequence,
    method: "CANCEL",
    status: "CANCELLED",
    startIso: source.startIso,
    endIso: source.endIso,
    summary: summaryOf(source),
    description: descriptionOf(source, "cancel"),
    location: locationOf(source),
    attendeeName: source.name,
    attendeeEmail: source.email,
    url: source.manageUrl,
  });
}
