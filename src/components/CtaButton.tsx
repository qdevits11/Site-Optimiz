import Link from "next/link";
import { PRIMARY_CTA } from "@/lib/cta";

type CtaButtonProps = {
  href?: string;
  variant?: "primary" | "light";
  children?: React.ReactNode;
  className?: string;
};

export function CtaButton({
  href = PRIMARY_CTA.href,
  variant = "primary",
  children = PRIMARY_CTA.label,
  className = "",
}: CtaButtonProps) {
  const base = variant === "primary" ? "btn-primary-glow" : "btn-ghost";

  return (
    <Link
      href={href}
      className={`${base} ${className}`}
      style={{ display: "inline-flex", padding: "0.9rem 1.35rem", borderRadius: 999, fontWeight: 600 }}
    >
      {children}
    </Link>
  );
}
