"use client";

import { ContactForm } from "@/components/ContactForm";

export function CTA() {
  return (
    <section className="section-block cta-section" id="contact-wrap">
      <div className="container-site">
        <ContactForm />
      </div>
    </section>
  );
}
