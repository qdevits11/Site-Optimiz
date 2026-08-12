"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footerNavLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/seo";

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
          <p>
            <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          </p>
        </div>
        <div className="footer-links">
          {footerNavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
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
