import type { Metadata } from "next";
import { Services } from "@/components/services";
import { ServiceChooser } from "@/components/service-chooser";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata, serviceStructuredData } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: "Explore web development, application development, and Vibe Coding from Helios Digital Technology.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <section className="page-intro section-shell">
        <p className="eyebrow"><span className="eyebrow-dot" /> What we build</p>
        <h1>Three ways to build your <span className="text-gradient">next product.</span></h1>
        <p className="lead">Web Development · Application Development · Vibe Coding</p>
      </section>
      <Services expanded />
      <ServiceChooser />
      <StructuredData data={serviceStructuredData} />
    </main>
  );
}
