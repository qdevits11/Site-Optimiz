type LogoProps = {
  className?: string;
  /** Visual height in px (width follows aspect ratio). */
  height?: number;
  priority?: boolean;
  /**
   * `onDark` = mint O + light silver ptmiz (nav, preloader, dark UI).
   * `brand` = official lockup with navy ptmiz (for light surfaces only).
   */
  variant?: "onDark" | "brand";
};

/** Matches public/logo*.svg viewBox (162.75 × 44). */
const ASPECT = 162.75 / 44;

const SRC = {
  onDark: "/logo-on-dark.svg",
  brand: "/logo.svg",
} as const;

export function Logo({
  className = "",
  height = 28,
  priority = false,
  variant = "onDark",
}: LogoProps) {
  const width = Math.round(height * ASPECT);

  return (
    // SVG wordmark stays sharp at any size (unlike the old 278×83 raster).
    // eslint-disable-next-line @next/next/no-img-element -- SVG logos; next/image rasterizes/blocks SVG by default
    <img
      src={SRC[variant]}
      alt="Optmiz"
      width={width}
      height={height}
      className={`optmiz-logo ${className}`.trim()}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
    />
  );
}
