"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useState } from "react";

const NEEDS = [
  { value: "automatiser", label: "Automatiser un process répétitif" },
  { value: "site-web", label: "Créer / refaire un site web" },
  { value: "erp-crm", label: "Mettre en place un système de gestion" },
  { value: "accompagne", label: "Être accompagné" },
] as const;

const PAINS = [
  { value: "relances-admin", label: "Relances / facturation / admin" },
  { value: "excel-saisies", label: "Saisies manuelles / Excel" },
  { value: "outils-deconnectes", label: "Outils qui ne communiquent pas" },
  { value: "suivi-commercial", label: "Suivi commercial / demandes clients" },
] as const;

const SIZES = [
  { value: "1-10", label: "1–10" },
  { value: "11-50", label: "11–50" },
  { value: "51-200", label: "51–200" },
  { value: "200+", label: "200+" },
] as const;

const BUDGETS = [
  { value: "<1000", label: "< 1 000 €" },
  { value: "1000-5000", label: "1 000–5 000 €" },
  { value: "5000-10000", label: "5 000–10 000 €" },
  { value: ">10000", label: "> 10 000 €" },
] as const;

type Step = 0 | 1 | 2 | 3 | 4;

type Answers = {
  need: (typeof NEEDS)[number]["value"] | "";
  pain: (typeof PAINS)[number]["value"] | "";
  companySize: (typeof SIZES)[number]["value"] | "";
  budget: (typeof BUDGETS)[number]["value"] | "";
};

const STEP_META: { title: string; hint: string }[] = [
  { title: "Quelle est votre priorité aujourd’hui ?", hint: "Sélectionnez votre besoin" },
  { title: "Qu’est-ce qui vous coûte le plus de temps ?", hint: "Choisissez le frein principal" },
  { title: "Combien de personnes dans l’entreprise ?", hint: "Taille de la société" },
  { title: "Quel budget envisagez-vous ?", hint: "Fourchette indicative" },
  { title: "Vos coordonnées", hint: "Pour vous recontacter sous 24h" },
];

const labelOf = <T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
) => options.find((o) => o.value === value)?.label ?? value;

type LeadQualifierProps = {
  variant?: "hero" | "section";
  id?: string;
};

export function LeadQualifier({ variant = "section", id = "devis" }: LeadQualifierProps) {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Answers>({
    need: "",
    pain: "",
    companySize: "",
    budget: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function selectAndAdvance<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError(null);
    window.setTimeout(() => setStep((s) => Math.min(4, s + 1) as Step), 180);
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(0, s - 1) as Step);
  }

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
          type: "devis",
          name: String(formData.get("name") || ""),
          phone: String(formData.get("phone") || ""),
          email: String(formData.get("email") || ""),
          company: String(formData.get("company") || ""),
          postalCode: String(formData.get("postalCode") || ""),
          comment: String(formData.get("comment") || ""),
          need: labelOf(NEEDS, answers.need),
          pain: labelOf(PAINS, answers.pain),
          companySize: labelOf(SIZES, answers.companySize),
          budget: labelOf(BUDGETS, answers.budget),
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

  const progress = ((step + 1) / 5) * 100;

  return (
    <div
      id={id}
      className={`lead-qualifier${variant === "hero" ? " lead-qualifier-hero" : ""}`}
      data-cursor="card"
    >
      <div className="lead-qualifier-head">
        <p className="lead-qualifier-kicker font-mono">Devis gratuit</p>
        <p className="lead-qualifier-reassure">Sans engagement · Réponse sous 24h</p>
      </div>

      <div className="lead-qualifier-progress" aria-hidden>
        <div className="lead-qualifier-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="lead-qualifier-step font-mono">
        Étape {step + 1} / 5
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="lead-qualifier-success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-display lead-qualifier-success-title">C’est envoyé</p>
            <p>Nous vous recontactons sous 24h avec un créneau.</p>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="lead-qualifier-title font-display">{STEP_META[step].title}</h2>
            <p className="lead-qualifier-hint">{STEP_META[step].hint}</p>

            {step === 0 ? (
              <div className="lead-options" role="listbox" aria-label="Besoin">
                {NEEDS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={answers.need === option.value}
                    className={`lead-option${answers.need === option.value ? " is-selected" : ""}`}
                    onClick={() => selectAndAdvance("need", option.value)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === 1 ? (
              <div className="lead-options" role="listbox" aria-label="Frein">
                {PAINS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={answers.pain === option.value}
                    className={`lead-option${answers.pain === option.value ? " is-selected" : ""}`}
                    onClick={() => selectAndAdvance("pain", option.value)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="lead-options lead-options-compact" role="listbox" aria-label="Taille">
                {SIZES.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={answers.companySize === option.value}
                    className={`lead-option${answers.companySize === option.value ? " is-selected" : ""}`}
                    onClick={() => selectAndAdvance("companySize", option.value)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === 3 ? (
              <div className="lead-options lead-options-compact" role="listbox" aria-label="Budget">
                {BUDGETS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={answers.budget === option.value}
                    className={`lead-option${answers.budget === option.value ? " is-selected" : ""}`}
                    onClick={() => selectAndAdvance("budget", option.value)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === 4 ? (
              <form onSubmit={onSubmit} className="lead-contact-form">
                <label>
                  Nom *
                  <input name="name" required placeholder="Votre nom et prénom" autoComplete="name" />
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
                  Code postal *
                  <input
                    name="postalCode"
                    required
                    placeholder="Ex. : 7060"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern="[0-9]{4,5}"
                    title="Code postal à 4 ou 5 chiffres"
                  />
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
                  Téléphone
                  <input name="phone" type="tel" placeholder="+32 ..." autoComplete="tel" />
                </label>
                <label className="full">
                  Commentaire
                  <textarea
                    name="comment"
                    placeholder="Précisez votre besoin si besoin…"
                    rows={3}
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
                <div className="full lead-contact-actions">
                  <button type="button" className="btn-ghost lead-back" onClick={goBack}>
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-glow btn-cta contact-submit-btn"
                    disabled={pending}
                  >
                    {pending ? "Envoi en cours…" : "Obtenir mon devis gratuit"}
                  </button>
                </div>
              </form>
            ) : null}

            {step > 0 && step < 4 ? (
              <button type="button" className="lead-back-link" onClick={goBack}>
                ← Retour
              </button>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
