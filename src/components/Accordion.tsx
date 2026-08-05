"use client";

import { useState } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  result: string;
  tags?: string[];
  problem?: string;
  solution?: string;
  outcome?: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="accordion-item">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <div>
                <p className="text-lg font-semibold" style={{ margin: 0, color: "var(--text)" }}>
                  {item.id} {item.title}
                </p>
                <p className="accordion-result" style={{ margin: "0.4rem 0 0" }}>
                  {item.result}
                </p>
                {item.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-xs"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid var(--border)",
                          color: "var(--muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <span className="mt-1 text-xl" style={{ color: "var(--accent)" }}>
                {open ? "−" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className="space-y-3 border-t px-5 py-4 text-sm"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                >
                  {item.problem ? (
                    <p>
                      <strong style={{ color: "var(--text)" }}>Le problème : </strong>
                      {item.problem}
                    </p>
                  ) : null}
                  {item.solution ? (
                    <p>
                      <strong style={{ color: "var(--text)" }}>La solution : </strong>
                      {item.solution}
                    </p>
                  ) : null}
                  {item.outcome ? (
                    <p>
                      <strong style={{ color: "var(--accent)" }}>Résultat : </strong>
                      {item.outcome}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
