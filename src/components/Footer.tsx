import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-brand-soft">
      <div className="container-site flex flex-col gap-3 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>Copyright © Optmiz — Soignies, Belgique</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/#contact" className="hover:text-brand">
            Contact
          </Link>
          <Link href="/tarifs" className="hover:text-brand">
            Tarifs
          </Link>
          <Link href="/cas-concrets" className="hover:text-brand">
            Cas concrets
          </Link>
        </div>
      </div>
    </footer>
  );
}
