"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const ctaMagnet = useMagnet<HTMLAnchorElement>(90, 14);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastY = useRef(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    registerGsap();
    const nav = navRef.current;
    const bar = barRef.current;
    const progress = progressRef.current;
    if (!nav || !bar || !progress) return;

    gsap.set(bar, { yPercent: 0 });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(progress, { scaleX: self.progress });
        const y = self.scroll();
        if (!open) {
          if (y > 110 && y > lastY.current) {
            gsap.to(bar, { yPercent: -160, duration: 0.35, ease: "power2.out", overwrite: true });
          } else {
            gsap.to(bar, { yPercent: 0, duration: 0.45, ease: "power2.out", overwrite: true });
          }
        } else {
          gsap.to(bar, { yPercent: 0, duration: 0.2, overwrite: true });
        }
        nav.classList.toggle("is-scrolled", y > 24);
        lastY.current = y;
      },
    });

    return () => trigger.kill();
  }, [open, pathname]);

  useEffect(() => {
    setOpen(false);
    if (barRef.current) gsap.set(barRef.current, { yPercent: 0 });
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-overlay-open", open);
    if (open && barRef.current) {
      gsap.set(barRef.current, { yPercent: 0 });
    }
    return () => document.body.classList.remove("nav-overlay-open");
  }, [open]);

  const isActive = (match: string) => pathname === match;

  const overlay = (
    <div
      className={`nav-overlay${open ? " is-visible" : ""}`}
      aria-hidden={!open}
    >
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
  );

  return (
    <>
      <header ref={navRef} className={`site-nav${open ? " is-open" : ""}`}>
        <div ref={progressRef} className="nav-progress" />
        <div ref={barRef} className="container-site nav-inner">
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
      </header>
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
