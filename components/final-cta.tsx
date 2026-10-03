import Link from "next/link";

export function FinalCta() {
  return (
    <section className="final-cta section-shell">
      <div className="final-cta-glow" aria-hidden="true" />
      <p className="eyebrow"><span className="eyebrow-dot" /> READY WHEN YOU ARE</p>
      <h2>Have an idea worth building?</h2>
      <p>Let’s turn it into a digital product.</p>
      <Link className="button" href="/contact">Start a Project <span aria-hidden="true">↗</span></Link>
      <span className="final-service-line">Web Development · Application Development · Vibe Coding</span>
    </section>
  );
}
