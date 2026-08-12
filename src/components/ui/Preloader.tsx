"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { gsap, registerGsap } from "@/lib/gsap";

type PreloaderProps = {
  onDone?: () => void;
};

export function Preloader({ onDone }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setVisible(false);
      onDoneRef.current?.();
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
        document.body.classList.remove("is-preloading");
        setVisible(false);
        onDoneRef.current?.();
      },
    });

    gsap.set(brand, { opacity: 0, y: 28, filter: "blur(14px)", scale: 0.92 });
    gsap.set(tag, { opacity: 0, y: 12 });
    gsap.set(line, { scaleX: 0 });
    gsap.set(root, { opacity: 1 });
    gsap.set(panel, { yPercent: 0 });

    tl.to(brand, { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.9 })
      .to(line, { scaleX: 1, duration: 0.7 }, "-=0.25")
      .to(tag, { opacity: 1, y: 0, duration: 0.45 }, "-=0.35")
      .to({}, { duration: 0.4 })
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
  }, []);

  if (!visible) return null;

  return (
    <div ref={rootRef} className="preloader" aria-hidden>
      <div className="preloader-panel preloader-panel-top" />
      <div className="preloader-panel preloader-panel-bottom" />
      <div className="preloader-content">
        <div className="preloader-brand">
          <span className="preloader-brand-glow" aria-hidden />
          <Logo
            variant="onDark"
            height={96}
            priority
            sizes="(max-width: 640px) 42vw, 320px"
            className="preloader-logo-img"
          />
        </div>
        <div className="preloader-line" />
        <p className="preloader-tag font-mono">Automatiser. Clarifier. Zenifier.</p>
      </div>
    </div>
  );
}
