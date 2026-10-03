import type { Metadata } from "next";
import { BrandStatement } from "@/components/brand-statement";
import { HowWeWork } from "@/components/how-we-work";
import { WhyHelios } from "@/components/why-helios";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Mission",
  description: "Learn how Helios brings product thinking, modern engineering, and AI-assisted development together.",
  path: "/mission",
});

export default function MissionPage() {
  return (
    <main>
      <section className="page-intro section-shell">
        <p className="eyebrow"><span className="eyebrow-dot" /> Our mission</p>
        <h1>Technology should <span className="text-gradient">empower, not complicate.</span></h1>
        <p className="lead">We help businesses turn ideas into useful, scalable digital products.</p>
      </section>
      <BrandStatement />
      <WhyHelios />
      <HowWeWork />
    </main>
  );
}
