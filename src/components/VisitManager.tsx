"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/seo";

type CalSlot = {
  start: string;
  label: string;
  dayKey: string;
  dayLabel: string;
  timeLabel: string;
};

type VisitInfo = {
  start: string;
  slotLabel: string;
  name: string;
  email: string;
  city: string;
  address: string;
  company: string;
  need: string;
  companySize: string;
  isPast: boolean;
};

type Mode = "overview" | "reschedule" | "cancel" | "cancelled" | "rescheduled";

const WEEKDAYS = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"] as const;

function groupSlotsByDay(slots: CalSlot[]) {
  const map = new Map<string, CalSlot[]>();
  for (const slot of slots) {
    const list = map.get(slot.dayKey) ?? [];
    list.push(slot);
    map.set(slot.dayKey, list);
  }
  return map;
}

function parseDayKey(dayKey: string) {
  const [y, m, d] = dayKey.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toDayKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("fr-BE", { month: "long", year: "numeric" }).format(date);
}

function buildMonthCells(viewMonth: Date, availableDays: Set<string>) {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (first.getDay() + 6) % 7;
  const cells: Array<{
    key: string;
    day: number | null;
    dayKey: string | null;
    available: boolean;
    past: boolean;
  }> = [];

  for (let i = 0; i < startOffset; i++) {
    cells.push({ key: `e-${i}`, day: null, dayKey: null, available: false, past: false });
  }

  const todayKey = toDayKey(new Date());
  for (let day = 1; day <= daysInMonth; day++) {
    const dayKey = toDayKey(new Date(year, month, day));
    cells.push({
      key: dayKey,
      day,
      dayKey,
      available: availableDays.has(dayKey),
      past: dayKey < todayKey,
    });
  }

  return cells;
}

type VisitManagerProps = {
  token: string;
  initialAction?: string | null;
};

export function VisitManager({ token, initialAction }: VisitManagerProps) {
  const [visit, setVisit] = useState<VisitInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>(() => {
    if (initialAction === "cancel") return "cancel";
    if (initialAction === "reschedule") return "reschedule";
    return "overview";
  });
  const [pending, setPending] = useState(false);
  const [resultLabel, setResultLabel] = useState<string | null>(null);

  const [slots, setSlots] = useState<CalSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedStart, setSelectedStart] = useState("");

  const slotsByDay = useMemo(() => groupSlotsByDay(slots), [slots]);
  const availableDays = useMemo(() => new Set(slotsByDay.keys()), [slotsByDay]);
  const monthCells = useMemo(
    () => buildMonthCells(viewMonth, availableDays),
    [viewMonth, availableDays],
  );
  const daySlots = selectedDay ? (slotsByDay.get(selectedDay) ?? []) : [];
  const selectedDayLabel = daySlots[0]?.dayLabel ?? "";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/visit?token=${encodeURIComponent(token)}`)
      .then(async (response) => {
        const payload = (await response.json()) as {
          error?: string;
          visit?: VisitInfo;
        };
        if (!response.ok) throw new Error(payload.error || "Rendez-vous introuvable.");
        if (cancelled) return;
        setVisit(payload.visit || null);
        if (payload.visit?.isPast) setMode("overview");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Rendez-vous introuvable.");
        setVisit(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (mode !== "reschedule") return;
    let cancelled = false;
    setSlotsLoading(true);
    setSlotsError(null);
    setSelectedDay("");
    setSelectedStart("");

    fetch("/api/slots")
      .then(async (response) => {
        const payload = (await response.json()) as { error?: string; slots?: CalSlot[] };
        if (!response.ok) throw new Error(payload.error || "Créneaux indisponibles.");
        if (cancelled) return;
        const nextSlots = (payload.slots ?? []).filter((slot) => slot.start !== visit?.start);
        setSlots(nextSlots);
        if (nextSlots[0]) {
          setViewMonth(
            new Date(
              parseDayKey(nextSlots[0].dayKey).getFullYear(),
              parseDayKey(nextSlots[0].dayKey).getMonth(),
              1,
            ),
          );
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setSlotsError(err instanceof Error ? err.message : "Créneaux indisponibles.");
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [mode, visit?.start]);

  async function onCancelConfirm(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/visit/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const payload = (await response.json()) as { error?: string; slotLabel?: string };
      if (!response.ok) throw new Error(payload.error || "Annulation impossible.");
      setResultLabel(payload.slotLabel || visit?.slotLabel || null);
      setMode("cancelled");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Annulation impossible.");
    } finally {
      setPending(false);
    }
  }

  async function onRescheduleConfirm() {
    if (!selectedStart) {
      setError("Choisissez une date puis un horaire.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/visit/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, start: selectedStart }),
      });
      const payload = (await response.json()) as { error?: string; slotLabel?: string };
      if (!response.ok) throw new Error(payload.error || "Modification impossible.");
      setResultLabel(payload.slotLabel || selectedStart);
      setMode("rescheduled");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Modification impossible.");
    } finally {
      setPending(false);
    }
  }

  if (loading) {
    return (
      <div className="visit-manage-card">
        <p className="page-kicker font-mono">Rendez-vous</p>
        <p>Chargement de votre visite…</p>
      </div>
    );
  }

  if (error && !visit && mode !== "cancelled" && mode !== "rescheduled") {
    return (
      <div className="visit-manage-card">
        <p className="page-kicker font-mono">Lien invalide</p>
        <h1 className="font-display visit-manage-title">Impossible d’ouvrir ce rendez-vous</h1>
        <p className="form-error" role="alert">
          {error}
        </p>
        <p>
          Écrivez-nous à{" "}
          <a className="text-link" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>{" "}
          ou appelez le{" "}
          <a className="text-link" href={siteConfig.phoneHref}>
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  if (mode === "cancelled") {
    return (
      <div className="visit-manage-card">
        <p className="page-kicker font-mono">Annulé</p>
        <h1 className="font-display visit-manage-title">Visite annulée</h1>
        <p>
          Votre rendez-vous
          {resultLabel ? (
            <>
              {" "}
              du <strong>{resultLabel}</strong>
            </>
          ) : null}{" "}
          a bien été annulé. Une confirmation vous a été envoyée par e-mail.
        </p>
      </div>
    );
  }

  if (mode === "rescheduled") {
    return (
      <div className="visit-manage-card">
        <p className="page-kicker font-mono">Modifié</p>
        <h1 className="font-display visit-manage-title">Nouveau créneau confirmé</h1>
        <p>
          Visite reportée au <strong>{resultLabel}</strong>. Une confirmation vous a été envoyée
          par e-mail.
        </p>
      </div>
    );
  }

  if (!visit) return null;

  if (visit.isPast) {
    return (
      <div className="visit-manage-card">
        <p className="page-kicker font-mono">Rendez-vous passé</p>
        <h1 className="font-display visit-manage-title">Cette visite a déjà eu lieu</h1>
        <p>
          Créneau : <strong>{visit.slotLabel}</strong>
        </p>
        <p>
          Pour une nouvelle rencontre, contactez{" "}
          <a className="text-link" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    );
  }

  if (mode === "cancel") {
    return (
      <div className="visit-manage-card">
        <p className="page-kicker font-mono">Annulation</p>
        <h1 className="font-display visit-manage-title">Annuler la visite</h1>
        <p>
          Confirmez l’annulation du rendez-vous du <strong>{visit.slotLabel}</strong>
          {visit.address ? <> à {visit.address}</> : null}.
        </p>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <form onSubmit={onCancelConfirm} className="visit-manage-actions">
          <button type="submit" className="btn-danger-glow btn-cta" disabled={pending}>
            {pending ? "Annulation…" : "Confirmer l’annulation"}
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setError(null);
              setMode("overview");
            }}
          >
            Retour
          </button>
        </form>
      </div>
    );
  }

  if (mode === "reschedule") {
    return (
      <div className="visit-manage-card">
        <p className="page-kicker font-mono">Modification</p>
        <h1 className="font-display visit-manage-title">Choisir un nouveau créneau</h1>
        <p>
          Créneau actuel : <strong>{visit.slotLabel}</strong>
        </p>

        {slotsLoading ? <p>Chargement des disponibilités…</p> : null}
        {slotsError ? (
          <p className="form-error" role="alert">
            {slotsError}
          </p>
        ) : null}

        {!slotsLoading && !slotsError ? (
          <>
            <div className="lead-calendar" style={{ marginTop: "1rem" }}>
              <div className="lead-calendar-nav">
                <button
                  type="button"
                  className="lead-calendar-nav-btn"
                  aria-label="Mois précédent"
                  onClick={() =>
                    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
                  }
                >
                  ‹
                </button>
                <p className="lead-calendar-month">{monthLabel(viewMonth)}</p>
                <button
                  type="button"
                  className="lead-calendar-nav-btn"
                  aria-label="Mois suivant"
                  onClick={() =>
                    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
                  }
                >
                  ›
                </button>
              </div>
              <div className="lead-calendar-weekdays" aria-hidden>
                {WEEKDAYS.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="lead-calendar-grid" role="grid" aria-label="Calendrier">
                {monthCells.map((cell) =>
                  cell.day == null ? (
                    <span key={cell.key} className="lead-calendar-empty" />
                  ) : (
                    <button
                      key={cell.key}
                      type="button"
                      className={`lead-calendar-day${cell.available ? " is-available" : ""}${
                        selectedDay === cell.dayKey ? " is-selected" : ""
                      }${cell.past || !cell.available ? " is-disabled" : ""}`}
                      disabled={!cell.available}
                      onClick={() => {
                        if (!cell.dayKey) return;
                        setSelectedDay(cell.dayKey);
                        setSelectedStart("");
                        setError(null);
                      }}
                    >
                      {cell.day}
                    </button>
                  ),
                )}
              </div>
            </div>

            {selectedDay ? (
              <div className="lead-times" role="listbox" aria-label="Horaires">
                <p className="booking-field-label">{selectedDayLabel}</p>
                <div className="lead-times-list">
                  {daySlots.map((slot) => (
                    <button
                      key={slot.start}
                      type="button"
                      role="option"
                      aria-selected={selectedStart === slot.start}
                      className={`lead-time-chip${
                        selectedStart === slot.start ? " is-selected" : ""
                      }`}
                      onClick={() => setSelectedStart(slot.start)}
                    >
                      {slot.timeLabel}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="lead-qualifier-hint">Sélectionnez une date disponible.</p>
            )}
          </>
        ) : null}

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="visit-manage-actions">
          <button
            type="button"
            className="btn-primary-glow btn-cta"
            disabled={pending || !selectedStart || slotsLoading}
            onClick={onRescheduleConfirm}
          >
            {pending ? "Enregistrement…" : "Confirmer le nouveau créneau"}
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setError(null);
              setMode("overview");
            }}
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="visit-manage-card">
      <p className="page-kicker font-mono">Votre visite</p>
      <h1 className="font-display visit-manage-title">Gérer le rendez-vous</h1>
      <p>
        Bonjour {visit.name.split(/\s+/)[0] || visit.name}, voici le créneau réservé :
      </p>
      <div className="visit-manage-summary">
        <p>
          <span className="page-kicker font-mono">Quand</span>
          <strong>{visit.slotLabel}</strong>
        </p>
        {visit.address ? (
          <p>
            <span className="page-kicker font-mono">Où</span>
            <strong>{visit.address}</strong>
          </p>
        ) : null}
      </div>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="visit-manage-actions">
        <button
          type="button"
          className="btn-primary-glow btn-cta"
          onClick={() => setMode("reschedule")}
        >
          Modifier le créneau
        </button>
        <button
          type="button"
          className="btn-danger-glow btn-cta"
          onClick={() => setMode("cancel")}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
