"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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
            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary w-full md:w-auto">
                ✅ Je veux identifier mes gains de productivité
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
