import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Visual height in px (width follows aspect ratio). */
  height?: number;
  priority?: boolean;
};

const ASPECT = 278 / 83;

export function Logo({ className = "", height = 28, priority = false }: LogoProps) {
  const width = Math.round(height * ASPECT);

  return (
    <Image
      src="/logo.webp"
      alt="Optmiz"
      width={width}
      height={height}
      className={`optmiz-logo ${className}`.trim()}
      priority={priority}
      sizes={`${width}px`}
    />
  );
}
