"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="site-footer site-footer-compact">
      <div className="container-site footer-meta">
        <div className="footer-brand">
          <Logo height={22} className="footer-logo-img" />
          <p>© Optmiz — Soignies, Belgique</p>
        </div>
        <div className="footer-links">
          <Link href="/notre-methodologie">Méthode</Link>
          <Link href="/cas-concrets">Cas concrets</Link>
          <Link href="/tarifs">Tarifs</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
