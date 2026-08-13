"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, registerGsap } from "@/lib/gsap";

type CursorMode = "default" | "link" | "card" | "cta" | "native";

const NATIVE_CURSOR =
  "input, textarea, select, [contenteditable='true']";
const CTA_CURSOR =
  "[data-cursor='cta'], .btn-primary-glow, .btn-danger-glow";

function applyMode(
  mode: CursorMode,
  dot: HTMLDivElement,
  ring: HTMLDivElement,
) {
  if (mode === "native") {
    gsap.to([dot, ring], { opacity: 0, scale: 0.4, duration: 0.18 });
    return;
  }

  gsap.to(dot, { opacity: 1, scale: 1, duration: 0.18 });

  if (mode === "cta") {
    gsap.to(ring, { scale: 1.2, opacity: 0.9, duration: 0.2 });
  } else if (mode === "link") {
    gsap.to(ring, { scale: 1.05, opacity: 0.75, duration: 0.2 });
  } else if (mode === "card") {
    gsap.to(ring, { scale: 1.1, opacity: 0.7, duration: 0.2 });
  } else {
    gsap.to(ring, { scale: 0.55, opacity: 0, duration: 0.2 });
  }
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<CursorMode>("default");
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(!coarse.matches && !reduced.matches);
    sync();

    coarse.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      coarse.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useLayoutEffect(() => {
    if (!enabled || !mounted) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    registerGsap();
    document.body.classList.add("cursor-none");

    const center = { xPercent: -50, yPercent: -50 } as const;
    gsap.set([dot, ring], { ...center, opacity: 0 });
    gsap.set(ring, { scale: 0.55 });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.16, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.16, ease: "power3" });

    const setCursorMode = (next: CursorMode) => {
      if (modeRef.current === next) return;
      modeRef.current = next;
      setMode(next);
      applyMode(next, dot, ring);
    };

    const onMove = (event: MouseEvent) => {
      gsap.set(dot, { x: event.clientX, y: event.clientY, ...center });
      ringX(event.clientX);
      ringY(event.clientY);
      if (modeRef.current !== "native" && Number(gsap.getProperty(dot, "opacity")) < 1) {
        gsap.to(dot, { opacity: 1, duration: 0.12, overwrite: "auto" });
      }
    };

    const resolveMode = (target: EventTarget | null): CursorMode => {
      if (!(target instanceof Element)) return "default";
      if (target.closest(NATIVE_CURSOR)) return "native";
      if (target.closest(CTA_CURSOR)) return "cta";
      if (target.closest("a, button")) return "link";
      if (target.closest("[data-cursor='card']")) return "card";
      return "default";
    };

    const onOver = (event: MouseEvent) => {
      setCursorMode(resolveMode(event.target));
    };

    const onOut = (event: MouseEvent) => {
      setCursorMode(resolveMode(event.relatedTarget));
    };

    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.15, overwrite: "auto" });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [enabled, mounted]);

  if (!enabled || !mounted) return null;

  return createPortal(
    <>
      <div ref={dotRef} className="cursor-dot" data-mode={mode} aria-hidden />
      <div ref={ringRef} className="cursor-ring" data-mode={mode} aria-hidden />
    </>,
    document.body,
  );
}
