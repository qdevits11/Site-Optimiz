"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export function useMagnet<T extends HTMLElement = HTMLElement>(
  radius = 80,
  strength = 12,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const factor = 1 - dist / radius;
        xTo((dx / dist) * strength * factor || 0);
        yTo((dy / dist) * strength * factor || 0);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [radius, strength]);

  return ref;
}
