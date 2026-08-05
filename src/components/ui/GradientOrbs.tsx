"use client";

import { useEffect, useRef } from "react";

export function GradientOrbs() {
  const greenRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.3, y: 0.25 });
  const current = useRef({ x: 0.3, y: 0.25 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: MouseEvent) => {
      target.current.x = event.clientX / window.innerWidth;
      target.current.y = event.clientY / window.innerHeight;
    };

    const onScroll = () => {
      const p = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      target.current.y = Math.min(0.85, 0.2 + p * 0.4);
    };

    let raf = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.03;
      current.current.y += (target.current.y - current.current.y) * 0.03;
      if (greenRef.current) {
        greenRef.current.style.transform = `translate(${current.current.x * 40 - 20}vw, ${current.current.y * 30 - 10}vh)`;
      }
      if (blueRef.current) {
        blueRef.current.style.transform = `translate(${(1 - current.current.x) * 35 - 10}vw, ${(1 - current.current.y) * 35 - 5}vh)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="gradient-orbs" aria-hidden>
      <div ref={greenRef} className="orb orb-green" />
      <div ref={blueRef} className="orb orb-blue" />
    </div>
  );
}
