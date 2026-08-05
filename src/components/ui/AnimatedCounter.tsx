"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
}: AnimatedCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const suffixRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (numberRef.current) numberRef.current.textContent = `${prefix}${value.toFixed(decimals)}`;
      return;
    }

    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.set(suffixRef.current, { scale: 0, opacity: 0 });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            n: value,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              if (!numberRef.current) return;
              const current = obj.n.toFixed(decimals);
              numberRef.current.textContent = `${prefix}${current}`;
              gsap.to(numberRef.current, {
                duration: 0.15,
                scrambleText: {
                  text: `${prefix}${current}`,
                  chars: "0123456789",
                  speed: 0.3,
                },
              });
            },
            onComplete: () => {
              if (numberRef.current) {
                numberRef.current.textContent = `${prefix}${value.toFixed(decimals)}`;
              }
              gsap.to(suffixRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)",
              });
            },
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [value, suffix, prefix, decimals]);

  return (
    <div ref={rootRef} className="proof-item" data-reveal-child>
      <div className="proof-value font-display">
        <span ref={numberRef}>0</span>
        <span ref={suffixRef} className="proof-suffix">
          {suffix}
        </span>
      </div>
      <p className="proof-label">{label}</p>
    </div>
  );
}
