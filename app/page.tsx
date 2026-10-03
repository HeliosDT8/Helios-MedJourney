import { BrandStatement } from "@/components/brand-statement";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { HowWeWork } from "@/components/how-we-work";
import { Services } from "@/components/services";
import { TechStack } from "@/components/tech-stack";
import { WhyHelios } from "@/components/why-helios";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BrandStatement />
      <Services />
      <WhyHelios />
      <HowWeWork />
      <TechStack />
      <FinalCta />
    </main>
  );
}
