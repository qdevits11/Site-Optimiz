"use client";

import { useState } from "react";

export type FaqItem = {
  q: string;
  a: string;
};

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.q} className="overflow-hidden rounded-2xl border border-line bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              {faq.q}
              <span className="text-brand">{isOpen ? "−" : "+"}</span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="border-t border-line px-5 py-4 text-sm text-muted">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
