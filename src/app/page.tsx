import type { Metadata } from "next";
import { Benefits } from "@/components/home/Benefits";
import { CTA } from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Method } from "@/components/home/Method";
import { PainPoints } from "@/components/home/PainPoints";
import { Pricing } from "@/components/home/Pricing";
import { Principle } from "@/components/home/Principle";
import { Proof } from "@/components/home/Proof";
import { SeoIntro } from "@/components/home/SeoIntro";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyUs } from "@/components/home/WhyUs";
import { pageMetadata, sitePages } from "@/lib/seo";

const home = sitePages[0];

export const metadata: Metadata = pageMetadata(home);

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <PainPoints />
      <Benefits />
      <Principle />
      <TrustBar />
      <Proof />
      <Method />
      <WhyUs />
      <Pricing />
      <SeoIntro />
      <CTA />
    </>
  );
}
