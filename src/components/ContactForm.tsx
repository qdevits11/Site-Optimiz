"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (!submitted) return;
    setShowMessage(true);
    const timer = window.setTimeout(() => setShowMessage(false), 4200);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: String(formData.get("name") || ""),
          phone: String(formData.get("phone") || ""),
          email: String(formData.get("email") || ""),
          company: String(formData.get("company") || ""),
          challenge: String(formData.get("challenge") || ""),
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Envoi impossible.");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Envoi impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className="contact-panel contact-panel-split">
      <div className="contact-heading">
        <p className="eyebrow font-mono">Contact</p>
        <h2 className="font-display">
          Une question ? <span className="text-accent">Écrivez-nous</span>
        </h2>
        <p className="section-lead">
          Pour un échange simple ou une précision. Pour un devis qualifié,{" "}
          <Link href="/#devis" className="text-link">
            passez par le formulaire de devis
          </Link>
          .
        </p>
        <ul className="contact-reassure">
          <li>Réponse sous 24h</li>
          <li>Sans engagement</li>
          <li>Basé à Soignies · Wallonie</li>
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

              <motion.p
                className="font-display success-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.35 }}
              >
                C’est envoyé
              </motion.p>

              <AnimatePresence>
                {showMessage ? (
                  <motion.p
                    key="success-msg"
                    className="success-message"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  >
                    Nous vous recontactons sous 24h avec un créneau.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              className="contact-form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <label>
                Nom *
                <input name="name" required placeholder="Votre nom et prénom" autoComplete="name" />
              </label>
              <label>
                Téléphone
                <input name="phone" type="tel" placeholder="+32 ..." autoComplete="tel" />
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
              <label className="full">
                Votre principal frein aujourd&apos;hui
                <textarea
                  name="challenge"
                  placeholder="Ex. : relances manuelles, double saisie Excel / ERP, reporting trop long…"
                />
              </label>
              <label className="full consent">
                <input type="checkbox" required />
                <span>
                  J&apos;accepte que mes données soient utilisées par Optmiz pour me recontacter.
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
                  {pending ? "Envoi en cours…" : "Envoyer mon message"}
                </button>
                <p className="form-note font-mono">
                  Sans engagement · Réponse sous 24h ·{" "}
                  <Link href="/#devis" className="text-link">
                    Préférer un devis ?
                  </Link>
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
