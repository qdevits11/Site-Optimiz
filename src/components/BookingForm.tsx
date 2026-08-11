"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  BOOKING_DURATION_MINUTES,
  generateBookingSlots,
  type BookingSlot,
} from "@/lib/booking";

function groupSlotsByDate(slots: BookingSlot[]) {
  const groups = new Map<string, BookingSlot[]>();
  for (const slot of slots) {
    const list = groups.get(slot.date) ?? [];
    list.push(slot);
    groups.set(slot.date, list);
  }
  return [...groups.entries()].map(([date, daySlots]) => ({
    date,
    dayLabel: daySlots[0].label.split(" · ")[0],
    slots: daySlots,
  }));
}

type BookingFormProps = {
  defaultCity?: string;
};

export function BookingForm({ defaultCity = "" }: BookingFormProps) {
  const slots = useMemo(() => generateBookingSlots(), []);
  const days = useMemo(() => groupSlotsByDate(slots), [slots]);

  const [selectedDate, setSelectedDate] = useState(days[0]?.date ?? "");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const daySlots = days.find((d) => d.date === selectedDate)?.slots ?? [];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!selectedSlot) {
      setError("Choisissez un créneau pour la visite.");
      return;
    }

    setPending(true);
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          name: String(formData.get("name") || ""),
          phone: String(formData.get("phone") || ""),
          email: String(formData.get("email") || ""),
          company: String(formData.get("company") || ""),
          address: String(formData.get("address") || ""),
          city: String(formData.get("city") || ""),
          slotId: selectedSlot,
          challenge: String(formData.get("challenge") || ""),
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Réservation impossible.");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Réservation impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="reservation" className="contact-panel booking-panel">
      <div className="contact-heading">
        <p className="eyebrow font-mono">Réservation</p>
        <h2 className="font-display">
          Choisissez votre <span className="text-accent">créneau</span>
        </h2>
        <p className="section-lead">
          Première visite chez vous · {BOOKING_DURATION_MINUTES} min · gratuite et sans
          engagement. Nous confirmons le créneau sous 24h ouvrées.
        </p>
        <ul className="contact-reassure">
          <li>Sur votre lieu de travail</li>
          <li>Partout en Wallonie</li>
          <li>Confirmation sous 24h</li>
        </ul>
      </div>

      <div className="contact-form-stage" aria-live="polite">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="contact-success"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="success-check"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.08 }}
                aria-hidden
              >
                <svg viewBox="0 0 52 52" className="success-check-svg">
                  <circle className="success-check-circle" cx="26" cy="26" r="24" />
                  <path className="success-check-mark" d="M15 27.5 L22.5 34.5 L37 18.5" />
                </svg>
              </motion.div>
              <p className="font-display success-title">Demande envoyée</p>
              <p className="success-message">
                Nous vous confirmons le créneau sous 24h ouvrées. Un souci de dernière minute ?
                Écrivez-nous ou{" "}
                <Link href="/contact" className="text-link">
                  contactez-nous
                </Link>
                .
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              className="contact-form booking-form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <div className="full booking-days" role="listbox" aria-label="Jour souhaité">
                <p className="booking-field-label">Jour *</p>
                <div className="booking-day-scroll">
                  {days.map((day) => (
                    <button
                      key={day.date}
                      type="button"
                      role="option"
                      aria-selected={selectedDate === day.date}
                      className={`booking-day-chip${selectedDate === day.date ? " is-selected" : ""}`}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedSlot("");
                      }}
                    >
                      {day.dayLabel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="full booking-times" role="listbox" aria-label="Heure souhaitée">
                <p className="booking-field-label">Heure *</p>
                <div className="booking-time-grid">
                  {daySlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      role="option"
                      aria-selected={selectedSlot === slot.id}
                      className={`booking-time-chip${selectedSlot === slot.id ? " is-selected" : ""}`}
                      onClick={() => setSelectedSlot(slot.id)}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <label>
                Nom *
                <input name="name" required placeholder="Votre nom et prénom" autoComplete="name" />
              </label>
              <label>
                Téléphone *
                <input name="phone" type="tel" required placeholder="+32 ..." autoComplete="tel" />
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
                Société *
                <input
                  name="company"
                  required
                  placeholder="Nom de votre société"
                  autoComplete="organization"
                />
              </label>
              <label>
                Ville / commune *
                <input
                  name="city"
                  required
                  defaultValue={defaultCity}
                  placeholder="Ex. : Charleroi"
                  autoComplete="address-level2"
                />
              </label>
              <label>
                Adresse de la visite *
                <input
                  name="address"
                  required
                  placeholder="Rue, n°, code postal"
                  autoComplete="street-address"
                />
              </label>
              <label className="full">
                Ce dont vous aimeriez parler (optionnel)
                <textarea
                  name="challenge"
                  placeholder="Ex. : relances manuelles, double saisie, site à refaire…"
                />
              </label>
              <label className="full consent">
                <input type="checkbox" required />
                <span>
                  J&apos;accepte que mes données soient utilisées par Optmiz pour confirmer ce
                  rendez-vous.
                </span>
              </label>
              {error ? (
                <p className="form-error full" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="full contact-submit">
                <button
                  type="submit"
                  className="btn-primary-glow btn-cta contact-submit-btn"
                  disabled={pending}
                >
                  {pending ? "Envoi en cours…" : "Réserver ce créneau"}
                </button>
                <p className="form-note font-mono">
                  Gratuit · Sans engagement · Confirmation sous 24h
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
