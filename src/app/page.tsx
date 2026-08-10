import type { Metadata } from "next";
import { Capabilities } from "@/components/home/Capabilities";
import { CTA } from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Method } from "@/components/home/Method";
import { PainPoints } from "@/components/home/PainPoints";
import { Pricing } from "@/components/home/Pricing";
import { Proof } from "@/components/home/Proof";
import { Transformation } from "@/components/home/Transformation";
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
      <TrustBar />
      <PainPoints />
      <Transformation />
      <Capabilities />
      <Method />
      <Proof />
      <WhyUs />
      <Pricing />
      <CTA />
    </>
  );
}
