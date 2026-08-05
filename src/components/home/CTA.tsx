"use client";

import { useRef } from "react";
import { ContactForm } from "@/components/ContactForm";
import { useReveal } from "@/hooks/useReveal";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block cta-section" id="contact-wrap">
      <div className="container-site" data-reveal data-reveal-type="clip">
        <ContactForm />
      </div>
    </section>
  );
}
