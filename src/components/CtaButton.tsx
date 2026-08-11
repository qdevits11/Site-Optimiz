import Link from "next/link";

type CtaButtonProps = {
  href?: string;
  variant?: "primary" | "light";
  children?: React.ReactNode;
  className?: string;
};

export function CtaButton({
  href = "/#devis",
  variant = "primary",
  children = "Obtenir mon devis gratuit ›",
  className = "",
}: CtaButtonProps) {
  const base =
    variant === "primary"
      ? "btn-primary-glow"
      : "btn-ghost";

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
