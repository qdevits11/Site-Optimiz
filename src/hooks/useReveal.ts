"use client";

import { type RefObject, useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

export function useReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    registerGsap();
    const root = containerRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-child]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.clipPath = "none";
      });
      return;
    }

    const elements = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-reveal]"));
    const triggers: ScrollTrigger[] = [];

    elements.forEach((el) => {
      const type = el.dataset.revealType || "fade";
      const kids = el.querySelectorAll<HTMLElement>("[data-reveal-child]");

      if (type === "stagger" && kids.length) {
        gsap.set(kids, { opacity: 0, y: 30 });
        const anim = gsap.to(kids, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleClass: "is-visible",
            once: true,
          },
        });
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
        return;
      }

      const fromVars: gsap.TweenVars =
        type === "slide"
          ? { opacity: 0, x: -60 }
          : type === "clip"
            ? { clipPath: "inset(100% 0 0 0)" }
            : { opacity: 0, y: 30 };

      const toVars: gsap.TweenVars =
        type === "slide"
          ? { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
          : type === "clip"
            ? { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.out" }
            : { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" };

      gsap.set(el, fromVars);
      const anim = gsap.to(el, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleClass: "is-visible",
          once: true,
        },
      });
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    ScrollTrigger.refresh();
    return () => triggers.forEach((t) => t.kill());
  }, [containerRef]);
}
