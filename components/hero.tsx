import Link from "next/link";

const steps = ["IDEA", "DESIGN", "BUILD", "LAUNCH"];

export function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-layout">
        <div className="hero-copy-block">
          <p className="eyebrow"><span className="eyebrow-dot" /> Digital product development</p>
          <h1>Build Digital Products.<br /><span className="text-gradient">Move Faster.</span></h1>
          <p className="hero-lead">We combine modern software engineering with AI-assisted development to transform ideas into high-quality, scalable digital products.</p>
          <p className="service-line">Web Development <i>·</i> Application Development <i>·</i> Vibe Coding</p>
          <div className="hero-actions">
            <Link className="button" href="/contact">Start a Project <span aria-hidden="true">↗</span></Link>
            <Link className="button button-quiet" href="/services">Explore Services <span aria-hidden="true">↓</span></Link>
          </div>
        </div>
        <div className="journey-visual" aria-label="Product journey: idea, design, build, launch">
          <div className="journey-glow" />
          <div className="journey-topline"><span>ONE PRODUCT JOURNEY</span><span className="journey-spark">✦</span></div>
          <div className="journey-track" aria-hidden="true">
            {steps.map((step, index) => (
              <div className="journey-step" key={step}>
                <span className={`journey-node node-${index + 1}`} />
                <span className="journey-step-number">0{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <p>Product thinking, engineering, and AI-assisted development in one workflow.</p>
        </div>
      </div>
      <div className="hero-bottom-line" aria-hidden="true" />
    </section>
  );
}
