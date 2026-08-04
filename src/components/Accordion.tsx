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
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left text-white"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <div>
                <p className="text-lg font-semibold">
                  {item.id} {item.title}
                </p>
                <p className="mt-1 text-brand">{item.result}</p>
                {item.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <span className="mt-1 text-xl text-brand">{open ? "−" : "+"}</span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 border-t border-white/10 px-5 py-4 text-sm text-white/90">
                  {item.problem ? (
                    <p>
                      <strong className="text-white">Le problème : </strong>
                      {item.problem}
                    </p>
                  ) : null}
                  {item.solution ? (
                    <p>
                      <strong className="text-white">La solution : </strong>
                      {item.solution}
                    </p>
                  ) : null}
                  {item.outcome ? (
                    <p>
                      <strong className="text-brand">Résultat : </strong>
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
