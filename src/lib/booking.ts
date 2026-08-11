/** Créneaux proposés pour une première visite chez le client (heure locale BE). */
export const BOOKING_SLOT_HOURS = ["09:00", "10:30", "14:00", "15:30"] as const;

export const BOOKING_DURATION_MINUTES = 45;
export const BOOKING_HORIZON_DAYS = 21;
/** Jours de la semaine ouverts (1 = lundi … 5 = vendredi). */
export const BOOKING_WEEKDAYS = [1, 2, 3, 4, 5] as const;

export type BookingSlot = {
  /** ISO date YYYY-MM-DD */
  date: string;
  /** HH:mm */
  time: string;
  /** Clé stable date+time */
  id: string;
  label: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat("fr-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

/** Génère les créneaux disponibles à partir de demain, sur BOOKING_HORIZON_DAYS jours ouvrés. */
export function generateBookingSlots(from = new Date()): BookingSlot[] {
  const slots: BookingSlot[] = [];
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);

  for (let offset = 0; offset < BOOKING_HORIZON_DAYS + 10 && slots.length < BOOKING_HORIZON_DAYS * BOOKING_SLOT_HOURS.length; offset++) {
    const day = new Date(start);
    day.setDate(start.getDate() + offset);
    const weekday = day.getDay(); // 0 dimanche
    if (!(BOOKING_WEEKDAYS as readonly number[]).includes(weekday)) continue;

    const dateKey = toDateKey(day);
    const dayLabel = formatDayLabel(day);

    for (const time of BOOKING_SLOT_HOURS) {
      slots.push({
        date: dateKey,
        time,
        id: `${dateKey}T${time}`,
        label: `${dayLabel} · ${time}`,
      });
    }
  }

  return slots;
}

export function isValidSlotId(slotId: string, from = new Date()): boolean {
  return generateBookingSlots(from).some((slot) => slot.id === slotId);
}

export function parseSlotId(slotId: string): { date: string; time: string } | null {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})$/.exec(slotId);
  if (!match) return null;
  return { date: match[1], time: match[2] };
}

export function formatSlotForDisplay(slotId: string): string {
  const parsed = parseSlotId(slotId);
  if (!parsed) return slotId;
  const [y, m, d] = parsed.date.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${formatDayLabel(date)} · ${parsed.time}`;
}
