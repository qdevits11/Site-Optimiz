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

      if (!response.ok) {
        throw new Error(payload.error || "Envoi impossible.");
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Envoi impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className="section bg-white">
      <div className="container-site max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">
            Prêt à <span className="text-brand">Optmizer</span> votre société ?
          </h2>
          <p className="mt-4 text-xl font-semibold text-ink">
            🔍 Identifions ensemble vos leviers d&apos;optimisation
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            Un expert d&apos;Optmiz vous offre un diagnostic gratuit pour repérer les automatisations
            les plus rentables pour votre entreprise.
          </p>
        </div>

        {submitted ? (
          <div className="card-soft mt-10 border border-brand/20 text-center">
            <p className="text-xl font-semibold text-brand-darker">Merci pour votre demande.</p>
            <p className="mt-2 text-muted">Nous vous recontactons sous 24h.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="card-soft mt-10 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Nom *
              <input className="form-field" name="name" required placeholder="Votre nom et prénom" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Téléphone
              <input className="form-field" name="phone" type="tel" placeholder="+32 ..." />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Mail *
              <input
                className="form-field"
                name="email"
                type="email"
                required
                placeholder="contact@entreprise.be"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Société *
              <input className="form-field" name="company" required placeholder="Nom de votre société" />
            </label>
            <label className="grid gap-2 text-sm font-medium md:col-span-2">
              Votre principal enjeu aujourd&apos;hui
              <textarea
                className="form-field min-h-28 resize-y"
                name="challenge"
                placeholder="Tâches répétitives, erreurs fréquentes, manque de temps..."
              />
            </label>
            <label className="flex items-start gap-3 text-sm text-muted md:col-span-2">
              <input type="checkbox" required className="mt-1 accent-[var(--brand)]" />
              <span>
                J&apos;accepte que mes données soient utilisées par Optmiz pour me recontacter dans le
                cadre de ma demande.
              </span>
            </label>
            <p className="text-sm text-muted md:col-span-2">
              🔒 Vos données sont confidentielles et ne seront jamais partagées.
            </p>
            {error ? (
              <p className="text-sm font-medium text-problem md:col-span-2" role="alert">
                {error}
              </p>
            ) : null}
            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary w-full md:w-auto" disabled={pending}>
                {pending ? "Envoi en cours…" : "✅ Je veux identifier mes gains de productivité"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
