const pillars = [
  { title: "Human-led", copy: "AI accelerates the workflow, while product decisions, architecture, engineering judgment, and quality stay human-led." },
  { title: "AI-assisted", copy: "Modern AI development workflows help us accelerate prototyping, coding, iteration, and experimentation." },
  { title: "Product-focused", copy: "We focus on what the product needs to achieve for the business and the people who use it." },
  { title: "Built to scale", copy: "We design for maintainability, performance, security, and future growth." },
];

export function WhyHelios() {
  return (
    <section className="why-section section-shell" id="why-helios">
      <div className="section-heading section-heading-left">
        <p className="eyebrow"><span className="eyebrow-dot" /> WHY HELIOS</p>
        <h2>Modern engineering.<br /><span className="text-gradient">Accelerated by AI.</span></h2>
      </div>
      <div className="pillar-grid">
        {pillars.map((pillar, index) => (
          <article className="pillar-card" key={pillar.title}>
            <span className="pillar-number">0{index + 1}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
