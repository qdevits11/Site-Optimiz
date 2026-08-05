"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { defaultProblem } from "@/lib/content";

export function PainPoints() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="section-block" id="problemes">
      <div className="container-site">
        <div data-reveal data-reveal-type="fade" className="section-heading">
          <p className="eyebrow font-mono">Le frein invisible</p>
          <h2 className="font-display">{defaultProblem.title}</h2>
          <p className="section-lead">{defaultProblem.intro}</p>
        </div>
        <div className="pain-grid" data-reveal data-reveal-type="stagger">
          {defaultProblem.points.map((point) => (
            <article key={point} className="pain-card" data-reveal-child data-cursor="card">
              <span className="pain-dot" />
              <p>{point}</p>
            </article>
          ))}
        </div>
        <p data-reveal data-reveal-type="fade" className="section-closing">
          {defaultProblem.closing}
        </p>
      </div>
    </section>
  );
}
