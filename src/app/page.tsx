import { Capabilities } from "@/components/home/Capabilities";
import { CTA } from "@/components/home/CTA";
import { Hero } from "@/components/home/Hero";
import { Method } from "@/components/home/Method";
import { PainPoints } from "@/components/home/PainPoints";
import { Pricing } from "@/components/home/Pricing";
import { ProcessSimulator } from "@/components/home/ProcessSimulator";
import { Proof } from "@/components/home/Proof";
import { Stack } from "@/components/home/Stack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <Capabilities />
      <ProcessSimulator />
      <Method />
      <Proof />
      <Stack />
      <Pricing />
      <CTA />
    </>
  );
}
