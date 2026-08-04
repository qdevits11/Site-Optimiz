import { CtaButton } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";

type ProblemSectionProps = {
  title: string;
  intro: string;
  points: string[];
  closing: string;
  showCta?: boolean;
};

export function ProblemSection({
  title,
  intro,
  points,
  closing,
  showCta = true,
}: ProblemSectionProps) {
  return (
    <section className="section bg-problem text-white">
      <div className="container-site max-w-3xl text-center">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
          <p className="mt-5 text-lg text-white/90">{intro}</p>
          <ul className="mx-auto mt-8 max-w-xl space-y-3 text-left text-white/95">
            {points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base font-medium text-white/95">{closing}</p>
          {showCta ? (
            <div className="mt-8">
              <CtaButton variant="light" />
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
