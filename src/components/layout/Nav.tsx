"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMagnet } from "@/hooks/useMagnet";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

const links = [
  { href: "/#solutions", label: "Solutions" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#preuves", label: "Preuves" },
  { href: "/tarifs", label: "Tarifs" },
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ctaMagnet = useMagnet<HTMLAnchorElement>(90, 14);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    registerGsap();
    const nav = navRef.current;
    const progress = progressRef.current;
    if (!nav || !progress) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) {
      gsap.fromTo(
        nav.querySelector(".nav-shell"),
        { y: -28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 },
      );
      gsap.fromTo(
        nav.querySelectorAll(".nav-link-item"),
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out", delay: 0.35 },
      );
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(progress, { scaleX: self.progress });
        const y = self.scroll();
        if (!open) {
          if (y > 110 && y > lastY.current) {
            gsap.to(nav, { yPercent: -110, duration: 0.35, ease: "power2.out", overwrite: true });
          } else {
            gsap.to(nav, { yPercent: 0, duration: 0.45, ease: "power2.out", overwrite: true });
          }
        }
        nav.classList.toggle("is-scrolled", y > 24);
        lastY.current = y;
      },
    });

    return () => trigger.kill();
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-overlay-open", open);
    const overlay = overlayRef.current;
    if (!overlay) return;

    registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = overlay.querySelectorAll(".nav-overlay-link");
    const meta = overlay.querySelectorAll(".nav-overlay-meta > *");

    if (open) {
      gsap.set(overlay, { display: "flex" });
      if (reduced) {
        gsap.set(overlay, { opacity: 1, clipPath: "none" });
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        overlay,
        { opacity: 0, clipPath: "circle(0% at 92% 36px)" },
        { opacity: 1, clipPath: "circle(160% at 92% 36px)", duration: 0.7, ease: "power3.inOut" },
      );
      gsap.fromTo(
        items,
        { y: 50, opacity: 0, rotateX: 18 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.18,
        },
      );
      gsap.fromTo(
        meta,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, delay: 0.45, ease: "power2.out" },
      );
    } else if (!reduced) {
      gsap.to(items, { y: -20, opacity: 0, duration: 0.25, stagger: 0.03, ease: "power2.in" });
      gsap.to(overlay, {
        opacity: 0,
        clipPath: "circle(0% at 92% 36px)",
        duration: 0.45,
        ease: "power3.inOut",
        delay: 0.05,
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    } else {
      gsap.set(overlay, { display: "none", opacity: 0 });
    }

    return () => document.body.classList.remove("nav-overlay-open");
  }, [open]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <header ref={navRef} className={`site-nav${open ? " is-open" : ""}`}>
      <div ref={progressRef} className="nav-progress" />
      <div className="container-site nav-inner">
        <div className="nav-shell">
          <Link href="/" className="nav-logo font-display" onClick={() => setOpen(false)}>
            <span className="nav-logo-mark" aria-hidden />
            Opt<span className="text-accent">miz</span>
          </Link>

          <nav ref={linksRef} className="nav-links" aria-label="Navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-item"
                data-active={isActive(link.href)}
              >
                <span className="nav-link-label">{link.label}</span>
                <span className="nav-link-underline" aria-hidden />
              </Link>
            ))}
          </nav>

          <Link ref={ctaMagnet} href="/#contact" className="nav-cta btn-primary-glow">
            Diagnostic gratuit
          </Link>

          <button
            type="button"
            className={`nav-burger${open ? " is-active" : ""}`}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div ref={overlayRef} className="nav-overlay" style={{ display: "none" }} aria-hidden={!open}>
        <div className="nav-overlay-glow" aria-hidden />
        <div className="container-site nav-overlay-inner">
          <p className="nav-overlay-kicker font-mono">Menu</p>
          <nav className="nav-overlay-links" aria-label="Navigation mobile">
            {[...links, { href: "/#contact", label: "Diagnostic gratuit" }].map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-overlay-link font-display"
                onClick={() => setOpen(false)}
              >
                <span className="nav-overlay-index font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="nav-overlay-label">{link.label}</span>
                <span className="nav-overlay-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </nav>
          <div className="nav-overlay-meta">
            <p className="font-mono">Soignies · Wallonie</p>
            <p>Réponse sous 24h · Sans engagement</p>
          </div>
        </div>
      </div>
    </header>
  );
}
