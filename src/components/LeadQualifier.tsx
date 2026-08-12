"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BOOKING_CONFIRMATION_STORAGE_KEY,
  type BookingConfirmationDetails,
} from "@/lib/booking-confirmation";
import { addressHasStreetNumber, isValidBookingEmail } from "@/lib/booking-validation";

const NEEDS = [
  { value: "automatiser", label: "Automatiser un process répétitif" },
  { value: "site-web", label: "Créer / refaire un site web" },
  { value: "erp-crm", label: "Mettre en place un système de gestion" },
  { value: "accompagne", label: "Être accompagné" },
] as const;

const SIZES = [
  { value: "1-10", label: "1–10" },
  { value: "11-50", label: "11–50" },
  { value: "51-200", label: "51–200" },
  { value: "200+", label: "200+" },
] as const;

type Need = (typeof NEEDS)[number]["value"];
type Size = (typeof SIZES)[number]["value"];
type Step = 0 | 1 | 2 | 3;

type CalSlot = {
  start: string;
  label: string;
  dayKey: string;
  dayLabel: string;
  timeLabel: string;
};

type ContactDraft = {
  name: string;
  email: string;
  company: string;
  city: string;
  address: string;
  consent: boolean;
};

type LeadQualifierProps = {
  variant?: "hero" | "section";
  /** Optional DOM id. Homepage `#devis` lives on the hero section, not on this card. */
  id?: string;
};

const WEEKDAYS = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"] as const;

const EMPTY_CONTACT: ContactDraft = {
  name: "",
  email: "",
  company: "",
  city: "",
  address: "",
  consent: false,
};

function labelOf<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
) {
  return options.find((o) => o.value === value)?.label ?? value;
}

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

export function LeadQualifier({ variant = "section", id }: LeadQualifierProps) {
  const [step, setStep] = useState<Step>(0);
  const [need, setNeed] = useState<Need | "">("");
  const [companySize, setCompanySize] = useState<Size | "">("");
  const [contact, setContact] = useState<ContactDraft>(EMPTY_CONTACT);
  const [slots, setSlots] = useState<CalSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedStart, setSelectedStart] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingVisit, setExistingVisit] = useState<{
    slotLabel: string;
    manageUrl: string;
  } | null>(null);

  const slotsByDay = useMemo(() => groupSlotsByDay(slots), [slots]);
  const availableDays = useMemo(() => new Set(slotsByDay.keys()), [slotsByDay]);
  const monthCells = useMemo(
    () => buildMonthCells(viewMonth, availableDays),
    [viewMonth, availableDays],
  );
  const daySlots = selectedDay ? (slotsByDay.get(selectedDay) ?? []) : [];
  const selectedDayLabel = daySlots[0]?.dayLabel ?? "";
  const isScheduleStep = step === 3;

  useEffect(() => {
    if (step !== 3) return;
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
        const nextSlots = payload.slots ?? [];
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
  }, [step]);

  useEffect(() => {
    if (variant !== "hero") return;
    if (!isScheduleStep) return;
    const node = document.getElementById("devis");
    if (!node) return;
    window.requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [variant, isScheduleStep, selectedDay]);

  function updateContact<K extends keyof ContactDraft>(key: K, value: ContactDraft[K]) {
    setContact((prev) => ({ ...prev, [key]: value }));
  }

  function selectNeed(value: Need) {
    setNeed(value);
    setError(null);
    window.setTimeout(() => setStep(1), 160);
  }

  function selectSize(value: Size) {
    setCompanySize(value);
    setError(null);
    window.setTimeout(() => setStep(2), 160);
  }

  function onContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!need || !companySize) {
      setError("Revenez aux étapes précédentes pour compléter votre profil.");
      return;
    }
    const name = contact.name.trim();
    const email = contact.email.trim();
    const city = contact.city.trim();
    const address = contact.address.trim();

    if (!name || !email || !city || !address) {
      setError("Complétez nom, e-mail, ville et adresse de visite.");
      return;
    }
    if (!isValidBookingEmail(email)) {
      setError("Indiquez une adresse e-mail valide (avec @ et un point).");
      return;
    }
    if (!addressHasStreetNumber(address)) {
      setError("L’adresse doit contenir un numéro (ex. : Rue de la Gare 12).");
      return;
    }
    if (!contact.consent) {
      setError("Merci d’accepter l’utilisation de vos données pour organiser la visite.");
      return;
    }

    setError(null);
    setContact((prev) => ({
      ...prev,
      name,
      email,
      city,
      address,
      company: prev.company.trim(),
    }));
    setStep(3);
  }

  async function onBook() {
    const name = contact.name.trim();
    const email = contact.email.trim();
    const city = contact.city.trim();
    const address = contact.address.trim();
    const company = contact.company.trim();

    if (!need || !companySize || !selectedStart) {
      setError("Choisissez une date puis un horaire.");
      return;
    }
    if (!isValidBookingEmail(email) || !addressHasStreetNumber(address)) {
      setError("Revenez à l’étape précédente pour corriger e-mail ou adresse.");
      return;
    }

    setPending(true);
    setError(null);
    setExistingVisit(null);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedStart,
          name,
          email,
          company,
          city,
          address,
          need: labelOf(NEEDS, need),
          companySize: labelOf(SIZES, companySize),
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        code?: string;
        manageUrl?: string;
        existingSlotLabel?: string;
        slotLabel?: string;
        ok?: boolean;
      };
      if (
        response.status === 409 &&
        payload.code === "VISIT_ALREADY_SCHEDULED" &&
        payload.manageUrl
      ) {
        setExistingVisit({
          slotLabel: payload.existingSlotLabel || "déjà réservé",
          manageUrl: payload.manageUrl,
        });
        throw new Error(
          payload.error ||
            "Une visite est déjà prévue pour cet e-mail. Modifiez-la via le lien reçu.",
        );
      }
      if (!response.ok) throw new Error(payload.error || "Réservation impossible.");
      const slot = slots.find((s) => s.start === selectedStart);
      const confirmation: BookingConfirmationDetails = {
        name,
        email,
        company,
        city,
        address,
        need: labelOf(NEEDS, need),
        companySize: labelOf(SIZES, companySize),
        slotLabel: payload.slotLabel || slot?.label || selectedStart,
        manageUrl: payload.manageUrl,
      };
      try {
        window.sessionStorage.setItem(
          BOOKING_CONFIRMATION_STORAGE_KEY,
          JSON.stringify(confirmation),
        );
      } catch {
        // redirect even if storage is unavailable
      }
      window.location.assign("/confirmation");
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Réservation impossible.");
      setPending(false);
    }
  }

  const stepTitle =
    step === 0
      ? "Quelle est votre priorité aujourd’hui ?"
      : step === 1
        ? "Combien de personnes dans la société ?"
        : step === 2
          ? "Où vous rencontrer ?"
          : "Choisissez une date";

  const stepHint =
    step === 0
      ? "Sélectionnez votre besoin"
      : step === 1
        ? "Taille de l’entreprise"
        : step === 2
          ? "Coordonnées et adresse de la visite"
          : "Puis un horaire libre";

  return (
    <div
      id={id}
      className={`lead-qualifier${variant === "hero" ? " lead-qualifier-hero" : ""}${
        isScheduleStep ? " is-schedule-step" : ""
      }`}
      data-cursor="card"
    >
      <div className="lead-qualifier-head">
        <p className="lead-qualifier-kicker font-mono">Visite gratuite</p>
        <p className="lead-qualifier-reassure">Chez vous · Sans engagement</p>
      </div>

      <div className="lead-qualifier-progress" aria-hidden>
        <div
          className="lead-qualifier-progress-bar"
          style={{ width: `${((step + 1) / 4) * 100}%` }}
        />
      </div>
      <p className="lead-qualifier-step font-mono">Étape {step + 1} / 4</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="lead-qualifier-title font-display">{stepTitle}</h2>
          <p className="lead-qualifier-hint">{stepHint}</p>

          {step === 0 ? (
            <div className="lead-options" role="listbox" aria-label="Priorité">
              {NEEDS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={need === option.value}
                  className={`lead-option${need === option.value ? " is-selected" : ""}`}
                  onClick={() => selectNeed(option.value)}
                >
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          ) : null}

          {step === 1 ? (
            <div className="lead-options lead-options-compact" role="listbox" aria-label="Taille">
              {SIZES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={companySize === option.value}
                  className={`lead-option${companySize === option.value ? " is-selected" : ""}`}
                  onClick={() => selectSize(option.value)}
                >
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          ) : null}

          {step === 2 ? (
            <form onSubmit={onContactSubmit} className="lead-contact-form">
              <label>
                Nom *
                <input
                  name="name"
                  required
                  value={contact.name}
                  onChange={(e) => updateContact("name", e.target.value)}
                  placeholder="Votre nom et prénom"
                  autoComplete="name"
                />
              </label>
              <label>
                Mail *
                <input
                  name="email"
                  type="email"
                  required
                  value={contact.email}
                  onChange={(e) => updateContact("email", e.target.value)}
                  placeholder="contact@entreprise.be"
                  autoComplete="email"
                />
              </label>
              <label>
                Société
                <input
                  name="company"
                  value={contact.company}
                  onChange={(e) => updateContact("company", e.target.value)}
                  placeholder="Optionnel"
                  autoComplete="organization"
                />
              </label>
              <label>
                Ville *
                <input
                  name="city"
                  required
                  value={contact.city}
                  onChange={(e) => updateContact("city", e.target.value)}
                  placeholder="Ex. : Charleroi"
                  autoComplete="address-level2"
                />
              </label>
              <label className="full">
                Adresse de visite *
                <input
                  name="address"
                  required
                  value={contact.address}
                  onChange={(e) => updateContact("address", e.target.value)}
                  placeholder="Rue et n° (ex. : Rue de la Gare 12)"
                  autoComplete="street-address"
                />
              </label>
              <label className="full consent">
                <input
                  type="checkbox"
                  required
                  checked={contact.consent}
                  onChange={(e) => updateContact("consent", e.target.checked)}
                />
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
                <button
                  type="button"
                  className="btn-ghost lead-back"
                  onClick={() => {
                    setError(null);
                    setStep(1);
                  }}
                >
                  Retour
                </button>
                <button type="submit" className="btn-primary-glow btn-cta contact-submit-btn">
                  Choisir une date
                </button>
              </div>
            </form>
          ) : null}

          {step === 3 ? (
            <div className="lead-schedule">
              {slotsLoading ? (
                <p className="lead-qualifier-hint">Chargement du calendrier…</p>
              ) : null}
              {slotsError ? (
                <p className="form-error" role="alert">
                  {slotsError}
                </p>
              ) : null}

              {!slotsLoading && !slotsError && availableDays.size === 0 ? (
                <p className="lead-qualifier-hint">
                  Aucun créneau libre sur la période. Écrivez-nous à contact@optmiz.be.
                </p>
              ) : null}

              {!slotsLoading && availableDays.size > 0 ? (
                <>
                  <div className="lead-calendar">
                    <div className="lead-calendar-nav">
                      <button
                        type="button"
                        className="lead-calendar-nav-btn"
                        aria-label="Mois précédent"
                        onClick={() =>
                          setViewMonth(
                            new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1),
                          )
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
                          setViewMonth(
                            new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1),
                          )
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
                            className={`lead-calendar-day${
                              cell.available ? " is-available" : ""
                            }${selectedDay === cell.dayKey ? " is-selected" : ""}${
                              cell.past || !cell.available ? " is-disabled" : ""
                            }`}
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

              {existingVisit ? (
                <p className="lead-qualifier-hint" style={{ marginTop: "0.5rem" }}>
                  Créneau déjà prévu : <strong>{existingVisit.slotLabel}</strong>.{" "}
                  <a className="text-link" href={existingVisit.manageUrl}>
                    Modifier ou annuler
                  </a>
                </p>
              ) : null}

              <div className="lead-contact-actions" style={{ marginTop: "0.75rem" }}>
                <button
                  type="button"
                  className="btn-ghost lead-back"
                  onClick={() => {
                    setError(null);
                    setExistingVisit(null);
                    setStep(2);
                  }}
                >
                  Retour
                </button>
                <button
                  type="button"
                  className="btn-primary-glow btn-cta contact-submit-btn"
                  disabled={pending || !selectedStart || slotsLoading || Boolean(existingVisit)}
                  onClick={onBook}
                >
                  {pending ? "Réservation…" : "Confirmer la visite"}
                </button>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <button
              type="button"
              className="lead-back-link"
              onClick={() => {
                setError(null);
                setStep(0);
              }}
            >
              ← Retour
            </button>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
