import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Helios Digital Technology about a website, application, or Vibe Coding project.",
  path: "/contact",
});

const serviceLabels: Record<string, string> = {
  "web-development": "Web Development",
  "application-development": "Application Development",
  "vibe-coding": "Vibe Coding",
  "web development": "Web Development",
  "application development": "Application Development",
  "vibe coding": "Vibe Coding",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const params = await searchParams;
  const initialService = serviceLabels[(params.service ?? "").trim().toLowerCase()] ?? "";
  return (
    <main>
      <section className="contact-section section-shell" id="contact">
        <div className="contact-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Have something in mind?</p>
          <h1>Let’s make your next idea real.</h1>
          <p className="lead">Tell us whether you need a website, an application, or want to explore an idea with Vibe Coding.</p>
          <p className="contact-address"><a href="mailto:info@heliosdigitaltechnology.com">info@heliosdigitaltechnology.com</a><br />Ahmedabad, Gujarat, India</p>
        </div>
        <ContactForm initialService={initialService} />
      </section>
    </main>
  );
}
