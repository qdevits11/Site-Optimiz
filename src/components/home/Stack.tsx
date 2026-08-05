"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const stack = ["n8n","Make","Power Automate","Odoo","Excel → API","CRM","Scripts Python","Tablettes terrain","SMTP / Outlook","Dashboards"];

export function Stack() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="stack">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading">
          <p className="eyebrow font-mono">Stack</p>
          <h2 className="font-display">Les briques que l’on assemble</h2>
          <p className="section-lead">Pas d’outil magique : on choisit ce qui simplifie vraiment votre organisation.</p>
        </div>
        <div className="stack-badges" data-reveal data-reveal-type="stagger">
          {stack.map((item) => (
            <span key={item} className="stack-badge font-mono" data-reveal-child>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
