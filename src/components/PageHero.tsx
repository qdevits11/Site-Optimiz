import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  title: React.ReactNode;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  note?: string;
};

export function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  note = "Sans engagement, réponse sous 24h",
}: PageHeroProps) {
  return (
    <section className="page-shell">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1
            className="font-display"
            style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)", margin: 0, lineHeight: 1.1 }}
          >
            {title}
          </h1>
          <p className="section-lead">{subtitle}</p>
          <div style={{ marginTop: "1.75rem" }}>
            <Link
              href="/#contact"
              className="btn-primary-glow"
              style={{ display: "inline-flex", padding: "0.9rem 1.3rem", borderRadius: 999 }}
            >
              Réserver mon diagnostic gratuit
            </Link>
            <p className="hero-note font-mono">{note}</p>
          </div>
        </div>
        {imageSrc ? (
          <div className="justify-self-center opacity-90">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={520}
              height={420}
              className="h-auto w-full max-w-[480px]"
              priority
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
