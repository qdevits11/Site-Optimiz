import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";

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
    <section className="section-tight bg-brand-soft">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <h1 className="text-4xl font-extrabold leading-tight text-ink md:text-5xl">{title}</h1>
          <p className="mt-5 text-lg text-muted md:text-xl">{subtitle}</p>
          <div className="mt-8">
            <CtaButton />
            <p className="mt-3 text-sm text-muted">{note}</p>
          </div>
        </Reveal>
        {imageSrc ? (
          <Reveal delay={120} className="justify-self-center">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={520}
              height={420}
              className="float-soft h-auto w-full max-w-[480px]"
              priority
            />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
