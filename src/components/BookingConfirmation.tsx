"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BOOKING_CONFIRMATION_STORAGE_KEY,
  type BookingConfirmationDetails,
} from "@/lib/booking-confirmation";
import { PRIMARY_CTA } from "@/lib/cta";

function readConfirmation(): BookingConfirmationDetails | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(BOOKING_CONFIRMATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BookingConfirmationDetails;
    if (!parsed?.slotLabel || !parsed?.city) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function BookingConfirmation() {
  const [details, setDetails] = useState<BookingConfirmationDetails | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = readConfirmation();
    setDetails(next);
    setReady(true);
    if (next) {
      try {
        window.sessionStorage.removeItem(BOOKING_CONFIRMATION_STORAGE_KEY);
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  if (!ready) {
    return (
      <div className="visit-manage-card" aria-busy="true">
        <p className="page-kicker font-mono">Confirmation</p>
        <h1 className="font-display visit-manage-title">Chargement…</h1>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="visit-manage-card">
        <p className="page-kicker font-mono">Confirmation</p>
        <h1 className="font-display visit-manage-title">Visite réservée ?</h1>
        <p>
          Si vous venez de choisir un créneau, un e-mail Optmiz avec le rendez-vous lié
          (fichier agenda) vous a été envoyé. Vous pouvez aussi repartir de l’accueil pour
          réserver une visite.
        </p>
        <div className="visit-manage-actions">
          <Link className="btn-primary-glow btn-cta" href={PRIMARY_CTA.href}>
            {PRIMARY_CTA.label}
          </Link>
        </div>
      </div>
    );
  }

  const firstName = details.name.split(/\s+/)[0] || details.name;
  const location = [details.address, details.city].filter(Boolean).join(", ");
  const manageUrl = details.manageUrl;

  return (
    <div className="visit-manage-card">
      <p className="page-kicker font-mono">Confirmé</p>
      <h1 className="font-display visit-manage-title">C’est réservé, {firstName}</h1>
      <p>
        Votre visite Optmiz est confirmée. Une confirmation vous a été envoyée par e-mail,
        avec un fichier agenda (.ics) pour lier le rendez-vous à Apple Agenda ou Google
        Agenda.
      </p>

      <div className="visit-manage-summary">
        <p>
          <span className="page-kicker font-mono">Quand</span>
          <strong>{details.slotLabel}</strong>
        </p>
        <p>
          <span className="page-kicker font-mono">Où</span>
          <strong>{location}</strong>
        </p>
        {details.need ? (
          <p>
            <span className="page-kicker font-mono">Situation</span>
            <strong>{details.need}</strong>
          </p>
        ) : null}
      </div>

      <div className="confirmation-next">
        <p className="page-kicker font-mono">La suite</p>
        <h2 className="font-display confirmation-next-title">Comment se passe la visite</h2>
        <p>
          On se rencontre chez vous. Quentin écoute votre situation, vos besoins et votre
          manière de fonctionner au quotidien, puis vous parle des opportunités concrètes
          pour gagner du temps, sans engagement.
        </p>
      </div>

      <div className="visit-manage-actions">
        {manageUrl ? (
          <>
            <a className="btn-primary-glow btn-cta" href={`${manageUrl}&action=reschedule`}>
              Modifier le créneau
            </a>
            <a className="btn-danger-glow btn-cta" href={`${manageUrl}&action=cancel`}>
              Annuler
            </a>
          </>
        ) : null}
      </div>
    </div>
  );
}
