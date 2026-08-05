"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"default" | "link" | "card" | "cta">("default");

  useEffect(() => {
    registerGsap();
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;
    setEnabled(true);
    document.body.classList.add("cursor-none");

    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.4, ease: "power3" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.4, ease: "power3" });

    const onMove = (event: MouseEvent) => {
      gsap.set(dotRef.current, { x: event.clientX, y: event.clientY });
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const cta = target.closest("[data-cursor='cta'], .btn-primary-glow");
      const interactive = target.closest("a, button");
      const card = target.closest("[data-cursor='card']");

      if (cta) {
        setMode("cta");
        setLabel("Go");
        gsap.to(ringRef.current, { scale: 3.2, opacity: 0.35, duration: 0.25 });
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
      } else if (interactive) {
        setMode("link");
        setLabel("");
        gsap.to(ringRef.current, { scale: 2.4, opacity: 0.45, duration: 0.25 });
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
      } else if (card) {
        setMode("card");
        setLabel("Voir →");
        gsap.to(ringRef.current, { scale: 2, opacity: 0.85, duration: 0.25 });
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
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
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" data-mode={mode} />
      <div ref={ringRef} className="cursor-ring" data-mode={mode}>
        {label ? <span className="cursor-label font-mono">{label}</span> : null}
      </div>
    </>
  );
}
