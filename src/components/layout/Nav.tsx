"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    registerGsap();
    const nav = navRef.current;
    const progress = progressRef.current;
    if (!nav || !progress) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(progress, { scaleX: self.progress });
        const y = self.scroll();
        if (y > 100 && y > lastY.current) {
          gsap.to(nav, { yPercent: -100, duration: 0.3, ease: "power2.out", overwrite: true });
        } else {
          gsap.to(nav, { yPercent: 0, duration: 0.4, ease: "power2.out", overwrite: true });
        }
        nav.classList.toggle("is-scrolled", y > 24);
        lastY.current = y;
      },
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header ref={navRef} className="site-nav">
      <div ref={progressRef} className="nav-progress" />
      <div className="container-site nav-inner">
        <Link href="/" className="nav-logo font-display">
          Opt<span className="text-accent">miz</span>
        </Link>
        <nav className="nav-links" aria-label="Navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} data-active={pathname === link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/#contact" className="nav-cta">
          Diagnostic gratuit
        </Link>
        <button
          type="button"
          className="nav-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      {open ? (
        <div className="nav-mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)} className="nav-cta">
            Diagnostic gratuit
          </Link>
        </div>
      ) : null}
    </header>
  );
}
