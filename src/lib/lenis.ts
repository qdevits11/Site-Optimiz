"use client";

import Lenis from "lenis";

export type LenisInstance = Lenis;

export function createLenis() {
  return new Lenis({
    lerp: 0.08,
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
}
