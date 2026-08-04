"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/notre-methodologie", label: "La méthode" },
  { href: "/pourquoi-nous", label: "Pourquoi nous ?" },
  { href: "/cas-concrets", label: "Cas concrets" },
  { href: "/tarifs", label: "Tarifs" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/95 backdrop-blur">
      <div className="container-site flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="relative z-10 flex items-center gap-2" aria-label="Optmiz — Accueil">
          <Image src="/logo.webp" alt="Optmiz" width={95} height={40} priority className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-[0.95rem]"
              data-active={pathname === link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/#contact" className="btn btn-primary px-5 py-2.5 text-sm">
            Contactez nous
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container-site flex flex-col gap-1 py-4" aria-label="Navigation mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base font-medium hover:bg-brand-soft"
                data-active={pathname === link.href}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={closeMenu} className="btn btn-primary mt-2">
              Contactez nous
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
