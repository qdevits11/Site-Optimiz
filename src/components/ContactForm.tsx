"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <section id="contact" className="contact-panel">
      <div className="contact-heading">
        <p className="eyebrow font-mono">Diagnostic gratuit</p>
        <h2 className="font-display">
          Prêt à <span className="text-accent">Optmizer</span> votre société ?
        </h2>
        <p className="section-lead">
          Un expert Optmiz identifie vos leviers d’automatisation les plus rentables.
        </p>
      </div>

      {submitted ? (
        <div className="contact-success">
          <p className="font-display">Merci pour votre demande.</p>
          <p>Nous vous recontactons sous 24h.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="contact-form">
          <label>
            Nom *
            <input name="name" required placeholder="Votre nom et prénom" />
          </label>
          <label>
            Téléphone
            <input name="phone" type="tel" placeholder="+32 ..." />
          </label>
          <label>
            Mail *
            <input name="email" type="email" required placeholder="contact@entreprise.be" />
          </label>
          <label>
            Société *
            <input name="company" required placeholder="Nom de votre société" />
          </label>
          <label className="full">
            Votre principal enjeu aujourd&apos;hui
            <textarea name="challenge" placeholder="Tâches répétitives, erreurs, manque de temps..." />
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
          <div className="full">
            <button type="submit" className="btn-primary-glow" disabled={pending}>
              {pending ? "Envoi en cours…" : "Je veux identifier mes gains de productivité"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
