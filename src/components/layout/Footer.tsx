"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="site-footer site-footer-compact">
      <div className="container-site footer-meta">
        <div className="footer-brand">
          <Logo variant="onDark" height={22} className="footer-logo-img" />
          <p>© Optmiz, Soignies, Wallonie, Belgique</p>
          <p>
            <a href="mailto:contact@optmiz.be">contact@optmiz.be</a>
          </p>
        </div>
        <div className="footer-links">
          <Link href="/notre-methodologie">Méthode</Link>
          <Link href="/cas-concrets">Cas concrets</Link>
          <Link href="/ressources">Ressources</Link>
          <Link href="/tarifs">Tarifs</Link>
          <Link href="/pourquoi-nous">Pourquoi nous</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <a
            href="https://www.linkedin.com/company/optmiz/"
            target="_blank"
            rel="noopener noreferrer me"
            aria-label="Optmiz sur LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
