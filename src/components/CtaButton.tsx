import Link from "next/link";

type CtaButtonProps = {
  href?: string;
  variant?: "primary" | "light";
  children?: React.ReactNode;
  className?: string;
};

export function CtaButton({
  href = "/#contact",
  variant = "primary",
  children = "Réservez votre diagnostic gratuit ›",
  className = "",
}: CtaButtonProps) {
  return (
    <Link href={href} className={`btn ${variant === "primary" ? "btn-primary" : "btn-light"} ${className}`}>
      {children}
    </Link>
  );
}
