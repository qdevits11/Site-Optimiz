import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Visual height in px (width follows aspect ratio). */
  height?: number;
  priority?: boolean;
  /** Override next/image `sizes` when CSS scales the logo beyond `height`. */
  sizes?: string;
  /**
   * `onDark` = mint O + light silver ptmiz (nav, preloader, dark UI).
   * `brand` = official lockup with navy ptmiz (for light surfaces only).
   */
  variant?: "onDark" | "brand";
};

const ASPECT = 278 / 83;

const SRC = {
  onDark: "/logo-on-dark.webp",
  brand: "/logo.webp",
} as const;

export function Logo({
  className = "",
  height = 28,
  priority = false,
  sizes,
  variant = "onDark",
}: LogoProps) {
  const width = Math.round(height * ASPECT);

  return (
    <Image
      src={SRC[variant]}
      alt="Optmiz"
      width={width}
      height={height}
      className={`optmiz-logo ${className}`.trim()}
      priority={priority}
      sizes={sizes ?? `${width}px`}
      quality={95}
    />
  );
}
