"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";

type CalSlot = {
  start: string;
  label: string;
  dayKey: string;
  dayLabel: string;
  timeLabel: string;
};

type Lead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  address: string;
  note: string;
};

type LeadQualifierProps = {
  variant?: "hero" | "section";
  id?: string;
};

function groupSlotsByDay(slots: CalSlot[]) {
  const groups = new Map<string, { dayKey: string; dayLabel: string; slots: CalSlot[] }>();
  for (const slot of slots) {
    const existing = groups.get(slot.dayKey);
    if (existing) {
      existing.slots.push(slot);
    } else {
      groups.set(slot.dayKey, {
        dayKey: slot.dayKey,
        dayLabel: slot.dayLabel,
        slots: [slot],
      });
    }
  }
  return [...groups.values()];
}

export function LeadQualifier({ variant = "section", id = "devis" }: LeadQualifierProps) {
  const [step, setStep] = useState<0 | 1>(0);
  const [lead, setLead] = useState<Lead | null>(null);
  const [slots, setSlots] = useState<CalSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedStart, setSelectedStart] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedLabel, setBookedLabel] = useState<string | null>(null);

  const days = useMemo(() => groupSlotsByDay(slots), [slots]);
  const daySlots = days.find((d) => d.dayKey === selectedDay)?.slots ?? [];

  useEffect(() => {
    if (step !== 1) return;
    let cancelled = false;
    setSlotsLoading(true);
    setSlotsError(null);

    fetch("/api/slots")
      .then(async (response) => {
        const payload = (await response.json()) as {
          error?: string;
          slots?: CalSlot[];
        };
        if (!response.ok) throw new Error(payload.error || "Créneaux indisponibles.");
        if (cancelled) return;
        const nextSlots = payload.slots ?? [];
        setSlots(nextSlots);
        const firstDay = nextSlots[0]?.dayKey ?? "";
        setSelectedDay(firstDay);
        setSelectedStart("");
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
  }, [step]);

  function onContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    setLead({
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      company: String(data.get("company") || "").trim(),
      city: String(data.get("city") || "").trim(),
      address: String(data.get("address") || "").trim(),
      note: String(data.get("note") || "").trim(),
    });
    setStep(1);
  }

  async function onBook() {
    if (!lead || !selectedStart) {
      setError("Choisissez un créneau.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedStart,
          ...lead,
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Réservation impossible.");
      const slot = slots.find((s) => s.start === selectedStart);
      setBookedLabel(slot?.label || selectedStart);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Réservation impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      id={id}
      className={`lead-qualifier${variant === "hero" ? " lead-qualifier-hero" : ""}`}
      data-cursor="card"
    >
      <div className="lead-qualifier-head">
        <p className="lead-qualifier-kicker font-mono">
          {bookedLabel ? "Confirmé" : step === 0 ? "Visite gratuite" : "Créneau"}
        </p>
        <p className="lead-qualifier-reassure">
          {bookedLabel
            ? "Dans votre agenda et le nôtre"
            : "2 étapes · Chez vous · Sans engagement"}
        </p>
      </div>

      {!bookedLabel ? (
        <>
          <div className="lead-qualifier-progress" aria-hidden>
            <div
              className="lead-qualifier-progress-bar"
              style={{ width: `${((step + 1) / 2) * 100}%` }}
            />
          </div>
          <p className="lead-qualifier-step font-mono">Étape {step + 1} / 2</p>
        </>
      ) : null}

      <AnimatePresence mode="wait">
        {bookedLabel ? (
          <motion.div
            key="done"
            className="lead-qualifier-success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-display lead-qualifier-success-title">C’est réservé</p>
            <p>
              Visite confirmée : <strong>{bookedLabel}</strong>
              {lead?.city ? ` · ${lead.city}` : ""}.
            </p>
            <p>Vous recevrez aussi la confirmation Cal.com par e-mail.</p>
          </motion.div>
        ) : step === 0 ? (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="lead-qualifier-title font-display">On vient chez vous</h2>
            <p className="lead-qualifier-hint">
              Vos coordonnées et l’adresse de visite — puis un créneau libre.
            </p>
            <form onSubmit={onContactSubmit} className="lead-contact-form">
              <label>
                Nom *
                <input name="name" required placeholder="Votre nom et prénom" autoComplete="name" />
              </label>
              <label>
                Mail *
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="contact@entreprise.be"
                  autoComplete="email"
                />
              </label>
              <label>
                Téléphone *
                <input name="phone" type="tel" required placeholder="+32 ..." autoComplete="tel" />
              </label>
              <label>
                Société
                <input name="company" placeholder="Optionnel" autoComplete="organization" />
              </label>
              <label>
                Ville *
                <input
                  name="city"
                  required
                  placeholder="Ex. : Charleroi"
                  autoComplete="address-level2"
                />
              </label>
              <label>
                Adresse de visite *
                <input
                  name="address"
                  required
                  placeholder="Rue et n°"
                  autoComplete="street-address"
                />
              </label>
              <label className="full">
                En une phrase, le sujet ? (optionnel)
                <input name="note" placeholder="Ex. : relances, Excel, site…" />
              </label>
              <label className="full consent">
                <input type="checkbox" required />
                <span>
                  J&apos;accepte que mes données soient utilisées par Optmiz pour organiser la
                  visite.
                </span>
              </label>
              {error ? (
                <p className="form-error full" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="full lead-contact-actions">
                <button type="submit" className="btn-primary-glow btn-cta contact-submit-btn">
                  Voir les créneaux libres
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="slots"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="lead-qualifier-title font-display">Choisissez un créneau</h2>
            <p className="lead-qualifier-hint">
              Disponibilités synchronisées avec l’agenda Optmiz
              {lead?.city ? ` · visite à ${lead.city}` : ""}.
            </p>

            {slotsLoading ? <p className="lead-qualifier-hint">Chargement des créneaux…</p> : null}
            {slotsError ? (
              <p className="form-error" role="alert">
                {slotsError}
              </p>
            ) : null}

            {!slotsLoading && !slotsError && days.length === 0 ? (
              <p className="lead-qualifier-hint">
                Aucun créneau libre sur la période. Écrivez-nous à contact@optmiz.be.
              </p>
            ) : null}

            {!slotsLoading && days.length > 0 ? (
              <>
                <div className="booking-days" role="listbox" aria-label="Jour">
                  <p className="booking-field-label">Jour</p>
                  <div className="booking-day-scroll">
                    {days.map((day) => (
                      <button
                        key={day.dayKey}
                        type="button"
                        role="option"
                        aria-selected={selectedDay === day.dayKey}
                        className={`booking-day-chip${selectedDay === day.dayKey ? " is-selected" : ""}`}
                        onClick={() => {
                          setSelectedDay(day.dayKey);
                          setSelectedStart("");
                        }}
                      >
                        {day.dayLabel}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="booking-times" role="listbox" aria-label="Heure">
                  <p className="booking-field-label">Heure</p>
                  <div className="booking-time-grid">
                    {daySlots.map((slot) => (
                      <button
                        key={slot.start}
                        type="button"
                        role="option"
                        aria-selected={selectedStart === slot.start}
                        className={`booking-time-chip${selectedStart === slot.start ? " is-selected" : ""}`}
                        onClick={() => setSelectedStart(slot.start)}
                      >
                        {slot.timeLabel}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : null}

            {error ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}

            <div className="lead-contact-actions" style={{ marginTop: "0.85rem" }}>
              <button
                type="button"
                className="btn-ghost lead-back"
                onClick={() => {
                  setStep(0);
                  setError(null);
                }}
              >
                Retour
              </button>
              <button
                type="button"
                className="btn-primary-glow btn-cta contact-submit-btn"
                disabled={pending || !selectedStart || slotsLoading}
                onClick={onBook}
              >
                {pending ? "Réservation…" : "Confirmer la visite"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
