"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

type PreloaderProps = {
  onDone?: () => void;
};

export function Preloader({ onDone }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("optmiz-intro") === "1";

    if (reduced || seen) {
      setVisible(false);
      onDone?.();
      return;
    }

    document.body.classList.add("is-preloading");
    const root = rootRef.current;
    if (!root) return;

    const brand = root.querySelector(".preloader-brand");
    const line = root.querySelector(".preloader-line");
    const tag = root.querySelector(".preloader-tag");
    const panel = root.querySelectorAll(".preloader-panel");

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        sessionStorage.setItem("optmiz-intro", "1");
        document.body.classList.remove("is-preloading");
        setVisible(false);
        onDone?.();
      },
    });

    gsap.set(brand, { opacity: 0, y: 30, filter: "blur(12px)" });
    gsap.set(tag, { opacity: 0, y: 12 });
    gsap.set(line, { scaleX: 0 });

    tl.to(brand, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85 })
      .to(
        brand,
        {
          duration: 0.55,
          scrambleText: {
            text: "OPTMIZ",
            chars: "upperCase",
            speed: 0.4,
          },
        },
        "-=0.2",
      )
      .to(line, { scaleX: 1, duration: 0.7 }, "-=0.25")
      .to(tag, { opacity: 1, y: 0, duration: 0.45 }, "-=0.35")
      .to({}, { duration: 0.35 })
      .to(panel, {
        yPercent: (i) => (i === 0 ? -105 : 105),
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.inOut",
      })
      .to(root, { opacity: 0, duration: 0.25 }, "-=0.25");

    return () => {
      tl.kill();
      document.body.classList.remove("is-preloading");
    };
  }, [onDone]);

  if (!visible) return null;

  return (
    <div ref={rootRef} className="preloader" aria-hidden>
      <div className="preloader-panel preloader-panel-top" />
      <div className="preloader-panel preloader-panel-bottom" />
      <div className="preloader-content">
        <p className="preloader-brand font-display">OPTMIZ</p>
        <div className="preloader-line" />
        <p className="preloader-tag font-mono">Automatiser. Clarifier. Zenifier.</p>
      </div>
    </div>
  );
}
