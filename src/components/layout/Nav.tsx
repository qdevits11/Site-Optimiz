"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMagnet } from "@/hooks/useMagnet";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

const links = [
  { href: "/#solutions", label: "Solutions", match: "/" },
  { href: "/notre-methodologie", label: "Méthode", match: "/notre-methodologie" },
  { href: "/cas-concrets", label: "Preuves", match: "/cas-concrets" },
  { href: "/pourquoi-nous", label: "Pourquoi nous", match: "/pourquoi-nous" },
  { href: "/tarifs", label: "Tarifs", match: "/tarifs" },
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ctaMagnet = useMagnet<HTMLAnchorElement>(90, 14);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    registerGsap();
    const nav = navRef.current;
    const progress = progressRef.current;
    if (!nav || !progress) return;

    gsap.set(nav, { yPercent: 0 });

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
        } else {
          gsap.to(nav, { yPercent: 0, duration: 0.2, overwrite: true });
        }
        nav.classList.toggle("is-scrolled", y > 24);
        lastY.current = y;
      },
    });

    return () => trigger.kill();
  }, [open, pathname]);

  useEffect(() => {
    setOpen(false);
    const nav = navRef.current;
    if (nav) gsap.set(nav, { yPercent: 0 });
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-overlay-open", open);
    const overlay = overlayRef.current;
    if (!overlay) return;

    registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = overlay.querySelectorAll(".nav-overlay-link");
    const meta = overlay.querySelectorAll(".nav-overlay-meta > *");

    if (open) {
      gsap.set(overlay, { display: "flex", opacity: 1, clearProps: "clipPath" });
      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power2.out" });
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out", delay: 0.05 },
      );
      gsap.fromTo(
        meta,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, delay: 0.25, ease: "power2.out" },
      );
    } else if (!reduced) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    } else {
      gsap.set(overlay, { display: "none", opacity: 0 });
    }

    return () => document.body.classList.remove("nav-overlay-open");
  }, [open]);

  const isActive = (match: string) => pathname === match;

  return (
    <header ref={navRef} className={`site-nav${open ? " is-open" : ""}`}>
      <div ref={progressRef} className="nav-progress" />
      <div className="container-site nav-inner">
        <div className="nav-shell">
          <Link href="/" className="nav-logo font-display" onClick={() => setOpen(false)}>
            <span className="nav-logo-mark" aria-hidden />
            Opt<span className="text-accent">miz</span>
          </Link>

          <nav className="nav-links" aria-label="Navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-item"
                data-active={isActive(link.match)}
              >
                <span className="nav-link-label">{link.label}</span>
                <span className="nav-link-underline" aria-hidden />
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
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
      </div>

      <div ref={overlayRef} className="nav-overlay" style={{ display: "none" }} aria-hidden={!open}>
        <div className="nav-overlay-panel">
          <p className="nav-overlay-kicker font-mono">Menu</p>
          <nav className="nav-overlay-links" aria-label="Navigation mobile">
            {[
              { href: "/", label: "Accueil" },
              ...links,
              { href: "/#contact", label: "Diagnostic gratuit" },
            ].map((link, index) => (
              <Link
                key={`${link.href}-${link.label}`}
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
