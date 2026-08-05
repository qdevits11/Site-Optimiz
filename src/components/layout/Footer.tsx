"use client";

import Link from "next/link";
import { useRef } from "react";
import { useMagnet } from "@/hooks/useMagnet";
import { useReveal } from "@/hooks/useReveal";

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const magnetRef = useMagnet<HTMLSpanElement>(80, 12);
  useReveal(sectionRef);

  return (
    <footer ref={sectionRef} className="site-footer">
      <div className="container-site footer-inner">
        <div data-reveal data-reveal-type="fade">
          <p className="footer-eyebrow font-mono">Prêt à reprendre le contrôle ?</p>
          <h2 className="footer-title font-display">
            Transformons vos process en systèmes fluides.
          </h2>
          <span ref={magnetRef} className="magnetic-wrap">
            <Link href="/#contact" className="btn-primary-glow magnetic-cta">
              Réserver mon diagnostic gratuit
            </Link>
          </span>
        </div>
        <div className="footer-meta">
          <p>© Optmiz — Soignies, Belgique</p>
          <div className="footer-links">
            <Link href="/notre-methodologie">Méthode</Link>
            <Link href="/cas-concrets">Cas concrets</Link>
            <Link href="/tarifs">Tarifs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
