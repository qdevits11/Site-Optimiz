"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, registerGsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"default" | "link" | "card" | "cta">("default");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    registerGsap();
    document.body.classList.add("cursor-none");

    const center = { xPercent: -50, yPercent: -50 } as const;
    gsap.set([dotRef.current, ringRef.current], center);

    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power3" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power3" });

    const onMove = (event: MouseEvent) => {
      gsap.set(dotRef.current, { x: event.clientX, y: event.clientY, ...center });
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const cta = target.closest("[data-cursor='cta'], .btn-primary-glow");
      const interactive = target.closest("a, button");
      const card = target.closest("[data-cursor='card']");

      // Keep the green dot visible (especially over the opaque nav) so the pointer is never lost.
      if (cta) {
        setMode("cta");
        setLabel("Go");
        gsap.to(ringRef.current, { scale: 2.6, opacity: 0.55, duration: 0.25 });
        gsap.to(dotRef.current, { scale: 1.25, duration: 0.2 });
      } else if (interactive) {
        setMode("link");
        setLabel("");
        gsap.to(ringRef.current, { scale: 1.85, opacity: 0.7, duration: 0.25 });
        gsap.to(dotRef.current, { scale: 1.15, duration: 0.2 });
      } else if (card) {
        setMode("card");
        setLabel("Voir →");
        gsap.to(ringRef.current, { scale: 2, opacity: 0.85, duration: 0.25 });
        gsap.to(dotRef.current, { scale: 1.1, duration: 0.2 });
      }
    };

    const onOut = (event: MouseEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (related?.closest("a, button, [data-cursor='card'], [data-cursor='cta']")) return;
      setMode("default");
      setLabel("");
      gsap.to(ringRef.current, { scale: 1, opacity: 1, duration: 0.25 });
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled || !mounted) return null;

  return createPortal(
    <>
      <div ref={dotRef} className="cursor-dot" data-mode={mode} aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-mode={mode} aria-hidden>
        {label ? <span className="cursor-label font-mono">{label}</span> : null}
      </div>
    </>,
    document.body,
  );
}
