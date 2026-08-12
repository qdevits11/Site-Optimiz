type LogoProps = {
  className?: string;
  /** Visual height in px (width follows aspect ratio). */
  height?: number;
  priority?: boolean;
  /** Override intrinsic sizes hint when CSS scales beyond `height`. */
  sizes?: string;
  /**
   * `onDark` = mint O + light silver ptmiz (nav, preloader, dark UI).
   * `brand` = official lockup with navy ptmiz (for light surfaces only).
   */
  variant?: "onDark" | "brand";
};

/** Matches public/logo*.svg viewBox (278 × 83). */
const ASPECT = 278 / 83;

const SRC = {
  onDark: "/logo-on-dark.svg",
  brand: "/logo.svg",
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
    // Vector lockup stays sharp at any display size (preloader scales up to ~320px).
    // eslint-disable-next-line @next/next/no-img-element -- SVG wordmark; next/image is for rasters
    <img
      src={SRC[variant]}
      alt="Optmiz"
      width={width}
      height={height}
      className={`optmiz-logo ${className}`.trim()}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      draggable={false}
    />
  );
}
